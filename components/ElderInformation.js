import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const ElderInformation = () => {
  const [elderInfo, setElderInfo] = useState([]);

  useEffect(() => {
    fetch('https://serious-ascent-412517.ue.r.appspot.com/api/getElderInfo')
      .then(response => response.json())
      .then(data => {
        setElderInfo(data);
      })
      .catch(error => {
        console.error('Error fetching elder information:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Elder Information</Text>
      <FlatList
        data={elderInfo}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Name: {item.FirstName} {item.LastName}</Text>
            <Text>Age: {item.Age}</Text>
            <Text>Address: {item.Address}</Text>
            <Text>Contact: {item.PhoneNumer}</Text>
            <Text>Gender: {item.Gender}</Text>
          </View>
        )}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

const SquareWithColor = ({ title, value, color, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={[styles.square, { backgroundColor: color }]}>
      <Text style={styles.label}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  </TouchableOpacity>
);

const handleEmergencyContactsPress = (emergencyContacts) => {
  // Handle the press event for the Emergency Contacts square here
  console.log("Emergency Contacts Clicked:", emergencyContacts);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  infoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  square: {
    width: '48%', // Adjust the width to occupy half of the container
    aspectRatio: 1, // Ensures a square shape
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff',
  },
  value: {
    fontSize: 14,
    color: '#fff',
  },
});

export default ElderInformation;
