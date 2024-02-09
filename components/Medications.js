import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';

const Medications = () => {
    // Dummy list of medications
    const medications = [
        'Medication 1',
        'Medication 2',
        'Medication 3',
        'Medication 4',
        // Add more medications as needed
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Medications</Text>
            <ScrollView style={styles.scrollView}>
                {medications.map((medication, index) => (
                    <Text key={index} style={styles.medicationItem}>
                        {medication}
                    </Text>
                ))}
            </ScrollView>
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
        fontSize: 18,
        marginBottom: 10,
    },
});

export default Medications;
