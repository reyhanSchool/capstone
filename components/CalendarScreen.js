import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Button, Animated } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, NavigationContainer } from '@react-navigation/native';

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
  useEffect(() => {
    const apiUrl = 'https://serious-ascent-412517.ue.r.appspot.com/api/getAppointmentInfo';

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setAppointments(data);
      })
      .catch(error => {
        console.error('Error fetching Appointment information:', error);
      });
  }, []);

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
    return (
      <TouchableOpacity key={date} onPress={() => handleDateSelection(date)}>
        <View style={styles.dateCell}>
          <Text style={styles.dateText}>{date}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const handleNewAppointment = () => {
    navigation.navigate('AddAppointment');
  };
  const renderAppointmentsForSelectedDate = () => {
    const selectedAppointments = appointments.filter(appointment => {
      const [monthStr, dayStr, yearStr] = appointment.date.split(', ');
      const month = new Date(Date.parse(monthStr + ' 1, 2000')).getMonth(); 
      const day = parseInt(dayStr);
      const year = parseInt(yearStr);
      
      return (
        day === selectedDate &&
        month === selectedMonth &&
        year === selectedYear
      );
    });
    



    return selectedAppointments.map(appointment => (
      <View key={appointment.id}>
        <Text>{appointment.nameOfAppointment}</Text>
        <Text>{appointment.doctor}</Text>
        <Text>{appointment.time}</Text>
        <Text>{appointment.location}</Text>
        <Text>{appointment.address}</Text>
        <Text>{appointment.phoneNumber}</Text>
        <Text>{appointment.additionalNotes}</Text>
      </View>
    ));
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

      {!isCalendarCollapsed && (
        <View style={styles.calendarContainer}>
          {generateDatesArray().map(date => renderDateCell(date))}
        </View>
      )}
      
      {selectedDate && isCalendarCollapsed && (
        <Animated.View style={[styles.selectedDateContainer, { opacity: fadeAnim }]}>
          <Text style={styles.selectedDateText}>
            Selected Date: {selectedDate}/{selectedMonth + 1}/{selectedYear}
          </Text>
          <Text style={styles.eventsText}>Events for {selectedDate}/{selectedMonth + 1}/{selectedYear}:</Text>
          {renderAppointmentsForSelectedDate()}
          <Text></Text>
          <Button title="Back" onPress={handleBackButtonPress} />
          <Text></Text>
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
