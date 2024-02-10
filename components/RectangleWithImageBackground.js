import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RectangleWithImageBackground = ({ title, imageUrl, color, fontSize }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (title === "Calendar") {
      navigation.navigate('CalendarScreen');
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
        width: 340,
        height: 120,
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 4, // Add shadow
        margin: 20,
      },
      imageBackground: {
        flex: 1,
        width: 100,
        height: 100,
        opacity: 0.1, // Adjust the opacity of the image
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 10,
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

export default RectangleWithImageBackground;
