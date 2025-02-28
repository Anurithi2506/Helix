import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View, StyleSheet, Animated,Text } from 'react-native';
import DashboardScreen from './HomeScreen';
import HealthProfileScreen from './Profile';
import Chatbot from './Chatbot';
import MedicationReminderScreen from './MedicationScreen';
import NutritionAnalysisScreen from './NutritionAnalysisScreen';
import LinearGradient from 'react-native-linear-gradient';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          const scaleValue = new Animated.Value(1);

          if (focused) {
            Animated.spring(scaleValue, {
              toValue: 1.2,
              useNativeDriver: true,
            }).start();
          } else {
            Animated.spring(scaleValue, {
              toValue: 1,
              useNativeDriver: true,
            }).start();
          }

          if (route.name === 'Nutrition') {
            return (
              <Animated.View 
                style={[
                  styles.centerTab, 
                  focused && styles.centerTabActive,
                  { transform: [{ scale: scaleValue }] }
                ]}
              >
                <LinearGradient
                  colors={focused ? ['#0D69D7', '#1C8EF9'] : ['#FFF', '#F8FAFF']}
                  style={styles.gradientBackground}
                >
                  <Image 
                    source={focused 
                      ? require('../assets/nutrition-filled.png') 
                      : require('../assets/nutrition.png')}
                    style={[
                      styles.centerIcon, 
                      { tintColor: focused ? '#FFF' : '#0D69D7' }
                    ]}
                  />
                </LinearGradient>
              </Animated.View>
            );
          }

          // Other icons
          if (route.name === 'Home') {
            iconName = focused
              ? require('../assets/home-filled.png')
              : require('../assets/home.png');
          } else if (route.name === 'Profile') {
            iconName = focused
              ? require('../assets/profile-filled.png')
              : require('../assets/profile.png');
          } else if (route.name === 'meds') {
            iconName = focused 
              ? require('../assets/medicines.png') 
              : require('../assets/medicines_filled.png');
          } else if (route.name === 'chatbot') {
            iconName = focused 
              ? require('../assets/Chatbot/chatbot-filled.png') 
              : require('../assets/Chatbot/chatbot.png');
          }

          return (
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <Image 
                source={iconName} 
                style={{ 
                  width: size, 
                  height: size, 
                  tintColor: focused ? '#0D69D7' : '#999',
                  shadowColor: focused ? '#0D69D7' : 'transparent',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 3,
                }} 
              />
            </Animated.View>
          );
        },
        tabBarActiveTintColor: '#0D69D7',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#FFF',
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -5 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 20,
        },
        tabBarLabel: ({ focused }) => {
          return (
            <Text style={[styles.label, { color: focused ? '#0D69D7' : '#999' }]}>
              {route.name}
            </Text>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={DashboardScreen} />
      <Tab.Screen name="meds" component={MedicationReminderScreen} />
       <Tab.Screen 
        name="Nutrition" 
        component={NutritionAnalysisScreen} 
        
      /> 
      <Tab.Screen name="chatbot" component={Chatbot} />
      <Tab.Screen name="Profile" component={HealthProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  centerTab: {
    top: -25,
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  centerTabActive: {
    shadowColor: '#0D69D7',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  gradientBackground: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerIcon: {
    width: 32,
    height: 32,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    // marginTop: -5,
    marginBottom: 5,
  },
});

export default BottomTab;