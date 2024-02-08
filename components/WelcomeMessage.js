import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Greeting = ({ timeOfDay, name }) => {
  let greetingMessage;
  let emoji;

  // Determine the greeting message and emoji based on the time of day
  if (timeOfDay >= 5 && timeOfDay < 12) {
    greetingMessage = 'Good morning';
    emoji = '☀️';
  } else if (timeOfDay >= 12 && timeOfDay < 18) {
    greetingMessage = 'Good afternoon';
    emoji = '🌤️';
  } else {
    greetingMessage = 'Good evening';
    emoji = '🌙';
  }

  return (
    <Text style={styles.greeting}>{`${greetingMessage},\n${name} ${emoji}`}</Text>
  );
};

const styles = StyleSheet.create({
  greeting: {
    textAlign: 'left',
    fontSize: 40,
  },
});

export default Greeting;
