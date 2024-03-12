import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, PanResponder, Dimensions, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const GRID_ROWS = 24;
const GRID_COLS = 32;
const CELL_SIZE = Dimensions.get('window').width / GRID_COLS;
const STORAGE_KEY = 'GRID_STATE';

export default function AreaSelectionScreen() {
  const [selectedCells, setSelectedCells] = useState(new Array(GRID_ROWS * GRID_COLS).fill(false));
  const [selectedItem, setSelectedItem] = useState('bed');
  const viewRef = useRef();

  useEffect(() => {
    const loadGridState = async () => {
      try {
        const savedGridState = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedGridState !== null) {
          setSelectedCells(JSON.parse(savedGridState));
        }
      } catch (error) {
        Alert.alert("Error", "Failed to load the grid state.");
      }
    };

    loadGridState();
  }, []);

  const selectedItemRef = useRef(selectedItem);

  const saveGridState = async () => {
    try {
      // Save to AsyncStorage
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(selectedCells));
      Alert.alert('Success', 'Your grid state has been saved locally.');
  
      // Now submit the same data to your server
      const response = await fetch('https://serious-ascent-412517.ue.r.appspot.com/api/submitAreaSelection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedCells: selectedCells }),
      });
  
      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Your area selection has been submitted successfully.');
      } else {
        Alert.alert('Error', `Failed to submit area selection: ${data.message}`);
      }
    } catch (error) {
      Alert.alert('Error', `Failed to save the grid state: ${error.message}`);
    }
  };
  

  const resetGridState = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY); // Remove the saved state from AsyncStorage
      setSelectedCells(new Array(GRID_ROWS * GRID_COLS).fill(false)); // Reset grid state in the component
      Alert.alert('Reset', 'The grid has been reset successfully.');
    } catch (error) {
      Alert.alert("Error", "Failed to reset the grid state.");
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        // Access the current selected item directly from the ref
        selectCell(gestureState.x0, gestureState.y0, selectedItemRef.current);
      },
      onPanResponderMove: (evt, gestureState) => {
        // Same here, access the current selected item directly from the ref
        selectCell(gestureState.moveX, gestureState.moveY, selectedItemRef.current);
      },
    })
  ).current;



  const selectCell = (x, y, currentSelectedItem) => {
    viewRef.current.measure((fx, fy, width, height, px, py) => {
      const relativeX = x - px;
      const relativeY = y - py;
      const touchRadius = 20;
      const touchRadiusInCells = Math.floor(touchRadius / CELL_SIZE);
      const col = Math.min(Math.floor(relativeX / CELL_SIZE), GRID_COLS - 1);
      const row = Math.min(Math.floor(relativeY / CELL_SIZE), GRID_ROWS - 1);

      setSelectedCells(prevCells => {
        const updatedCells = [...prevCells];
        for (let i = Math.max(row - touchRadiusInCells, 0); i <= Math.min(row + touchRadiusInCells, GRID_ROWS - 1); i++) {
          for (let j = Math.max(col - touchRadiusInCells, 0); j <= Math.min(col + touchRadiusInCells, GRID_COLS - 1); j++) {
            const index = i * GRID_COLS + j;
            // Use the current value from the ref
            updatedCells[index] = currentSelectedItem;
          }
        }
        return updatedCells;
      });
    });
  };



  const renderCells = () => {
    const cells = [];
    for (let row = 0; row < GRID_ROWS; row++) {
      for (let col = 0; col < GRID_COLS; col++) {
        const index = row * GRID_COLS + col;
        let cellStyle = styles.cell;
        if (selectedCells[index] === 'bed') {
          cellStyle = [styles.cell, styles.bedCell]; // ensures bed cells are blue
        } else if (selectedCells[index] === 'door') {
          cellStyle = [styles.cell, styles.doorCell]; // ensures door cells are green
        }
        cells.push(
          <View
            key={`${row}-${col}`}
            style={cellStyle}
          />
        );
      }
    }
    return cells;
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View
        ref={viewRef}
        style={styles.container}
        {...panResponder.panHandlers}
      >
        {renderCells()}
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Save Grid State" onPress={saveGridState} />
        <Button title="Reset Grid State" onPress={resetGridState} color="red" />
      </View>
      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={selectedItem}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setSelectedItem(itemValue)}
        >
          <Picker.Item label="Bed" value="bed" />
          <Picker.Item label="Door" value="door" />
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: CELL_SIZE * GRID_COLS,
    height: CELL_SIZE * GRID_ROWS,
    marginTop: 20, // Adjust as needed
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedCell: {
    backgroundColor: 'red',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-around',
    width: '100%',
  },
  dropdownContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-around',
    width: '100%',
  },
  picker: {
    height: 50,
    width: 150,
  },
  bedCell: {
    backgroundColor: 'blue', // Color for bed
  },
  doorCell: {
    backgroundColor: 'green', // Color for door
  },
});
