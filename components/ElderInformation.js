import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ElderInformation = () => {
    const elderName = "John"
    const elderAge = 21;

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Elder's Name:</Text>
            <Text style={styles.text}>{elderName}</Text>

            <Text style={styles.label}>Elder's Age:</Text>
            <Text style={styles.text}>{elderAge}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#666',
    },
    text: {
        fontSize: 16,
        marginBottom: 15,
        color: '#333',
    },
});

export default ElderInformation;
