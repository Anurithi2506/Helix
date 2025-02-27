import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { CircularProgress } from 'react-native-circular-progress';
import LinearGradient from 'react-native-linear-gradient';

const HealthDetailsScreen = () => {
  const [metrics] = useState({
    heartRate: 72,
    bloodPressure: '120/80',
    oxygen: 98,
    stress: 35
  });

  return (
    <LinearGradient colors={['#0a0a0a', '#1a1a1a']} style={styles.container}>
      <View style={styles.metricsGrid}>
        {/* Heart Rate */}
        <View style={styles.metricCard}>
          <CircularProgress
            size={120}
            width={10}
            fill={metrics.heartRate}
            tintColor="#ff4040"
            backgroundColor="#3d5875">
            {() => (
              <Text style={styles.metricValue}>
                {metrics.heartRate}
                <Text style={styles.metricLabel}>BPM</Text>
              </Text>
            )}
          </CircularProgress>
          <Text style={styles.metricTitle}>HEART RATE</Text>
        </View>

        {/* Blood Pressure */}
        {/* <View style={styles.metricCard}>
          <CircularProgress
            size={120}
            width={10}
            fill={120}
            tintColor="#00b4d8"
            backgroundColor="#3d5875">
            {() => (
              <Text style={styles.metricValue}>
                {metrics.bloodPressure}
                <Text style={styles.metricLabel}>mmHg</Text>
              </Text>
            )}
          </CircularProgress>
          <Text style={styles.metricTitle}>BLOOD PRESSURE</Text>
        </View> */}

        {/* Oxygen Level */}
        <View style={styles.metricCard}>
          <CircularProgress
            size={120}
            width={10}
            fill={metrics.oxygen}
            tintColor="#00ff88"
            backgroundColor="#3d5875">
            {() => (
              <Text style={styles.metricValue}>
                {metrics.oxygen}%
                <Text style={styles.metricLabel}>SPO2</Text>
              </Text>
            )}
          </CircularProgress>
          <Text style={styles.metricTitle}>OXYGEN</Text>
        </View>

        {/* Stress Level */}
        <View style={styles.metricCard}>
          <CircularProgress
            size={120}
            width={10}
            fill={metrics.stress}
            tintColor="#ff9f40"
            backgroundColor="#3d5875">
            {() => (
              <Text style={styles.metricValue}>
                {metrics.stress}%
                <Text style={styles.metricLabel}>STRESS</Text>
              </Text>
            )}
          </CircularProgress>
          <Text style={styles.metricTitle}>STRESS LEVEL</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricCard: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 20,
  },
  metricValue: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  metricLabel: {
    fontSize: 12,
    color: '#888',
    display: 'block',
  },
  metricTitle: {
    color: '#888',
    fontSize: 12,
    marginTop: 10,
    fontWeight: '500',
  },
});

export default HealthDetailsScreen;