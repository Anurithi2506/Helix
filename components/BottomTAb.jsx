import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import DashboardScreen from './screens/DashboardScreen';
// import MedicationScreen from './screens/MedicationScreen'; // Create this screen
// import AlertsScreen from './screens/AlertsScreen'; // Create this screen
// import ProfileScreen from './screens/ProfileScreen'; // Create this screen
import { Image } from 'react-native';
import DashboardScreen from './HomeScreen';
import HealthProfileScreen from './Profile';
import UploadScreen from './UploadScreen';
import Chatbot from './Chatbot';
import MedicationReminderScreen from './MedicationScreen';
const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    
      <Tab.Navigator
        screenOptions={({ route }) => ({
           headerShown: false ,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? require('../assets/home-filled.png')
                : require('../assets/home.png');
            }
            //  else if (route.name === 'upload') {
            //   iconName = focused
            //     // ? require('./assets/icons/pill_filled.png')
            //     require('../assets/Dashboard/pill.png');
            // } 
            // else if (route.name === 'Alerts') {
            //   iconName = focused
            //     ? require('./assets/icons/alerts_filled.png')
            //     : require('./assets/icons/alerts.png');
            // }
             else if (route.name === 'Profile') {
              iconName = focused
                ? require('../assets/profile-filled.png')
                : require('../assets/profile.png');
            }
            else if(route.name === 'meds'){
              iconName = focused?require('../assets/medicines.png') : require('../assets/medicines_filled.png')
            } 
            else if(route.name ==='chatbot'){
              iconName = focused?require('../assets/Chatbot/chatbot-filled.png') :require('../assets/Chatbot/chatbot.png')
            }

            return <Image source={iconName} style={{ width: size, height: size, tintColor: color }} />;
          },
          tabBarActiveTintColor: '#0D69D7',
          tabBarInactiveTintColor: '#999',
          tabBarStyle: {
            backgroundColor: '#FFF',
            borderTopWidth: 1,
            borderTopColor: '#EEE',
          },
        })}
      >
        <Tab.Screen name="Home" component={DashboardScreen}  />
        {/* <Tab.Screen name="Medication" component={MedicationScreen} />
        <Tab.Screen name="Alerts" component={AlertsScreen} /> */}
        {/* <Tab.Screen name='upload' component={UploadScreen} />/ */}
        <Tab.Screen name="Profile" component={HealthProfileScreen} />
        <Tab.Screen name='chatbot' component={Chatbot} />
        <Tab.Screen name='meds' component={MedicationReminderScreen} />
      </Tab.Navigator>
  );
};

export default BottomTab;