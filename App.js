import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import SquareWithImageBackground from './components/SquareWithImageBackground';
import RectangleWithImageBackground from './components/RectangleWithImageBackground';
import Greeting from './components/WelcomeMessage';

export default function App() {
    // Get the current time of day
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
  
    // Example name
    const name = 'Nived';
  return (
    <View style={styles.container}>
      <Greeting timeOfDay={currentHour} name={name} />
      
      <RectangleWithImageBackground          
          title="In Room"
          imageUrl={require('./assets/statusBackground.png')}
          color="#CCE9C1"
          fontSize={35} // Example font size
          />
      <View style={styles.row}>
        <SquareWithImageBackground
          title="34°"
          imageUrl={require('./assets/thermBackground.png')}
          color="#E5B9FA"
          fontSize={45} // Example font size
        />
        <SquareWithImageBackground
          title="No More Meds"
          imageUrl={require('./assets/pillBackground.png')}
          color="#FFCA99"
          fontSize={25} // Example font size
        />
      </View>
      <RectangleWithImageBackground          
          title="March 16, Appointment"
          imageUrl={require('./assets/hospitalBackground.png')}
          color="#FCADAD"
          fontSize={25} // Example font size
          />
      <StatusBar style="auto" />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
});
