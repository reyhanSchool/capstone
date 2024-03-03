import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, PanResponder, Dimensions } from 'react-native';

const GRID_ROWS = 24; // Adjust based on your needs
const GRID_COLS = 32; // Adjust based on your needs
const CELL_SIZE = Dimensions.get('window').width / GRID_COLS; // Adjust cell size based on screen width

export default function AreaSelectionScreen() {
  const [selectedCells, setSelectedCells] = useState({});
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        // Handle the start of the touch
        const cell = getCellFromCoordinates(gestureState.x0, gestureState.y0);
        if (cell) {
          setSelectedCells({ ...selectedCells, [cell]: true });
        }
      },
      onPanResponderMove: (evt, gestureState) => {
        // Handle the movement of the touch
        const cell = getCellFromCoordinates(gestureState.moveX, gestureState.moveY);
        if (cell && !selectedCells[cell]) {
          setSelectedCells({ ...selectedCells, [cell]: true });
        }
      },
    })
  ).current;

  function getCellFromCoordinates(x, y) {
    const col = Math.min(Math.floor(x / CELL_SIZE), GRID_COLS - 1);
    const row = Math.min(Math.floor(y / CELL_SIZE), GRID_ROWS - 1);
    return `${row}-${col}`;
  }

  const renderCells = () => {
    const cells = [];
    for (let row = 0; row < GRID_ROWS; row++) {
      for (let col = 0; col < GRID_COLS; col++) {
        const key = `${row}-${col}`;
        cells.push(
          <View
            key={key}
            style={[
              styles.cell,
              selectedCells[key] && styles.selectedCell,
            ]}
          />
        );
      }
    }
    return cells;
  };

  return (
    <View
      style={styles.container}
      {...panResponder.panHandlers}
    >
      {renderCells()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: CELL_SIZE * GRID_COLS,
    height: CELL_SIZE * GRID_ROWS,
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
});
