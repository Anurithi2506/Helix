import React, { createContext, useState } from 'react';

const initialProfileData = {
  name: 'Rooban',
  subtitle: 'Health Enthusiast',
  profilePhoto: require('../assets/Dashboard/profile.png'),
  age: '28',
  gender: 'Male',
  height: '180 cm', // Added unit for better UI
  weight: '75 kg', // Added unit
  allergies: 'None',
  chronicConditions: 'None',
  medications: 'None',
  activityLevel: 'Moderate',
  diet: 'Vegetarian',
  sleep: '7-8 hours/day',
};

const initialHealthStats = [
  {
    id: '1',
    title: 'Heart Rate',
    value: '72 bpm',
    progress: 0.7,
    color: '#0D69D7',
    image: require('../assets/Dashboard/heart.png'),
    navigateTo: 'health',
  },
  {
    id: '2',
    title: 'Steps',
    value: '8,560',
    progress: 0.85,
    color: '#1C8EF9',
    image: require('../assets/Dashboard/steps.png'),
    navigateTo: 'steps',
  },
  {
    id: '3',
    title: 'Smartwatch',
    value: 'Connected',
    progress: 1,
    color: '#0D69D7',
    image: require('../assets/Dashboard/smartwatch.png'),
    navigateTo: 'watch',
  },
  {
    id: '4',
    title: 'Blood Pressure',
    value: '120/80',
    progress: 0.6,
    color: '#FF4060',
    image: require('../assets/Dashboard/heart.png'),
    navigateTo: 'bloodpressure',
  },
];

export const HealthContext = createContext();

export const HealthProvider = ({ children }) => {
  const [profileData, setProfileData] = useState(initialProfileData);
  const [healthStats, setHealthStats] = useState(initialHealthStats);

  return (
    <HealthContext.Provider value={{ profileData, setProfileData, healthStats, setHealthStats }}>
      {children}
    </HealthContext.Provider>
  );
};
