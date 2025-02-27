import PushNotification from 'react-native-push-notification';

export const configurePushNotifications = () => {
  // Check if the channel already exists
  PushNotification.channelExists('medication-reminders', (exists) => {
    if (!exists) {
      // Create the channel if it doesn't exist
      PushNotification.createChannel(
        {
          channelId: 'medication-reminders', // Must be unique
          channelName: 'Medication Reminders', // Human-readable name
          channelDescription: 'A channel to remind you to take medicine', // Description
          playSound: true, // Enable sound
          soundName: 'default', // Default sound
          importance: 4, // Importance level (4 = High)
          vibrate: true, // Enable vibration
        },
        created => {
          if (created) {
            console.log('Notification channel created successfully!');
          } else {
            console.error('Failed to create notification channel!');
          }
        },
      );
    } else {
      console.log('Notification channel already exists.');
    }
  });
};
// Function to schedule a notification
export const scheduleNotification = (medicineName, notificationTime) => {
  console.log('Scheduling notification at:', notificationTime);

  PushNotification.localNotificationSchedule({
    channelId: 'medication-reminders',
    title: `Reminder for ${medicineName}`,
    message: `Hey! It's time to take your ${medicineName}. Stay healthy! 💊`,
    date: notificationTime, // ⏰ Exact Date Object
    allowWhileIdle: true,
    playSound: true,
    soundName: 'default',
    vibrate: true,
  });

  console.log(`Notification set for ${medicineName} at ${notificationTime}`);
};
