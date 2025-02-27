import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
  TextInput,
  Alert,
} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import { HealthContext } from './HealthContext';
import LottieView from 'lottie-react-native';
import { useFocusEffect } from '@react-navigation/native';

const HealthProfileScreen = ({ navigation }) => {
  const { profileData, setProfileData } = useContext(HealthContext);
  const[loading,setLoading] = useState(true)
  const [personalInfoCollapsed, setPersonalInfoCollapsed] = useState(false);
  const [medicalHistoryCollapsed, setMedicalHistoryCollapsed] = useState(false);
  const [lifestyleCollapsed, setLifestyleCollapsed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setLoading(true)
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
  
      return () => clearTimeout(timer);
    }, [])
  );
  

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

  // Handle edit/save profile
  const handleEditProfile = () => {
    if (isEditing) {
      Alert.alert('Success', 'Profile updated successfully!');
    }
    setIsEditing(!isEditing);
  };

  // Update profile data using context
  const handleUpdateProfile = (field, value) => {
    setProfileData((prevData) => ({ ...prevData, [field]: value }));
  };

  // Handle image picker
  const handleImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 500,
      maxWidth: 500,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        Alert.alert('Cancelled', 'You did not select any image.');
      } else if (response.errorMessage) {
        Alert.alert('Error', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const source = { uri: response.assets[0].uri };
        handleUpdateProfile('profilePhoto', source);
      }
    });
  };

    if (loading) {
      return (
        <View style={styles.animationContainer}>
          <LottieView
            source={require('../assets/Lottie/4.json')} // Replace with your Lottie file
            autoPlay
            loop={true}
            style={styles.animation}
          />
        </View>
      );
    }
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={handleImagePicker}>
          <Image source={profileData.profilePhoto} style={styles.profileImage} />
        </TouchableOpacity>
        {isEditing ? (
          <TextInput
            style={styles.editInput}
            value={profileData.name}
            onChangeText={(text) => handleUpdateProfile('name', text)}
          />
        ) : (
          <Text style={styles.profileName}>{profileData.name}</Text>
        )}
        <Text style={styles.profileSubtitle}>{profileData.subtitle}</Text>
        <TouchableOpacity onPress={handleEditProfile} style={styles.editButton}>
          <Text style={styles.editButtonText}>{isEditing ? 'Save' : 'Edit Profile'}</Text>
        </TouchableOpacity>
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
            {isEditing ? (
              <>
                <TextInput
                  style={styles.editInput}
                  value={profileData.age}
                  onChangeText={(text) => handleUpdateProfile('age', text.replace(/[^0-9]/g, ''))} // Allow only numbers
                  keyboardType="numeric"
                />
                <TextInput
                  style={styles.editInput}
                  value={profileData.gender}
                  onChangeText={(text) => handleUpdateProfile('gender', text)}
                />
                <TextInput
                  style={styles.editInput}
                  value={profileData.height.replace(' cm', '')} // Remove unit for editing
                  onChangeText={(text) => handleUpdateProfile('height', `${text.replace(/[^0-9]/g, '')} cm`)} // Add unit back
                  keyboardType="numeric"
                />
                <TextInput
                  style={styles.editInput}
                  value={profileData.weight.replace(' kg', '')} // Remove unit for editing
                  onChangeText={(text) => handleUpdateProfile('weight', `${text.replace(/[^0-9]/g, '')} kg`)} // Add unit back
                  keyboardType="numeric"
                />
              </>
            ) : (
              <>
                <Text style={styles.sectionItem}>Age: {profileData.age}</Text>
                <Text style={styles.sectionItem}>Gender: {profileData.gender}</Text>
                <Text style={styles.sectionItem}>Height: {profileData.height}</Text>
                <Text style={styles.sectionItem}>Weight: {profileData.weight}</Text>
              </>
            )}
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
            {isEditing ? (
              <>
                <TextInput
                  style={styles.editInput}
                  value={profileData.allergies}
                  onChangeText={(text) => handleUpdateProfile('allergies', text)}
                />
                <TextInput
                  style={styles.editInput}
                  value={profileData.chronicConditions}
                  onChangeText={(text) => handleUpdateProfile('chronicConditions', text)}
                />
                <TextInput
                  style={styles.editInput}
                  value={profileData.medications}
                  onChangeText={(text) => handleUpdateProfile('medications', text)}
                />
              </>
            ) : (
              <>
                <Text style={styles.sectionItem}>Allergies: {profileData.allergies}</Text>
                <Text style={styles.sectionItem}>Chronic Conditions: {profileData.chronicConditions}</Text>
                <Text style={styles.sectionItem}>Medications: {profileData.medications}</Text>
              </>
            )}
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
            {isEditing ? (
              <>
                <TextInput
                  style={styles.editInput}
                  value={profileData.activityLevel}
                  onChangeText={(text) => handleUpdateProfile('activityLevel', text)}
                />
                <TextInput
                  style={styles.editInput}
                  value={profileData.diet}
                  onChangeText={(text) => handleUpdateProfile('diet', text)}
                />
                <TextInput
                  style={styles.editInput}
                  value={profileData.sleep}
                  onChangeText={(text) => handleUpdateProfile('sleep', text)}
                />
              </>
            ) : (
              <>
                <Text style={styles.sectionItem}>Activity Level: {profileData.activityLevel}</Text>
                <Text style={styles.sectionItem}>Diet: {profileData.diet}</Text>
                <Text style={styles.sectionItem}>Sleep: {profileData.sleep}</Text>
              </>
            )}
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

// Styles remain the same
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
  editButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#0D69D7',
    borderRadius: 5,
  },
  editButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#0D69D7',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
    color: '#000',
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
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6F3FF',
  },
  animation: {
    width: 200,
    height: 200,
  },
});

export default HealthProfileScreen;