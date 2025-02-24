import React, { useState, useEffect } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { CircularProgress } from 'react-native-circular-progress';

const SmartwatchHealthScreen = () => {
  const [heartRate, setHeartRate] = useState(72);
  const [bloodPressure, setBloodPressure] = useState(120);
  const pulseAnim = new Animated.Value(1);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setHeartRate(Math.floor(Math.random() * (180 - 60 + 1)) + 60);
      setBloodPressure(Math.floor(Math.random() * (180 - 90 + 1)) + 90);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Pulse animation for alerts
  useEffect(() => {
    if (heartRate > 100 || bloodPressure > 140) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.3,
            duration: 500,
            useNativeDriver: true
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
          })
        ])
      ).start();
    }
  }, [heartRate, bloodPressure]);

  return (
    <View style={styles.container}>
      {/* Pulse effect overlay */}
      {(heartRate > 100 || bloodPressure > 140) && (
        <Animated.View style={[
          styles.pulseEffect,
          { transform: [{ scale: pulseAnim }] }
        ]} />
      )}

      {/* Heart Rate Circle */}
      <View style={styles.metricContainer}>
        <CircularProgress
          size={120}
          width={10}
          fill={heartRate}
          tintColor={heartRate > 100 ? '#ff4040' : '#00ff88'}
          backgroundColor="#3d5875">
          {() => (
            <Text style={styles.valueText}>
              {heartRate}
              <Text style={styles.labelText}>BPM</Text>
            </Text>
          )}
        </CircularProgress>
      </View>

      {/* Blood Pressure Circle */}
      <View style={styles.metricContainer}>
        <CircularProgress
          size={120}
          width={10}
          fill={bloodPressure}
          tintColor={bloodPressure > 140 ? '#ff4040' : '#00b4d8'}
          backgroundColor="#3d5875">
          {() => (
            <Text style={styles.valueText}>
              {bloodPressure}
              <Text style={styles.labelText}>mmHg</Text>
            </Text>
          )}
        </CircularProgress>
      </View>

      {/* Status Text */}
      <Text style={styles.statusText}>
        {heartRate > 100 || bloodPressure > 140 
          ? "High Risk Detected!"
          : "Vitals Normal"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  metricContainer: {
    margin: 15
  },
  valueText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  labelText: {
    fontSize: 14,
    color: '#888'
  },
  statusText: {
    color: '#00ff88',
    fontSize: 18,
    marginTop: 20,
    fontWeight: '500'
  },
  pulseEffect: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 64, 64, 0.2)',
    zIndex: -1
  }
});

export default SmartwatchHealthScreen;