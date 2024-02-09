import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Greeting from './components/WelcomeMessage';

export default function HomeScreen({ navigation, medications }) {
    // Get the current time of day
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
  
    // Example name
    const name = 'Nived';

    return (
        <View style={styles.container}>
            <Greeting timeOfDay={currentHour} name={name} />
            
            {medications.length > 0 ? (
                <View>
                    {/* Render components dependent on medications */}
                </View>
            ) : (
                <Text>No medications available</Text>
            )}
            
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
});
