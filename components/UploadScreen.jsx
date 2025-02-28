import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UploadScreen = () => {
  const [uploadProgress, setUploadProgress] = useState(new Animated.Value(0));
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('health_data');
      if (storedData) {
        setHealthData(JSON.parse(storedData));
      }
    } catch (error) {
      console.log('Error loading health data:', error);
    }
  };

  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
      });

      if (result) {
        console.log('Selected File:', result);

        if (!result.uri || !result.name || !result.type) {
          console.log('Invalid file object:', result);
          Alert.alert(
            'File Selection Error',
            'Please select a valid PDF file.',
          );
          return;
        }

        setLoading(true);
        simulateUploadProgress();
        await uploadFile(result);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled file picker');
      } else {
        console.log('Error picking file:', err);
        Alert.alert(
          'File Picker Error',
          'An error occurred while selecting the file.',
        );
      }
    }
  };

  const simulateUploadProgress = () => {
    setUploadProgress(new Animated.Value(0));
    Animated.timing(uploadProgress, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  };

  const uploadFile = async file => {
    const formData = new FormData();

    formData.append('file', {
      uri: file.uri,
      type: file.type,
      name: file.name,
    });

    console.log('Uploading File:', file.name, file.type, file.uri);

    try {
      const response = await fetch(
        'http://192.168.243.154:8000/extract_health',
        {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Server Response:', data);

      if (data?.extracted_health_info) {
        setHealthData(data.extracted_health_info);
        await AsyncStorage.setItem(
          'health_data',
          JSON.stringify(data.extracted_health_info),
        );
      } else {
        console.log('Unexpected Response Structure:', data);
        Alert.alert('Upload Failed', 'Unexpected server response format.');
      }
    } catch (error) {
      console.log('Error uploading file:', error);
      Alert.alert(
        'Upload Error',
        'Failed to upload the file. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* File Upload Section */}
      <TouchableOpacity style={styles.uploadArea} onPress={handleFileUpload}>
        <Image
          source={require('../assets/Profile/upload.png')}
          style={styles.uploadIcon}
        />
        <Text style={styles.uploadText}>Tap to Upload</Text>
        <Text style={styles.uploadSubtext}>Supports PDF</Text>
      </TouchableOpacity>

      {/* Upload Progress Bar */}
      {loading && (
        <View style={styles.progressContainer}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                width: uploadProgress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>
      )}

      {/* Loading Indicator */}
      {loading && <ActivityIndicator size="large" color="#0D69D7" />}

      {/* Display Extracted Health Data */}
      {healthData && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Patient Health Report</Text>

          {/* Patient Info */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>👤 Patient Info</Text>
            <Text style={styles.text}>Name: {healthData.patient_info?.name || 'N/A'}</Text>
            <Text style={styles.text}>Age: {healthData.patient_info?.age || 'N/A'}</Text>
            <Text style={styles.text}>Gender: {healthData.patient_info?.gender || 'N/A'}</Text>
            <Text style={styles.text}>
              Report Date: {healthData.patient_info?.report_date || 'N/A'}
            </Text>
            <Text style={styles.text}>
              Patient ID: {healthData.patient_info?.patient_id || 'N/A'}
            </Text>
            <Text style={styles.text}>Doctor: {healthData.patient_info?.doctor || 'N/A'}</Text>
          </View>

          {/* Vital Signs */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>💓 Vital Signs</Text>
            <Text style={styles.text}>
              Blood Pressure: {healthData.vital_signs?.blood_pressure || 'N/A'}
            </Text>
            <Text style={styles.text}>
              Fasting Blood Sugar:{' '}
              {healthData.vital_signs?.fasting_blood_sugar || 'N/A'} mg/dL
            </Text>
            <Text style={styles.text}>
              Post-Meal Blood Sugar:{' '}
              {healthData.vital_signs?.post_meal_blood_sugar || 'N/A'} mg/dL
            </Text>
            <Text style={styles.text}>
              HbA1c Level: {healthData.vital_signs?.hba1c_level || 'N/A'}%
            </Text>
            <Text style={styles.text}>
              Cholesterol: {healthData.vital_signs?.cholesterol || 'N/A'} mg/dL
            </Text>
            <Text style={styles.text}>BMI: {healthData.vital_signs?.bmi || 'N/A'}</Text>
          </View>

          {/* Doctor's Observations */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>📋 Doctor’s Observations</Text>
            <Text style={styles.text}>{healthData.doctor_observations || 'N/A'}</Text>
          </View>

          {/* Medication Plan */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>💊 Medication Plan</Text>
            {healthData.medication_plan?.map((med, index) => (
              <Text key={index} style={styles.text}>• {med}</Text>
            ))}
          </View>

          {/* Dietary Recommendations */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>🥗 Dietary Recommendations</Text>
            {healthData.dietary_recommendations?.map((diet, index) => (
              <Text key={index} style={styles.text}>• {diet}</Text>
            ))}
          </View>

          {/* Follow-up Information */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>🩺 Follow-Up</Text>
            <Text style={styles.text}>
              Next Appointment:{' '}
              {healthData.follow_up?.next_appointment || 'N/A'}
            </Text>
            <Text style={styles.text}>
              Recommended Tests:{' '}
              {healthData.follow_up?.recommended_tests?.join(', ') || 'N/A'}
            </Text>
            <Text style={styles.text}>
              Doctor Contact: {healthData.follow_up?.doctor_contact || 'N/A'}
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F5F5F5', padding: 20},
  uploadArea: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 30,
    marginBottom: 20,
    elevation: 3,
  },
  uploadIcon: {width: 50, height: 50, marginBottom: 10},
  uploadText: {fontSize: 16, fontWeight: 'bold', color: '#0D69D7'},
  uploadSubtext: {fontSize: 14, color: '#666'},
  resultsContainer: {marginTop: 20},
  resultsTitle: {fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#333'},
  sectionContainer: {marginBottom: 15},
  sectionHeader: {fontSize: 16, fontWeight: 'bold', color: '#0D69D7', marginBottom: 10},
  text: {fontSize: 14, color: '#333', marginBottom: 5},
});

export default UploadScreen;