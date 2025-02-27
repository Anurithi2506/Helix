import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from './components/auth';
// import HomeScreen from './components/HomeScreen';

import BottomTab from './components/BottomTAb';
import UploadScreen from './components/UploadScreen';
import RecipeSuggestionScreen from './components/RecipieSuggester'; // Fixed typo
import SmartwatchHealthScreen from './components/SmartWatch';
import HealthDetailsScreen from './components/HealthDetails';
import { configurePushNotifications } from './components/notificationHandler';
import { PermissionsAndroid, Platform } from 'react-native';
import { HealthProvider } from './components/HealthContext';

const Stack = createStackNavigator();

const App = () => {
  const requestPermissions = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) { // Check API level
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Notification permission denied!');
        }
      } catch (err) {
        console.error('Error requesting notification permission', err);
      }
    }
  };

  useEffect(() => {
    requestPermissions();
    configurePushNotifications();
  }, []);

  return (
    <HealthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Auth">
          <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
          <Stack.Screen name="bottomtab" component={BottomTab} options={{ headerShown: false }} />
          <Stack.Screen name="UploadScreen" component={UploadScreen} options={{ headerShown: false }} />
          <Stack.Screen name="recipe" component={RecipeSuggestionScreen} options={{ headerShown: false }} />
          <Stack.Screen name="watch" component={SmartwatchHealthScreen} options={{ headerShown: false }} />
          <Stack.Screen name="health" component={HealthDetailsScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </HealthProvider>
  );
};

export default App;
