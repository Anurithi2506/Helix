import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from './components/auth'; // Adjust the path as needed
import HomeScreen from './components/HomeScreen'; // Create this screen or replace it with your own
import BottomTab from './components/BottomTAb';
import UploadScreen from './components/UploadScreen';
import RecipeSuggestionScreen from './components/RecipieSuggester';
import SmartwatchHealthScreen from './components/SmartWatch';
import HealthDetailsScreen from './components/HealthDetails';

// Create a stack navigator
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        {/* Auth Screen */}
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ headerShown: false }} // Hide the header for the Auth screen
        />
        {/* Home Screen */}
        <Stack.Screen
          name="bottomtab"
          component={BottomTab}
          options={{ headerShown: false }} // Customize the header title
        />
        <Stack.Screen
          name="UploadScreen"
          component={UploadScreen}
          options={{ headerShown: false }} // Customize the header title
        />
        <Stack.Screen
          name="recipie"
          component={RecipeSuggestionScreen}
          options={{ headerShown: false }} // Customize the header title
        />
        <Stack.Screen
          name="watch"
          component={SmartwatchHealthScreen}
          options={{ headerShown: false }} // Customize the header title
        />
        <Stack.Screen
          name="health"
          component={HealthDetailsScreen}
          options={{ headerShown: false }} // Customize the header title
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;