import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const MedicationForm = ({ onSubmit }) => {
    const [newMedicationTitle, setNewMedicationTitle] = useState('');
    const [newMedicationDescription, setNewMedicationDescription] = useState('');
    const [PractionerOrder, setNewMedicationPractioner] = useState('');

    const handleAddMedication = () => {
        onSubmit({
            title: newMedicationTitle,
            description: newMedicationDescription,
            practitioner: PractionerOrder
        });
        setNewMedicationTitle('');
        setNewMedicationDescription('');
        setNewMedicationPractioner('');
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
            />
            <TextInput
                style={styles.input}
                placeholder="Practitioner"
                value={PractionerOrder}
                onChangeText={text => setNewMedicationPractioner(text)}
            />
            <Button title="Add Medication" onPress={handleAddMedication} />
        </View>
    );
};

const styles = StyleSheet.create({
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

export default MedicationForm;
