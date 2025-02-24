import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, LayoutAnimation } from 'react-native';
import { ProgressBar } from 'react-native-paper';

const HealthProfileScreen = ({ navigation }) => {
  const [personalInfoCollapsed, setPersonalInfoCollapsed] = useState(false);
  const [medicalHistoryCollapsed, setMedicalHistoryCollapsed] = useState(false);
  const [lifestyleCollapsed, setLifestyleCollapsed] = useState(false);

  const toggleSection = (section) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    switch (section) {
      case 'personal':
        setPersonalInfoCollapsed(!personalInfoCollapsed);
        break;
      case 'medical':
        setMedicalHistoryCollapsed(!medicalHistoryCollapsed);
        break;
      case 'lifestyle':
        setLifestyleCollapsed(!lifestyleCollapsed);
        break;
      default:
        break;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image source={require('../assets/Dashboard/profile.png')} style={styles.profileImage} />
        <Text style={styles.profileName}>John Doe</Text>
        <Text style={styles.profileSubtitle}>Health Enthusiast</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>Profile Completion: 75%</Text>
        <ProgressBar progress={0.75} color="#0D69D7" style={styles.progressBar} />
      </View>

      {/* Personal Information Section */}
      <View style={styles.section}>
        <TouchableOpacity onPress={() => toggleSection('personal')} style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <Image
            source={
              personalInfoCollapsed
                ? require('../assets/Profile/down-arrow.png')
                : require('../assets/Profile/up-arrow.png')
            }
            style={styles.icon}
          />
        </TouchableOpacity>
        {!personalInfoCollapsed && (
          <View style={styles.sectionContent}>
            <Text style={styles.sectionItem}>Age: 28</Text>
            <Text style={styles.sectionItem}>Gender: Male</Text>
            <Text style={styles.sectionItem}>Height: 180 cm</Text>
            <Text style={styles.sectionItem}>Weight: 75 kg</Text>
          </View>
        )}
      </View>

      {/* Medical History Section */}
      <View style={styles.section}>
        <TouchableOpacity onPress={() => toggleSection('medical')} style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Medical History</Text>
          <Image
            source={
              medicalHistoryCollapsed
                ? require('../assets/Profile/down-arrow.png')
                : require('../assets/Profile/up-arrow.png')
            }
            style={styles.icon}
          />
        </TouchableOpacity>
        {!medicalHistoryCollapsed && (
          <View style={styles.sectionContent}>
            <Text style={styles.sectionItem}>Allergies: None</Text>
            <Text style={styles.sectionItem}>Chronic Conditions: None</Text>
            <Text style={styles.sectionItem}>Medications: None</Text>
          </View>
        )}
      </View>

      {/* Lifestyle Section */}
      <View style={styles.section}>
        <TouchableOpacity onPress={() => toggleSection('lifestyle')} style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Lifestyle</Text>
          <Image
            source={
              lifestyleCollapsed
                ? require('../assets/Profile/down-arrow.png')
                : require('../assets/Profile/up-arrow.png')
            }
            style={styles.icon}
          />
        </TouchableOpacity>
        {!lifestyleCollapsed && (
          <View style={styles.sectionContent}>
            <Text style={styles.sectionItem}>Activity Level: Moderate</Text>
            <Text style={styles.sectionItem}>Diet: Vegetarian</Text>
            <Text style={styles.sectionItem}>Sleep: 7-8 hours/day</Text>
          </View>
        )}
      </View>

      {/* Upload Button */}
      <TouchableOpacity style={styles.uploadButton} onPress={() => navigation.navigate('UploadScreen')}>
        <Text style={styles.uploadButtonText}>Upload Health Reports</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0D69D7',
  },
  profileSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  progressBar: {
    height: 8,
    borderRadius: 5,
    backgroundColor: '#E6F3FF',
  },
  section: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0D69D7',
  },
  sectionContent: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#E6F3FF',
  },
  sectionItem: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  uploadButton: {
    backgroundColor: '#0D69D7',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default HealthProfileScreen;