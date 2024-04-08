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

  const renderElderInfoItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>Name: {item.FirstName} {item.LastName}</Text>
      <Text style={styles.itemText}>Age: {item.Age}</Text>
      <Text style={styles.itemText}>Address: {item.Address}</Text>
      <Text style={styles.itemText}>Contact: {item.PhoneNumer}</Text>
      <Text style={styles.itemText}>Gender: {item.Gender}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Elder Information</Text>
      <FlatList
        data={elderInfo}
        renderItem={renderElderInfoItem}
        keyExtractor={item => item._id}
      />
    </View>
  );
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
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
});

export default ElderInformation;
