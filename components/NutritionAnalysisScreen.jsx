import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';

const NutritionAnalysisScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [nutritionData, setNutritionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = async image => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', {
      uri: image.uri,
      type: image.type || 'image/jpeg',
      name: image.fileName || 'upload.jpg',
    });

    try {
      const response = await fetch(
        'https://fastapi-server-render.onrender.com/nutrition',
        {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (!response.ok) throw new Error('Server response not OK');

      const data = await response.json();
      setNutritionData(data);
      console.log(data);
    } catch (err) {
      setError('Failed to analyze image. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const takePhoto = async () => {
    try {
      const hasPermission = await requestCameraPermission();
      if (!hasPermission) {
        Alert.alert('Permission required', 'Camera permission was denied');
        return;
      }

      launchCamera(
        {
          mediaType: 'photo',
          quality: 0.8,
          saveToPhotos: true,
          cameraType: 'back',
        },
        response => {
          if (response.errorCode) {
            Alert.alert('Camera Error', response.errorMessage);
          } else if (!response.didCancel) {
            setSelectedImage(response.assets[0]);
            handleImageUpload(response.assets[0]);
          }
        },
      );
    } catch (err) {
      Alert.alert('Camera Error', err.message);
      console.error(err);
    }
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs access to your camera',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };


  const selectPhoto = () => {
    launchImageLibrary({mediaType: 'photo', quality: 0.8}, response => {
      if (!response.didCancel && !response.errorCode) {
        setSelectedImage(response.assets[0]);
        handleImageUpload(response.assets[0]);
      }
    });
  };

  return (
    <LinearGradient colors={['#E6F3FF', '#FFFFFF']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Doctor Image Section */}
        <View style={styles.doctorContainer}>
          <Image
            source={require('../assets/Dashboard/doctor.png')}
            style={styles.doctorImage}
            resizeMode="contain"
          />
        </View>

        {/* Upload Section */}
        <View style={styles.uploadContainer}>
          <Text style={styles.title}>Analyze Your Food</Text>
          <Text style={styles.subtitle}>
            Take or select a photo of your meal for nutritional analysis
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={takePhoto}>
              <Text style={styles.buttonText}>📸 Take Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={selectPhoto}>
              <Text style={styles.buttonText}>🖼️ Select Photo</Text>
            </TouchableOpacity>
          </View>

          {selectedImage && (
            <Image
              source={{uri: selectedImage.uri}}
              style={styles.previewImage}
              resizeMode="contain"
            />
          )}

          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0D69D7" />
              <Text style={styles.loadingText}>Analyzing your meal...</Text>
            </View>
          )}

          {error && <Text style={styles.errorText}>{error}</Text>}

          {nutritionData && (
            <View style={styles.resultsContainer}>
              <Text style={styles.resultsTitle}>Nutrition Analysis Result</Text>

              <View style={styles.contentContainer}>
                {nutritionData.content && (
                  <View style={styles.jsonContainer}>
                    {(() => {
                      try {
                        // Extract and parse JSON from content
                        const jsonStart = nutritionData.content.indexOf('{');
                        const jsonEnd =
                          nutritionData.content.lastIndexOf('}') + 1;
                        const jsonString = nutritionData.content.slice(
                          jsonStart,
                          jsonEnd,
                        );
                        const parsedData = JSON.parse(jsonString);

                        return (
                          <>
                            {/* Detected Foods */}
                            {parsedData.food_detected?.length > 0 && (
                              <View style={styles.sectionContainer}>
                                <Text style={styles.sectionHeader}>
                                  🍎 Detected Foods
                                </Text>
                                <View style={styles.foodList}>
                                  {parsedData.food_detected.map(
                                    (food, index) => (
                                      <Text key={index} style={styles.foodItem}>
                                        • {food}
                                      </Text>
                                    ),
                                  )}
                                </View>
                              </View>
                            )}

                            {/* Nutritional Summary */}
                            <View style={styles.sectionContainer}>
                              <Text style={styles.sectionHeader}>
                                📊 Nutritional Summary
                              </Text>
                              <View style={styles.summaryGrid}>
                                <View style={styles.summaryCard}>
                                  <Text style={styles.summaryValue}>
                                    {parsedData.calories || 'N/A'}
                                  </Text>
                                  <Text style={styles.summaryLabel}>
                                    Calories
                                  </Text>
                                </View>
                                <View style={styles.summaryCard}>
                                  <Text style={styles.summaryValue}>
                                    {parsedData.nutritional_info
                                      ?.carbohydrates || 'N/A'}
                                  </Text>
                                  <Text style={styles.summaryLabel}>Carbs</Text>
                                </View>
                                <View style={styles.summaryCard}>
                                  <Text style={styles.summaryValue}>
                                    {parsedData.nutritional_info?.protein ||
                                      'N/A'}
                                  </Text>
                                  <Text style={styles.summaryLabel}>
                                    Protein
                                  </Text>
                                </View>
                                <View style={styles.summaryCard}>
                                  <Text style={styles.summaryValue}>
                                    {parsedData.nutritional_info?.fat || 'N/A'}
                                  </Text>
                                  <Text style={styles.summaryLabel}>Fat</Text>
                                </View>
                              </View>
                            </View>

                            {/* Health Warnings */}
                            {parsedData.health_warnings?.length > 0 && (
                              <View style={styles.sectionContainer}>
                                <Text
                                  style={[
                                    styles.sectionHeader,
                                    styles.warningHeader,
                                  ]}>
                                  ⚠️ Health Warnings
                                </Text>
                                <View style={styles.warningList}>
                                  {parsedData.health_warnings.map(
                                    (warning, index) => (
                                      <Text
                                        key={index}
                                        style={styles.warningText}>
                                        • {warning}
                                      </Text>
                                    ),
                                  )}
                                </View>
                              </View>
                            )}

                            {/* Healthier Alternatives */}
                            {parsedData.alternatives && (
                              <View style={styles.sectionContainer}>
                                <Text
                                  style={[
                                    styles.sectionHeader,
                                    styles.alternativeHeader,
                                  ]}>
                                  💡 Healthier Alternatives
                                </Text>
                                <View style={styles.alternativeList}>
                                  {Object.entries(parsedData.alternatives).map(
                                    ([original, alternative], index) => (
                                      <Text
                                        key={index}
                                        style={styles.alternativeItem}>
                                        • {original}: {alternative}
                                      </Text>
                                    ),
                                  )}
                                </View>
                              </View>
                            )}
                          </>
                        );
                      } catch (error) {
                        console.error('Error parsing JSON:', error);
                        return (
                          <Text style={styles.errorText}>
                            Could not parse structured data
                          </Text>
                        );
                      }
                    })()}
                  </View>
                )}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  doctorContainer: {
    height: 250,
    backgroundColor: '#0D69D7',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  contentContainer: {
    backgroundColor: '#F8FAFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
  },
  contentText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 15,
  },
  jsonContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
  },
  jsonText: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#2C3E50',
  },
  doctorImage: {
    width: '80%',
    height: '80%',
  },
  uploadContainer: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#0D69D7',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  previewImage: {
    width: '100%',
    height: 250,
    borderRadius: 20,
    marginBottom: 20,
    backgroundColor: '#F0F0F0',
  },
  loadingContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 20,
  },
  resultsContainer: {
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    elevation: 2,
  },
  resultsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 20,
    textAlign: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  nutrientCard: {
    width: '48%',
    backgroundColor: '#F8FAFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  nutrientValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0D69D7',
    marginBottom: 5,
  },
  nutrientLabel: {
    fontSize: 14,
    color: '#666',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  sectionContainer: {
    marginBottom: 25,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 12,
  },
  warningHeader: {
    color: '#FF4060',
  },
  alternativeHeader: {
    color: '#00C853',
  },
  foodList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  foodItem: {
    fontSize: 14,
    color: '#666',
    marginRight: 15,
    marginBottom: 8,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  summaryCard: {
    width: '48%',
    backgroundColor: '#F8FAFF',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0D69D7',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  warningList: {
    backgroundColor: '#FFF5F5',
    borderRadius: 8,
    padding: 12,
  },
  warningItem: {
    color: '#FF4060',
    fontSize: 14,
    marginBottom: 6,
  },
  alternativeList: {
    backgroundColor: '#F5FFFA',
    borderRadius: 8,
    padding: 12,
  },
  alternativeItem: {
    color: '#00C853',
    fontSize: 14,
    marginBottom: 6,
  },
  warningText:{
    color:'#FF4060'
  }
});

export default NutritionAnalysisScreen;
