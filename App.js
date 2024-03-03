import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import SquareWithImageBackground from './components/SquareWithImageBackground';
import RectangleWithImageBackground from './components/RectangleWithImageBackground';
import Greeting from './components/WelcomeMessage';
import Medications from './components/Medications';
import CalendarScreen from './components/CalendarScreen';
import LoginScreen from './components/LoginScreen';
import MedicationDetails from './components/MedicationDetails';
import ElderInformation from './components/ElderInformation';
import SettingsScreen from './components/SettingsScreen';
import AreaSelectionScreen from './components/AreaSelectionScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Wellness MS" component={LoginScreen} />
        <Stack.Screen name="Medications" component={Medications} />
        <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
        <Stack.Screen name ="MedicationDetails" component={MedicationDetails} />
        <Stack.Screen name="ElderInformation" component={ElderInformation} />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <Ionicons name="settings-outline" size={25} style={{ marginRight: 15 }} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="AreaSelection" component={AreaSelectionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const name = 'Nived';

  return (
    <View style={styles.container}>
      <Greeting timeOfDay={currentHour} name={name} />
      <View style={styles.content}>
      <RectangleWithImageBackground
          id="Elder Information" 
          title="Elder Information" 
          imageUrl={require('./assets/statusBackground.png')} 
          color="#FFCA99"
          fontSize={25}
          onPress={() => navigation.navigate('ElderInformation')} />
        <RectangleWithImageBackground
          id="Live View"
          title="In Room"
          imageUrl={require('./assets/statusBackground.png')}
          color="#CCE9C1"
          fontSize={35}
          onPress={() => navigation.navigate('CalendarScreen')} 
        />
        <View style={styles.row}>
          <SquareWithImageBackground
            id="Temperature Log"
            title="34°"
            imageUrl={require('./assets/thermBackground.png')}
            color="#E5B9FA"
            fontSize={45}
          />
          <SquareWithImageBackground
            id="Medication"
            title="2 left"
            imageUrl={require('./assets/pillBackground.png')}
            color="#FFCA99"
            fontSize={25}
            onPress={() => navigation.navigate('Medications')} 
          />
        </View>
        <RectangleWithImageBackground
          id="Appointments"
          title="Calendar"
          imageUrl={require('./assets/hospitalBackground.png')}
          color="#FCADAD"
          fontSize={25}
          onPress={() => navigation.navigate('CalendarScreen')}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
});
