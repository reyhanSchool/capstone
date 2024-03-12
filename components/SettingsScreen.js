import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function SettingsScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>GENERAL</Text>
        <SettingsItem title="Account" iconName="person-outline" onPress={() => {}} />
        <SettingsItem title="Notifications" iconName="notifications-outline" onPress={() => navigation.navigate('Notifications')} />
        <SettingsItem title="Area Selection" iconName="home-outline" onPress={() => navigation.navigate('AreaSelection')} />
        <SettingsItem title="Logout" iconName="log-out-outline" onPress={() => navigation.navigate('Wellness MS')} />
        <SettingsItem title="Delete account" iconName="trash-outline" onPress={() => {}} />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>FEEDBACK</Text>
        <SettingsItem title="Report a bug" iconName="bug-outline" onPress={() => {}} />
        <SettingsItem title="Send feedback" iconName="mail-outline" onPress={() => {}} />
      </View>
    </ScrollView>
  );
}

const SettingsItem = ({ title, iconName, onPress }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <Ionicons name={iconName} size={24} style={styles.icon} />
    <Text style={styles.itemText}>{title}</Text>
    <Ionicons name="chevron-forward-outline" size={24} style={styles.chevron} />
  </TouchableOpacity>
  
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  section: {
    marginTop: 35,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
    marginLeft: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    marginLeft: 20,
  },
  icon: {
    color: '#6e6e6e',
  },
  itemText: {
    flex: 1,
    marginLeft: 20,
    fontSize: 18,
  },
  chevron: {
    color: '#cbcbcb',
  },
});
