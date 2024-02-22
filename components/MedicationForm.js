import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const MedicationForm = ({ onSubmit }) => {
    const [newMedicationTitle, setNewMedicationTitle] = useState('');
    const [newMedicationDescription, setNewMedicationDescription] = useState('');
    const [practitioner, setPractitioner] = useState('');

    const handleAddMedication = () => {
        onSubmit({
            title: newMedicationTitle,
            description: newMedicationDescription,
            practitioner: practitioner
        });
        setNewMedicationTitle('');
        setNewMedicationDescription('');
        setPractitioner('');
    };

    return (
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
                multiline
            />
            <TextInput
                style={styles.input}
                placeholder="Practitioner"
                value={practitioner}
                onChangeText={text => setPractitioner(text)}
            />
            <Button title="Add Medication" onPress={handleAddMedication} />
        </View>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
});

export default MedicationForm;
