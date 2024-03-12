import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Switch, Text, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const MedicationDetails = ({ route }) => {
    // Extract the medication object from the route parameters
    const { medication } = route.params;

    // State variables to track edited values
    const [editedNameofMedication, setNameOfMedication] = useState(medication.title);
    const [editedDoctor, setEditedDoctor] = useState(medication.prescribedBy);
    const [editedInstructions, setEditedInstructions] = useState(medication.instructions);
    const [editedDatePrescribed, setDatePrescribed] = useState(medication.datePrescribed);
    const [editedDosage, setDosage] = useState(medication.dosage);
    const [editedRefrigerated, setRefrigerated] = useState(medication.refrigerated);
    const [editedSideEffects, setSideEffects] = useState(medication.sideEffects);

    const navigation = useNavigation();

    // Function to handle save action
    const handleSave = () => {
        // Perform save operation here (e.g., update the medication in the database)
        //Navigate back to medication page
        navigation.navigate('Medications');
        console.log("Saving changes...");
    };

    // Function to handle delete action
    const handleDelete = async () => {
        try {
            const response = await fetch(`https://serious-ascent-412517.ue.r.appspot.com/api/deleteMedicationByName/${medication.title}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Medication deleted successfully
                // Navigate back to medication page
                navigation.navigate('Medications');
            } else {
                console.error('Failed to delete medication:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting medication:', error);
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Medication Name</Text>
                <TouchableOpacity onPress={handleSave}>
                    <MaterialIcons name="done" size={24} color="#333" />
                </TouchableOpacity>
            </View>

            {/* Medication Information */}
            <ScrollView style={styles.scrollView}>
                {/* Name */}
                <Text style={styles.label}>Medication Name:</Text>
                <TextInput
                    style={styles.input}
                    value={editedNameofMedication}
                    onChangeText={text => setNameOfMedication(text)}
                />

                {/* Doctor */}
                <Text style={styles.label}>Doctor:</Text>
                <TextInput
                    style={styles.input}
                    value={editedDoctor}
                    onChangeText={text => setEditedDoctor(text)}
                />

                {/* Dosage */}
                <Text style={styles.label}>Dosage:</Text>
                <TextInput
                    style={styles.input}
                    value={editedDosage}
                    onChangeText={text => setDosage(text)}
                />

                {/* Instructions */}
                <Text style={styles.label}>Instructions:</Text>
                <TextInput
                    style={styles.input}
                    value={editedInstructions}
                    onChangeText={text => setEditedInstructions(text)}
                />

                {/* Date Prescribed */}
                <Text style={styles.label}>Date Prescribed:</Text>
                <TextInput
                    style={styles.input}
                    value={editedDatePrescribed}
                    onChangeText={text => setDatePrescribed(text)}
                />

                {/* Refrigerated */}
                <Text style={styles.label}>Refrigerated:</Text>
                <Switch
                    value={editedRefrigerated}
                    onValueChange={value => setRefrigerated(value)}
                    thumbColor={editedRefrigerated ? 'blue' : 'grey'}
                    trackColor={{ false: 'grey', true: 'lightblue' }}
                />

                {/* Side Effects */}
                <Text style={styles.label}>Side Effects:</Text>
                <TextInput
                    style={styles.input}
                    value={editedSideEffects}
                    onChangeText={text => setSideEffects(text)}
                />

                {/* Delete Button */}
                <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                    <Text style={styles.deleteButtonText}>Delete Medication</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F2F5',
        padding: 20,
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
        color: '#333',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#666',
    },
    input: {
        fontSize: 16,
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    scrollView: {
        flex: 1,
    },
    deleteButton: {
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MedicationDetails;
