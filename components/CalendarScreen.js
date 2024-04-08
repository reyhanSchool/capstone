import React, { useState, useRef, useEffect } from 'react';
import { Alert, View, ScrollView, Text, StyleSheet, TouchableOpacity, Button, Animated } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isCalendarCollapsed, setIsCalendarCollapsed] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [appointments, setAppointments] = useState([]);

  const currentYear = new Date().getFullYear();
  const yearsArray = Array.from({ length: 100 }, (_, index) => currentYear - index);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const apiUrl = 'https://serious-ascent-412517.ue.r.appspot.com/api/getAppointmentInfo';

      const fetchAppointments = async () => {
        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          setAppointments(data);
        } catch (error) {
          console.error('Error fetching Appointment information:', error);
        }
      };

      fetchAppointments();
    }, [])
  );

  const handleDateSelection = (date) => {
    setSelectedDate(date);
    setIsCalendarCollapsed(true);
    fadeAnim.setValue(0);
    animateFadeIN();
  };

  const handleBackButtonPress = () => {
    setSelectedDate(null);
    setIsCalendarCollapsed(false);
    fadeAnim.setValue(0);
    animateFadeIN();
  };

  const animateFadeIN = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const generateDatesArray = () => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const datesArray = [];
    for (let i = 1; i <= daysInMonth; i++) {
      datesArray.push(i);
    }
    return datesArray;
  };

  const renderDateCell = (date) => {

    //Check if there any functions for the selected month
    const hasAppointments = appointments.some(appointment => {
      const [day, month, year] = appointment.date.split('/').map(Number);
      const correctedMonth = month - 1; // JavaScript months are 0-indexed
      return day === date && correctedMonth === selectedMonth && year === selectedYear;
    });

    const cellStyle = hasAppointments ? styles.dateCellWithAppoinntment : styles.dateCell;

    return (
      <TouchableOpacity key={date} onPress={() => handleDateSelection(date)}>
        <View style={cellStyle}>
          <Text style={styles.dateText}>{date}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleNewAppointment = () => {
    navigation.navigate('AddAppointment', {
      selectedDate,
      selectedMonth,
      selectedYear
    });
  };

  const renderAppointmentsForSelectedDate = () => {
    const selectedAppointments = appointments.filter(appointment => {
      // Assuming date format from API is "D/M/YYYY"
      const [day, month, year] = appointment.date.split('/').map(Number);
      // Correcting month index since JavaScript months are 0-indexed
      const correctedMonth = month - 1;

      return (
        day === selectedDate &&
        correctedMonth === selectedMonth &&
        year === selectedYear
      );
    });

    return selectedAppointments.map((appointment, index) => (
      <View key={index} style={styles.appointmentContainer}>
        <Text>Name of Appointment: {appointment.nameOfAppointment}</Text>
        <Text>Doctor: {appointment.doctor}</Text>
        <Text>Time: {appointment.time}</Text>
        <Text>Location: {appointment.location}</Text>
        <Text>Address: {appointment.address}</Text>
        <Text>Phone Number: {appointment.phoneNumber}</Text>
        <Text>Additional Notes: {appointment.additionalNotes}</Text>
        <Button
          title="Delete"
          onPress={() => handleDeleteAppointment(appointment.nameOfAppointment)}
          color="red"
        />
      </View>
    ));
  };

  const handleDeleteAppointment = async (nameOfAppointment) => {
    try {
      const apiUrl = `https://serious-ascent-412517.ue.r.appspot.com/api/deleteAppointmentByName/${nameOfAppointment}`;
      const response = await fetch(apiUrl, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Appointment deleted successfully");
        fetchAppointments(); // Refresh the appointments list
      } else {
        Alert.alert("Error", data.message || "Failed to delete the appointment");
      }
    } catch (error) {
      console.error('Error deleting appointment:', error);
      Alert.alert("Error", "An unexpected error occurred");
    }
  };

  const fetchAppointments = async () => {
    try {
      const apiUrl = 'https://serious-ascent-412517.ue.r.appspot.com/api/getAppointmentInfo';
      const response = await fetch(apiUrl);
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching Appointment information:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchAppointments();
    }, [])
  );

  const CustomPicker = ({ selectedValue, onValueChange, data }) => {
    return (
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={styles.picker}
      >
        {data.map((item, index) => (
          <Picker.Item key={index} label={item.label} value={item.value} />
        ))}
      </Picker>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <CustomPicker
          selectedValue={selectedMonth}
          onValueChange={(itemValue) => setSelectedMonth(itemValue)}
          data={[
            { label: 'January', value: 0 },
            { label: 'February', value: 1 },
            { label: 'March', value: 2 },
            { label: 'April', value: 3 },
            { label: 'May', value: 4 },
            { label: 'June', value: 5 },
            { label: 'July', value: 6 },
            { label: 'August', value: 7 },
            { label: 'September', value: 8 },
            { label: 'October', value: 9 },
            { label: 'November', value: 10 },
            { label: 'December', value: 11 },
          ]}
        />

        <CustomPicker
          selectedValue={selectedYear}
          onValueChange={(itemValue) => setSelectedYear(itemValue)}
          data={yearsArray.map((year) => ({ label: year.toString(), value: year }))}
        />
      </View>

      {!isCalendarCollapsed && (
        <View style={styles.calendarContainer}>
          {generateDatesArray().map(date => renderDateCell(date))}
        </View>
      )}

      {selectedDate && isCalendarCollapsed && (
        <Animated.View style={[styles.selectedDateContainer, { opacity: fadeAnim }]}>
          <Text style={styles.eventsText}>Events for {selectedDate}/{selectedMonth + 1}/{selectedYear}:</Text>
          <ScrollView>
            {renderAppointmentsForSelectedDate()}
          </ScrollView>
          <Button title="Back" onPress={handleBackButtonPress} />
          <Button title="New Appointment" onPress={handleNewAppointment} />
        </Animated.View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
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
  contentContainer: {
    flexGrow: 1,
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
  dateCellWithAppoinntment: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: '#C41E3A',
    margin: 5,
  },
  dateText: {
    fontSize: 18,
  },
  selectedDateContainer: {
    flex: 1,
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
  appointmentContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
  }
});

export default CalendarScreen;
