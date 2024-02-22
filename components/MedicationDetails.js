import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MedicationDetails = ({ route }) => {
    // Extract the medication object from the route parameters
    const { medication } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{medication.title}</Text>
            <Text style={styles.description}>Description: {medication.description}</Text>
            <Text style={styles.doctor}>Doctor: {medication.doctor}</Text>
            {/* Render additional details as needed */}
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
        marginBottom: 10,
    },
    description: {
        fontSize: 18,
        marginBottom: 5,
    },
    doctor: {
        fontSize: 18,
        marginBottom: 5,
    },
    // Add additional styles as needed
});

export default MedicationDetails;
