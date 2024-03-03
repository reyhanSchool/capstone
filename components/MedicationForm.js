import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Switch, Text } from 'react-native';

const MedicationForm = ({ onSubmit }) => {
    const [newMedicationTitle, setNewMedicationTitle] = useState('');
    const [dosage, setDosage] = useState('');
    const [prescribedBy, setPrescribedBy] = useState('');
    const [datePrescribed, setDatePrescribed] = useState('');
    const [refrigerated, setRefrigerated] = useState(false);
    const [instructions, setInstructions] = useState('');
    const [sideEffects, setSideEffects] = useState('');

    const handleAddMedication = async () => {
        try {
            const response = await fetch('https://serious-ascent-412517.ue.r.appspot.com/api/insertMedication', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: newMedicationTitle,
                    dosage: dosage,
                    prescribedBy: prescribedBy,
                    datePrescribed: datePrescribed,
                    refrigerated: refrigerated,
                    instructions: instructions,
                    sideEffects: sideEffects,
                }),
            });

            const data = await response.json();
            console.log(data)
            console.log(response.ok)
            if (response.ok) {
                // Call the onSubmit prop if insertion was successful
                onSubmit(data);
                // Clear the form fields after successful submission
                setNewMedicationTitle('');
                setDosage('');
                setPrescribedBy('');
                setDatePrescribed('');
            } else {
                // Handle error if insertion failed
                console.error('Failed to insert medication:', data.message);
            }
        } catch (error) {
            console.error('Error inserting medication:', error);
        }
    };

    return (
        <View style={styles.formContainer}>
            <TextInput
                style={styles.input}
                placeholder="Medication Name"
                value={newMedicationTitle}
                onChangeText={text => setNewMedicationTitle(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Dosage"
                value={dosage}
                onChangeText={text => setDosage(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Prescribed By"
                value={prescribedBy}
                onChangeText={text => setPrescribedBy(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Date Prescribed"
                value={datePrescribed}
                onChangeText={text => setDatePrescribed(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Refrigerated"
                value={refrigerated}
                onChangeText={text => setRefrigerated(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Instructions"
                value={instructions}
                onChangeText={text => setInstructions(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Side Effects"
                value={sideEffects}
                onChangeText={text => setSideEffects(text)}
            />
            
            <Button title="Add Medication" onPress={handleAddMedication} />
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
});

export default MedicationForm;
