import React, { useState, useRef } from 'react';
import { View, ScrollView, Text, StyleSheet, TextInput, Button, TouchableOpacity, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Medications = () => {
    // State for managing medications list
    const [medications, setMedications] = useState([
        { title: 'Medication 1', description: 'Description for Medication 1' },
        { title: 'Medication 2', description: 'Description for Medication 2' },
        { title: 'Medication 3', description: 'Description for Medication 3' },
        { title: 'Medication 4', description: 'Description for Medication 4' },
    ]);

    // State for managing form input
    const [newMedicationTitle, setNewMedicationTitle] = useState('');
    const [newMedicationDescription, setNewMedicationDescription] = useState('');
    const [showForm, setShowForm] = useState(false); // State variable to control form visibility

    // Animation state
    const fadeAnim = useRef(new Animated.Value(0)).current;

    // Function to add a new medication
    const addMedication = () => {
        if (newMedicationTitle && newMedicationDescription) {
            setMedications([...medications, { title: newMedicationTitle, description: newMedicationDescription }]);
            setNewMedicationTitle('');
            setNewMedicationDescription('');
            setShowForm(false); 
        }
    };

    // Function to toggle form visibility with animation
    const toggleForm = () => {
        fadeAnim.setValue(0);
        setShowForm(!showForm);
        if (!showForm) {
            animateFadeIN();
        }
    };

    // Function to animate fade in
    const animateFadeIN = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    // Function to remove a medication
    const removeMedication = (index) => {
        const updatedMedications = [...medications];
        updatedMedications.splice(index, 1);
        setMedications(updatedMedications);
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
                                <TouchableOpacity onPress={() => removeMedication(index)}>
                                    <Text style={styles.removeButton}>Remove</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            )}
            {showForm && (
                <Animated.View style={[styles.formContainer, styles.centeredView, { opacity: fadeAnim }]}>
                    <TextInput
                        style={styles.input}
                        placeholder="Medication Title"
                        value={newMedicationTitle}
                        onChangeText={text => setNewMedicationTitle(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Medication Description"
                        value={newMedicationDescription}
                        onChangeText={text => setNewMedicationDescription(text)}
                    />
                    <Button title="Add Medication" onPress={addMedication} />
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
    removeButton: {
        color: 'red',
        marginTop: 5,
    },
    formContainer: {
        marginTop: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    centeredView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Medications;
