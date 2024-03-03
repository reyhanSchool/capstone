import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

const MedicationDetails = ({ route }) => {
    const [selectedDate, setSelectedDate] = useState('');

    const handleDateChange = (date) => {
      setSelectedDate(date.toDateString()); // You can format the date as needed
    };
  

    // Extract the medication object from the route parameters
    const { medication } = route.params;
    
    // State variables to track edited values
    const [editedNameofMedication, setNameOfMedication] = useState(medication.NameOfMedication);
    const [editedDoctor, setEditedDoctor] = useState(medication.PrescribedBy);
    const [editedInstructions, setEditedInstructions] = useState(medication.Instructions);
    const [editedDatePrescribed, setDatePrescribed] = useState(medication.DatePrescribed.$currentDate.type);
    const [editedDosage, setDosage] = useState(medication.Dosage);
    const [editedRefrigerated, setRefrigerated] = useState(medication.Refrigered);
    const [editedSideEffects, setSideEffects] = useState(medication.SideEffects);

    const navigation = useNavigation();
    
    // Function to handle save action
    const handleSave = () => {
        // Perform save operation here (e.g., update the medication in the database)
        //Navigate back to medication page
        navigation.navigate('Medications');
        console.log("Saving changes...");
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
                <Text style={styles.sectionTitle}>{medication.title}</Text>
                
                {/* Description */}
                <Text style={styles.label}>Name:</Text>
                <TextInput
                    style={styles.input}
                    value={editedNameofMedication}
                    onChangeText={text => setNameOfMedication(text)}
                    multiline={true}
                />
                
                {/* Doctor */}
                <Text style={styles.label}>Doctor:</Text>
                <TextInput
                    style={styles.input}
                    value={editedDoctor}
                    onChangeText={text => setEditedDoctor(text)}
                    multiline={true}
                    textAlignVertical='top'
                />
                
                {/* Additional Information */}
                <Text style={styles.label}>Dosage:</Text>
                <TextInput
                    style={styles.input}
                    value={editedDosage}
                    onChangeText={text => setDosage(text)}
                    multiline={true}
                    textAlignVertical='top'
                />

                <Text style={styles.label}>Instruction:</Text>
                <TextInput
                    style={styles.input}
                    value={editedInstructions}
                    onChangeText={text => setEditedInstructions(text)}
                    multiline={true}
                    textAlignVertical='top'
                />
                
                <Text style={styles.label}>Date Prescribed:</Text>
                <Text style={styles.text}>{medication.DatePrescribed.$currentDate.type}</Text>

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
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
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
    text: {
        fontSize: 16,
        marginBottom: 10,
        color: '#333',
    },
    scrollView: {
        flex: 1,
    },
    multlineInput: {
        minHeight: 100,
        textAlignVertical: 'top'
    }
});

export default MedicationDetails;
