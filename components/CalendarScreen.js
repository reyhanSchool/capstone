import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isCalendarCollapsed, setIsCalendarCollapsed] = useState(false); // New state

  const currentYear = new Date().getFullYear();
  const yearsArray = Array.from({ length: 100 }, (_, index) => currentYear - index);

  // Function to handle date selection
  const handleDateSelection = (date) => {
    setSelectedDate(date);
    setIsCalendarCollapsed(true); // Collapse calendar when a date is selected
  };

  // Function to handle back button press
  const handleBackButtonPress = () => {
    setSelectedDate(null);
    setIsCalendarCollapsed(false); // Expand calendar when back button is pressed
  };

  // Function to generate an array of dates based on the number of days in the selected month
  const generateDatesArray = () => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const datesArray = [];
    for (let i = 1; i <= daysInMonth; i++) {
      datesArray.push(i);
    }
    return datesArray;
  };

  // Render function for individual date cells
  const renderDateCell = (date) => {
    // You can customize this rendering function according to your design requirements
    return (
      <TouchableOpacity key={date} onPress={() => handleDateSelection(date)}>
        <View style={styles.dateCell}>
          <Text style={styles.dateText}>{date}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Picker
          selectedValue={selectedMonth}
          onValueChange={(itemValue) => setSelectedMonth(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="January" value={0} />
          <Picker.Item label="February" value={1} />
          <Picker.Item label="March" value={2} />
          <Picker.Item label="April" value={3} />
          <Picker.Item label="May" value={4} />
          <Picker.Item label="June" value={5} />
          <Picker.Item label="July" value={6} />
          <Picker.Item label="August" value={7} />
          <Picker.Item label="September" value={8} />
          <Picker.Item label="October" value={9} />
          <Picker.Item label="November" value={10} />
          <Picker.Item label="December" value={11} />
        </Picker>

        <Picker
          selectedValue={selectedYear}
          onValueChange={(itemValue) => setSelectedYear(itemValue)}
          style={styles.picker}
        >
          {yearsArray.map((year) => (
            <Picker.Item key={year} label={year.toString()} value={year} />
          ))}
        </Picker>
      </View>

      {/* Render the calendar only if it's not collapsed */}
      {!isCalendarCollapsed && (
        <View style={styles.calendarContainer}>
          {/* Render your calendar here */}
          {generateDatesArray().map(date => renderDateCell(date))}
        </View>
      )}

      {/* Display selected date and events */}
      {selectedDate && isCalendarCollapsed && (
        
        <View style={styles.selectedDateContainer}>
          <Text style={styles.selectedDateText}>
            Selected Date: {selectedDate}/{selectedMonth + 1}/{selectedYear}
          </Text>
          {/* Render events for the selected date here */}
          {/* Replace the placeholder text with actual events */}
          <Text style={styles.eventsText}>Events for {selectedDate}/{selectedMonth + 1}/{selectedYear}:</Text>
          <Text style={styles.eventsText}>Event 1</Text>
          <Text style={styles.eventsText}>Event 2</Text>

            {/* Back button to collapse selected day and display calendar */}
            <Button title="Back" onPress={handleBackButtonPress} />

        </View>
      )}
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  picker: {
    width: 150,
    marginHorizontal: 10,
  },
  calendarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  dateCell: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 5,
  },
  dateText: {
    fontSize: 18,
  },
  selectedDateContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  selectedDateText: {
    fontSize: 20,
    marginBottom: 10,
  },
  eventsText: {
    fontSize: 16,
  },
});

export default CalendarScreen;
