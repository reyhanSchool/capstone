import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CalendarScreen = () => {

  const [selectedDate, setSelectedDate] = useState(null);
  const currentDate = new Date();
  const year = currentDate.getFullYear();

  //Function to get the current year and month
  const getCurrentMonthAndYear = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = months[currentDate.getMonth()];
    return `${month} ${year}`;
  };

  // Function to handle date selection
  const handleDateSelection = (date) => {
    setSelectedDate(date);
    // You can implement further actions upon date selection, such as navigating to a specific date's details
  };

  // Function to generate an array of dates based on the number of days in the current month
  const generateDatesArray = () => {
    const month = currentDate.getMonth() + 1; 

    // Get the number of days in the month
    const daysInMonth = new Date(year, month, 0).getDate();

    // Generate an array of dates from 1 to the number of days in the month
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
      <Text style={styles.headerText}>{getCurrentMonthAndYear()}</Text>
      <View style={styles.calendarContainer}>
        {/* Render your calendar here */}
        {generateDatesArray().map(date => renderDateCell(date))}
      </View>
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
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
});

export default CalendarScreen;
