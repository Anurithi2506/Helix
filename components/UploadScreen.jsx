import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
  FlatList,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';

const UploadScreen = () => {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(new Animated.Value(0));

  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });

      if (result) {
        const newFile = {
          name: result.name,
          uri: result.uri,
          type: result.type,
        };
        setFiles([...files, newFile]);
        simulateUploadProgress();
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled file picker');
      } else {
        console.log('Error picking file:', err);
      }
    }
  };

  const simulateUploadProgress = () => {
    setUploadProgress(new Animated.Value(0));
    Animated.timing(uploadProgress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  };

  const handleDeleteFile = index => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  return (
    <View style={styles.container}>
      {/* File Upload Section */}
      <TouchableOpacity style={styles.uploadArea} onPress={handleFileUpload}>
        <Image
          source={require('../assets/Profile/upload.png')}
          style={styles.uploadIcon}
        />
        <Text style={styles.uploadText}>Tap to Upload</Text>
        <Text style={styles.uploadSubtext}>Supports JPG, PNG, and PDF</Text>
      </TouchableOpacity>

      {/* Upload Progress Bar */}
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

      {/* Uploaded Files List */}
      <FlatList
        data={files}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <View style={styles.fileCard}>
            <Image
              source={require('../assets/Dashboard/test.png')}
              style={styles.fileIcon}
            />
            <Text style={styles.fileName} numberOfLines={1}>
              {item.name}
            </Text>
            <TouchableOpacity onPress={() => handleDeleteFile(index)}>
              <Image
                source={require('../assets/Dashboard/test.png')}
                style={styles.deleteIcon}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  uploadArea: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 30,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  uploadIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  uploadText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0D69D7',
    marginTop: 10,
  },
  uploadSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  progressContainer: {
    height: 8,
    backgroundColor: '#E6F3FF',
    borderRadius: 5,
    marginBottom: 20,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#0D69D7',
    borderRadius: 5,
  },
  fileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  fileIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  fileName: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  deleteIcon: {
    width: 24,
    height: 24,
  },
});

export default UploadScreen;
