import { StatusBar } from 'expo-status-bar';
import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, SafeAreaView, Platform,Modal } from 'react-native';
import { Surface, Title, TextInput } from 'react-native-paper';

import PostCardItem from './src/components/PostCardItem';
import ModelViews from './src/components/ModelView';


const url = 'https://boppotech.herokuapp.com/user';

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
}

export default function App() {

  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address,setAddress] = useState('')
  const [postId, setPostId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  

 



  const getUser = async () => {
    setIsLoading(true);
    await fetch(url)
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error, 'getUser'))
      .finally(() => setIsLoading(false));
  }

  const addUser = (firstName, lastName, age, email, phoneNumber,address) => {

    fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        "firstName": firstName,
        "lastName": lastName,
        "age": age,
        "email": email,
        "phoneNumber": phoneNumber,
        "address": address
      })
    }).then((res) => res.json())
      .then((res) => {
        console.log(res, 'post');
        updatePost();
      }).catch((err) => {
        console.log(err, 'post');
      })

  }
    

  const editUser = (postId, firstName, lastName, age, email, phoneNumber,address) => {

    fetch(`${url}/${postId}`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify({
        "firstName": firstName,
        "lastName": lastName,
        "age": age,
        "email": email,
        "phoneNumber": phoneNumber,
        "address": address
      })
      
    }).then((res) => res.json())
      .then((res) => {
        console.log(res, 'edit user');
        updatePost();
      }
      ).catch((err) => {
        console.log(err, 'edit user');
      })
        
  
}


  const deleteUser = (postId) => { 
    fetch(`${url}/${postId}`, {
      method: "DELETE",
      headers: headers,
    }).then((res) => res.json())
      .then((res) => {
        console.log(res,'delete user');
        getUser();
      }
    ).catch((err) => {
      console.log(err,'delete user');
    }
    )
  }

  const updatePost = () => { 
    getUser();
    setVisible(false);
    setFirstName('');
    setLastName('');
    setAge('');
    setEmail('');
    setPhoneNumber('');
    setAddress('');
    setPostId(0);
  }


  const edit = (id, firstName, lastName, age, email, phoneNumber,address) => { 
    setVisible(true);
    setFirstName(firstName);
    setLastName(lastName);
    setAge(age);
    setEmail(email);
    setPhoneNumber(phoneNumber);
    setAddress(address);
    setPostId(id);

  }

  useEffect(() => {

    getUser();

  },[])
  
  console.log(data, 'data');
  

 
  
 

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Title style ={{marginTop:24,backgroundColor:'black',color:'white',textAlign:'center'}} >Boppo Technologies</Title>
      <Surface style={styles.header}>
        <Title>User</Title>
        <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
          <Text style = {styles.buttonText} >Add User</Text>

        </TouchableOpacity>
      </Surface>

      <FlatList
        data={data}
        keyExtractor={(item, i) => item.id + i.toString()}
        refreshing={isLoading}
        onRefresh={getUser}
        renderItem={({ item }) => (
          <PostCardItem
            // id={item.id}
            firstName={item.firstName}
            lastName={item.lastName}
            age={item.age}
            email={item.email}
            phoneNumber={item.phoneNumber}
            address={item.address}
            onEdit={() => edit(item.id, item.firstName, item.lastName, item.age, item.email, item.phoneNumber,item.address)}
            onDelete={() => deleteUser(item.id)}
          />
        )}
      />

      <ModelViews
        visible={visible}
        title="Add User"
        onDismiss={() => setVisible(false)}
        onSubmit={() => {
          if(postId && firstName && lastName && age && email && phoneNumber && address){
            editUser(postId, firstName, lastName, age, email, phoneNumber,address);
          } else {
            addUser(firstName, lastName, age, email, phoneNumber,address);
          }
        }}
        cancelable
      >
            <TextInput
          label="First Name"
          value={firstName}
          onChangeText={text => setFirstName(text)}
          mode="outlined"
        />
        <TextInput
          label="Last Name"
          value={lastName}
          onChangeText={text => setLastName(text)}
          mode="outlined"
        />
        <TextInput
          label="Age"
          value={age}
          onChangeText={text => setAge(text)}
          mode="outlined"
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          mode="outlined"
        />
        <TextInput
          label="Phone Number"
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
          mode="outlined"
        />
        <TextInput
          label="Address"
          value={address}
          onChangeText={text => setAddress(text)}
          mode="outlined"
        />
        

      </ModelViews>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  header: {
    marginTop: Platform.OS === 'android' ? 24 : 0,
    padding: 16,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  button: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'steelblue',
  },
  buttonText: {
    color: 'white'
  }
  
});
