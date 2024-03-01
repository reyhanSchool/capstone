import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ElderInformation = () => {
  const elder = {
    name: "John Doe",
    age: 75,
    gender: 'Male',
    address: '123 Main St, City, State',
    email: 'john.doe@example.com',
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
      </View>
    </View>
  );
}

const SquareWithColor = ({ title, value, color }) => (
  <View style={[styles.square, { backgroundColor: color }]}>
    <Text style={styles.label}>{title}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  square: {
    width: '48%',
    aspectRatio: 1, // Ensures a square shape
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  value: {
    fontSize: 14,
    color: '#666',
  },
});

export default ElderInformation;
