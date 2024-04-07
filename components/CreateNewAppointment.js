import React, { useState, useRef, useEffect } from 'react';
import { Alert, View, ScrollView, Text, StyleSheet, TouchableOpacity, Button, Animated, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, NavigationContainer, useRoute } from '@react-navigation/native';

const CreateNewAppointment =  ({ onSubmit }) => {
    const navigation  = useNavigation();
    const [doctor, setDoctor] = useState('');
    const [appointmentName, setAppointmentName] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [additionNotes, setAdditionNotes] = useState('');
    const route = useRoute();
    const {selectedDate, selectedMonth, selectedYear} = route.params;
    const newdate = `${selectedDate.toString()}/${(selectedMonth + 1).toString()}/${selectedYear.toString()}`;
    //Inserting appointment into the database
const AddNewAppointment = async () => {
    if (
        appointmentName.trim() === '' ||
        doctor.trim() === '' ||
        time.trim() === '' ||
        location.trim() === '' ||
        address.trim() === '' ||
        phoneNumber.trim() === '' 
        ){
        Alert.alert('All Fields Is Mandatory');
        }else{
            try{
                const response = await fetch('https://serious-ascent-412517.ue.r.appspot.com/api/postAppointmentInfo',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        date: newdate,
                        doctor: doctor,
                        nameOfAppointment: appointmentName,
                        time: time,
                        location: location,
                        address: address,
                        phoneNumber: phoneNumber,
                        additionalNotes: additionNotes,
                    }),
                })
                const data = await response.json();
                console.log(data)
                console.log(response.ok)
                if (response.ok){
                    navigation.navigate('CalendarScreen')
                }else{
                    console.error('Failed to Add New Appointment', data.message)
                }
            }catch(error){
                console.error('Error inserting appointment:', error);
            }
        }//outer else statement
};

const handleBackButtonToCalendar = () => {
    navigation.navigate('CalendarScreen')
};
return (
    <View style={styles.formContainer}> 

        <TextInput
                style={styles.input}
                placeholder="Date"
                value={`${selectedDate}/${selectedMonth + 1}/${selectedYear}`}
                editable={false}
        />
        <TextInput
                style={styles.input}
                placeholder="Name of Appointment"
                value={appointmentName}
                onChangeText={text => setAppointmentName(text)}
        />
        <TextInput
                style={styles.input}
                placeholder="Doctor"
                value={doctor}
                onChangeText={text => setDoctor(text)}
        />
        <TextInput
                style={styles.input}
                placeholder="Time of Appointment"
                value={time}
                onChangeText={text => setTime(text)}
        />
        <TextInput
                style={styles.input}
                placeholder="Location of Appointment"
                value={location}
                onChangeText={text => setLocation(text)}
        />
        <TextInput
                style={styles.input}
                placeholder="Address"
                value={address}
                onChangeText={text => setAddress(text)}
        />
        <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={text => setPhoneNumber(text)}
        />
        <TextInput
                style={styles.input}
                placeholder="Addition Notes"
                value={additionNotes}
                onChangeText={text => setAdditionNotes(text)}
        />
        <Button title="Save" onPress={AddNewAppointment}/>
        <Text/>
        <Button title="Back" onPress={handleBackButtonToCalendar} />

    </View>
);
};

const styles = StyleSheet.create({
    formContainer: {
        marginTop: 20,
        paddingHorizontal: 10,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 5,
        borderRadius: 5,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
});
export default CreateNewAppointment;
