import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SquareWithImageBackground = ({ title, imageUrl, color, fontSize }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (title === "No More Meds") {
      navigation.navigate('Medications');
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={[styles.container, { backgroundColor: color }]}>
        <ImageBackground source={imageUrl} style={styles.imageBackground}>

        </ImageBackground>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { fontSize: fontSize }]}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
    margin: 15,
    elevation: 0.5, // Add shadow
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    opacity: 0.1, // Adjust the opacity of the image
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'black',
    opacity: 1, // Make the title text fully opaque
  },
});

export default SquareWithImageBackground;
