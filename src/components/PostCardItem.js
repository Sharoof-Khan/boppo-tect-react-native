import react from "react"
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { Feather } from "@expo/vector-icons";


const Button = ({ onPress, style, icon }) => (
    <TouchableOpacity style={style} onPress={onPress}>
        <Feather name={icon} size={24}  />

    </TouchableOpacity>
)


export default function PostCardItem({ firstName, lastName, age, phoneNumber, email,address, onEdit, onDelete }) {
    
    console.log(firstName, lastName,age, phoneNumber, email,'in Postcard');
    return (
        <Card style={styles.item}>
            <View style={styles.rowView}>
                <View>
                    <Text style={styles.title}>FirstName: { firstName}</Text>
                    <Text style={styles.title}>LastName: { lastName}</Text>
                    <Text style={styles.title}>Age: { age}</Text>
                    <Text style={styles.title}>Email: { email}</Text>
                    <Text style={styles.title}>Phone No: { phoneNumber}</Text>
                    <Text style={styles.title}>Address: { address}</Text>
                </View>
                <View style={styles.rowView}>
                    <Button onPress={onEdit} icon="edit" style={{ marginHorizontal: 0 ,marginTop:-15}} />
                    <Button onPress = {onDelete} icon = 'trash-2' style={{ marginHorizontal: 0 ,marginTop:-15}} />

                </View>

            </View>

        </Card>
    )
}

const styles = StyleSheet.create({
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    padding: 16,
    margin: 16,
    elevation: 4,
    borderRadius: 8
  },
  title: {
    fontSize: 16,
    // color:'red'
  },
})