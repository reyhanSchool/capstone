import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

function NotificationSettings() {
    const [notificationInterval, setNotificationInterval] = useState('10'); // Default interval of 10 minutes

    const handleIntervalChange = (value) => {
        const interval = parseInt(value);
        if (!isNaN(interval) && interval > 0) {
            setNotificationInterval(value);
        }
    };

    const handleSubmit = () => {
        console.log(`Notification interval set to ${notificationInterval} minutes.`);
        // You can add logic here to save the notification interval to your backend or perform other actions
    };

    return (
        <View>
            <Text> Notification Settings </Text>
            <View>
                <Text>Notification Interval (minutes):</Text>
                <TextInput
                    style={{ height: 40, width: 100, paddingLeft: 10, marginLeft: 150, borderColor: 'gray', borderWidth: 1 }}
                    keyboardType="numeric"
                    value={notificationInterval}
                    onChangeText={handleIntervalChange}
                />
            </View>
            <Button title="Save" onPress={handleSubmit} />
        </View>
    );
}

export default NotificationSettings;
