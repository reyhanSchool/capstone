import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Button, Animated, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, NavigationContainer } from '@react-navigation/native';

const CreateNewAppointment =  ({ onSubmit }) => {
    const navigation  = useNavigation();
    const [newDate, setNewDate] = useState('');
    const [doctor, setDoctor] = useState('');
    const [appointmentName, setAppointmentName] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [additionNotes, setAdditionNotes] = useState('');

    //Inserting appointment into the database
const AddNewAppointment = async () => {
    const apiUrl = 'https://serious-ascent-412517.ue.r.appspot.com/api/postAppointmentInfo';
        
};

const handleBackButtonToCalendar = () => {
    navigation.navigate('CalendarScreen')
};
return (
    <View style={styles.formContainer}> 

        <TextInput
                style={styles.input}
                placeholder="Date"
                value={newDate}
                onChangeText={text => setNewDate(text)}
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
        <Button title="Save" onPress={''}/>
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
