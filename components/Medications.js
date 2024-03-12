import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Animated, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import MedicationForm from './MedicationForm';
import { useNavigation, isFocused } from '@react-navigation/native';

const Medications = () => {
    const [medications, setMedications] = useState('');

    useEffect(() => {
        
        fetch('https://serious-ascent-412517.ue.r.appspot.com/api/medicationList')
          .then(response => response.json())
          .then(data => {
            setMedications(data);
          })
          .catch(error => {
            console.error('Error fetching medication information:', error);
        });
        
      }, []);
    
    const [showForm, setShowForm] = useState(false); // State variable to control form visibility
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();

    const toggleForm = () => {
        fadeAnim.setValue(0);
        setShowForm(!showForm);
        if (!showForm) {
            animateFadeIN();
        }
    };

    const animateFadeIN = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const addMedication = (medicationData) => {
        setMedications([...medications, medicationData]);
        setShowForm(false);
    };

    const viewMedicationDetails = (medication) => {
        // Navigate to the MedicationDetails screen with the selected medication
        navigation.navigate('MedicationDetails', { medication });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Medications</Text>
                <TouchableOpacity onPress={toggleForm}>
                    <MaterialIcons name={showForm ? "done" : "add"} size={24} color="black" />
                </TouchableOpacity>
            </View>
            {!showForm && (
                <FlatList style={styles.scrollView}
        data={medications}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => viewMedicationDetails(item)}>
            <View style={styles.medicationItemWrapper}>
              <View style={styles.medicationItem}>
                <Text style={styles.medicationTitle}>Name of Medication: {item.title}</Text>
                <Text style={styles.medicationDescription}>Dosage: {item.dosage}</Text>
                <Text style={styles.medicationDescription}>Refrigerated: {item.refrigerated}</Text>
                <Text style={styles.medicationDescription}>Instructions: {item.instructions}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item._id}
        contentContainerStyle={{ flexGrow: 1 }} // Ensure the FlatList takes up all available space
      />
            )}
            {showForm && (
                <Animated.View style={[styles.formContainer, styles.centeredView, { opacity: fadeAnim }]}>
                    <MedicationForm onSubmit={addMedication} />
                </Animated.View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
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
    },
    scrollView: {
        flex: 1,
    },
    medicationItemWrapper: {
        marginBottom: 20,
    },
    medicationItem: {
        padding: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
    },
    medicationTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    medicationDescription: {
        fontSize: 16,
        color: '#666',
    },
    formContainer: {
        marginTop: 20,
    },
    centeredView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Medications;
