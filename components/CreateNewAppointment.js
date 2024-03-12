import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Button, Animated } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CreateNewAppointment =  ({ onSubmit }) => {
    const [newDate, setNewDate] = useState('');
    const [doctor, setDoctor] = useState('');
    const [appointmentName, setAppointmentName] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [additionNotes, setAdditionNotes] = useState('');

const AddNewAppointment = async () => {

};
return (
    <View style={styles.formContainer}> 
        <TextInput
                style={styles.input}
                placeholder="Date"
                value={newDate}
                onChangeText={text => setsetNewDate(text)}
            />
    </View>
);
};
//Styles stuff

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
