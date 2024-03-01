import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ElderInformation = () => {
  const elder = {
    name: "John Doe",
    age: 75,
    gender: 'Male',
    address: '123 Main St, City, State',
    city: 'Oshawa',
    province: 'Ontario',
    email: 'john.doe@example.com',
    phoneNumber: '1234326543',
    emergencyContacts: [
      {
        name: "Ruby Rose",
        phoneNumber: "1234567890",
        address: '432 Rubon Street',
        city: 'Pickering',
        province: 'Ontario'
      },
      {
        name: "Brian Erall",
        phoneNumber: "0987654321",
        address: '432 Rubon Street',
        city: 'Whitby',
        province: 'Ontario'
      },
    ]
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Elder Information</Text>
      <View style={styles.infoContainer}>
        <SquareWithColor title="Name" value={elder.name} color="#FFA07A" />
        <SquareWithColor title="Age" value={elder.age.toString()} color="#87CEEB" />
        <SquareWithColor title="Gender" value={elder.gender} color="#90EE90" />
        <SquareWithColor title="Address" value={elder.address} color="#FFD700" />
        <SquareWithColor title="Email" value={elder.email} color="#FF69B4" />
        <SquareWithColor title="Emergency Contacts" color="#00FFFF" onPress={() => handleEmergencyContactsPress(elder.emergencyContacts)} />
      </View>
    </View>
  );
}

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
