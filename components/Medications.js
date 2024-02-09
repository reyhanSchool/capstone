import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';

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

    // Function to add a new medication
    const addMedication = () => {
        if (newMedicationTitle && newMedicationDescription) {
            setMedications([...medications, { title: newMedicationTitle, description: newMedicationDescription }]);
            setNewMedicationTitle('');
            setNewMedicationDescription('');
        }
    };

    // Function to remove a medication
    const removeMedication = (index) => {
        const updatedMedications = [...medications];
        updatedMedications.splice(index, 1);
        setMedications(updatedMedications);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Medications</Text>
            <ScrollView style={styles.scrollView}>
                {medications.map((medication, index) => (
                    <View key={index} style={styles.medicationItem}>
                        <Text style={styles.medicationTitle}>{medication.title}</Text>
                        <Text style={styles.medicationDescription}>{medication.description}</Text>
                        <TouchableOpacity onPress={() => removeMedication(index)}>
                            <Text style={styles.removeButton}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
            <View style={styles.formContainer}>
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
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    scrollView: {
        flex: 1,
    },
    medicationItem: {
        marginBottom: 20,
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
});

export default Medications;
