import React, { useState, useRef } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import MedicationForm from './MedicationForm';

/* 
So far, the form contains a title, description and a doctor that created the medication
Need to add doctor comments, assestment, medical insurance information, elder information as well

*/
const Medications = () => {
    const [medications, setMedications] = useState([
        { title: 'Medication 1', description: 'Description for Medication 1' , doctor: 'Wing Yang'},
        { title: 'Medication 2', description: 'Description for Medication 2', doctor: 'Wing Yang'},
        { title: 'Medication 3', description: 'Description for Medication 3', doctor: 'Wing Yang' },
        { title: 'Medication 4', description: 'Description for Medication 4', doctor: 'Wing Yang' },
    ]);
    const [showForm, setShowForm] = useState(false); // State variable to control form visibility
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const toggleForm = () => {
        fadeAnim.setValue(0);
        setShowForm(!showForm);
        if (!showForm) {
            animateFadeIN();
        }
    };

    const animateFadeIN = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const addMedication = (medicationData) => {
        setMedications([...medications, medicationData]);
        setShowForm(false); 
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Medications</Text>
                <TouchableOpacity onPress={toggleForm}>
                    <MaterialIcons name={showForm ? "remove" : "add"} size={24} color="black" />
                </TouchableOpacity>
            </View>
            {!showForm && (
                <ScrollView style={styles.scrollView}>
                    {medications.map((medication, index) => (
                        <View key={index} style={styles.medicationItemWrapper}>
                            <View style={styles.medicationItem}>
                                <Text style={styles.medicationTitle}>{medication.title}</Text>
                                <Text style={styles.medicationDescription}>{medication.description}</Text>
                                <Text style={styles.medicationDescription}>{medication.doctor}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            )}
            {showForm && (
                <Animated.View style={[styles.formContainer, styles.centeredView, { opacity: fadeAnim }]}>
                    <MedicationForm onSubmit={addMedication} />
                </Animated.View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    scrollView: {
        flex: 1,
    },
    medicationItemWrapper: {
        marginBottom: 20,
    },
    medicationItem: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    medicationTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    medicationDescription: {
        fontSize: 16,
        marginTop: 5,
    },
    formContainer: {
        marginTop: 20,
    },
    centeredView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Medications;
