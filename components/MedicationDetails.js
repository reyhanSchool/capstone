import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';

const MedicationDetails = ({ route }) => {
    // Extract the medication object from the route parameters
    const { medication } = route.params;
    
    // State variables to track edited values
    const [editedDescription, setEditedDescription] = useState(medication.description);
    const [editedDoctor, setEditedDoctor] = useState(medication.doctor);

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.title}>{medication.title}</Text>
                <Text style={styles.label}>Description:</Text>
                <TextInput
                    style={styles.input}
                    value={editedDescription}
                    onChangeText={text => setEditedDescription(text)}
                    multiline={true}
                />
                <Text style={styles.label}>Doctor:</Text>
                <TextInput
                    style={styles.input}
                    value={editedDoctor}
                    onChangeText={text => setEditedDoctor(text)}
                />
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
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    label: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#666',
    },
    input: {
        fontSize: 18,
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    scrollView: {
        flex: 1,
    },
});

export default MedicationDetails;
