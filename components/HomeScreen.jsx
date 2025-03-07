import React, { useContext, useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ProgressBar } from 'react-native-paper';
import Lottie from 'lottie-react-native';
import { HealthContext } from './HealthContext';
import { useFocusEffect } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DashboardScreen = ({ navigation }) => {
  const { profileData, healthStats } = useContext(HealthContext);

  // State for loading and showing content
  const [isLoading, setIsLoading] = useState(true);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [sugarLevel, setSugarLevel] = useState('');
  const [dietaryPlan, setDietaryPlan] = useState('');
  const [recipe, setRecipe] = useState(null);

  const navigationFunction = (navigateTo) => {
    if (navigateTo !== 'bloodpressure' && navigateTo !== 'steps') {
      navigation.navigate(navigateTo);
    }
  };

  // Randomly choose between two profile images
  const profileImages = [
    require('../assets/Dashboard/profile.png'),
    require('../assets/Dashboard/heart.png'),
  ];
  const randomProfileImage = profileImages[Math.floor(Math.random() * profileImages.length)];

  // State for user-created tasks (appointments)
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskTime, setNewTaskTime] = useState(''); // Format: "HH:MM AM/PM"

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
    }, [])
  );

  const onTimeChange = (event, selected) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selected) {
      setSelectedTime(selected);
    }
  };

  // Add a new task
  const addTask = () => {
    if (!newTaskTitle || !selectedTime) {
      Alert.alert('Error', 'Please enter both a title and time.');
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: newTaskTitle,
      time: selectedTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
      icon: require('../assets/Dashboard/doctor.png'),
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle('');

    // Schedule notification
    const now = new Date();
    const taskTime = new Date(selectedTime);
    const timeDiff = taskTime.getTime() - now.getTime();

    if (timeDiff > 0) {
      setTimeout(() => {
        Alert.alert('Task Reminder', `It's time for: ${newTask.title}`);
      }, timeDiff);
    }
  };

  // Handle sugar level input and generate dietary plan
  const handleSugarLevelInput = () => {
    const level = parseFloat(sugarLevel);

    if (isNaN(level)) {
      Alert.alert('Invalid Input', 'Please enter a valid number for sugar level.');
      return;
    }

    let plan = '';
    let recipe = null;

    if (level < 70) {
      plan = 'Your sugar level is low. Consider having a snack with carbohydrates like a banana or a granola bar.';
      recipe = {
        title: 'Banana Smoothie',
        description: 'A quick and energizing smoothie to boost your sugar levels.',
        ingredients: ['1 Banana', '1 Cup Milk', '1 Tbsp Honey', '1/2 Cup Yogurt'],
        steps: ['Blend all ingredients until smooth.', 'Serve immediately.'],
      };
    } else if (level >= 70 && level <= 130) {
      plan = 'Your sugar level is normal. Maintain a balanced diet with fruits, vegetables, and whole grains.';
      recipe = {
        title: 'Veggie Stir-Fry',
        description: 'A nutritious stir-fry with fresh vegetables.',
        ingredients: ['Broccoli', 'Bell Peppers', 'Carrots', 'Soy Sauce', 'Olive Oil'],
        steps: ['Heat oil in a pan.', 'Add veggies and stir-fry for 5-7 minutes.', 'Add soy sauce and serve.'],
      };
    } else if (level > 130 && level <= 180) {
      plan = 'Your sugar level is slightly high. Opt for a low-carb meal with lean protein and vegetables.';
      recipe = {
        title: 'Grilled Chicken Salad',
        description: 'A light and healthy salad with grilled chicken.',
        ingredients: ['Chicken Breast', 'Lettuce', 'Tomatoes', 'Cucumbers', 'Olive Oil', 'Lemon Juice'],
        steps: ['Grill the chicken breast.', 'Chop vegetables and mix with chicken.', 'Drizzle with olive oil and lemon juice.'],
      };
    } else {
      plan = 'Your sugar level is high. Avoid sugary foods and consult your doctor for further advice.';
      recipe = {
        title: 'Steamed Vegetables',
        description: 'A simple and healthy dish to manage sugar levels.',
        ingredients: ['Broccoli', 'Carrots', 'Cauliflower', 'Olive Oil', 'Salt'],
        steps: ['Steam vegetables for 5-7 minutes.', 'Drizzle with olive oil and sprinkle salt.'],
      };
    }

    setDietaryPlan(plan);
    setRecipe(recipe);
  };

  if (isLoading) {
    return (
      <View style={styles.animationContainer}>
        <Lottie
          source={require('../assets/Lottie/1.json')} // Replace with your Lottie file
          autoPlay
          loop={true}
          style={styles.animation}
        />
      </View>
    );
  }

  // Main content after loading
  return (
    <LinearGradient colors={['#E6F3FF', '#FFFFFF']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Section */}
        <LinearGradient
          colors={['#0D69D7', '#1C8EF9']}
          style={styles.profileCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}>
          <Image source={profileData.profilePhoto} style={styles.profileImage} />
          <View>
            <Text style={styles.profileName}>Hello, {profileData.name}</Text>
            <Text style={styles.profileSubtitle}>{profileData.subtitle}</Text>
          </View>
        </LinearGradient>

        {/* Health Stats Grid */}
        <View style={styles.gridContainer}>
          {healthStats.map((stat) => (
            <TouchableOpacity
              key={stat.id}
              style={styles.gridCard}
              onPress={() => navigationFunction(stat.navigateTo)}>
              <LinearGradient colors={['#FFFFFF', '#F8FAFF']} style={styles.cardGradient}>
                <View style={styles.cardHeader}>
                  <Image source={stat.image} style={styles.gridIcon} />
                  <Text style={[styles.statTitle, { color: stat.color }]}>{stat.title}</Text>
                </View>
                <Text style={styles.gridValue}>{stat.value}</Text>
                <ProgressBar progress={stat.progress} color={stat.color} style={styles.progressBar} />
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {/* Sugar Level Input */}
        {/* <Text style={styles.sectionTitle}>Daily Sugar Level</Text>
        <View style={styles.taskInputContainer}>
          <TextInput
            style={styles.taskInput}
            placeholder="Enter Sugar Level (mg/dL)"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={sugarLevel}
            onChangeText={setSugarLevel}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleSugarLevelInput}>
            <Text style={styles.addButtonText}>Check Plan</Text>
          </TouchableOpacity>
        </View> */}

        {/* Dietary Plan */}
        {dietaryPlan && (
          <View style={styles.dietaryPlanContainer}>
            <Text style={styles.sectionTitle}>Dietary Plan</Text>
            <Text style={styles.dietaryPlanText}>{dietaryPlan}</Text>
          </View>
        )}

        {/* Recipe Card */}
        {recipe && (
          <View style={styles.recipeCard}>
            <Text style={styles.sectionTitle}>Recommended Recipe</Text>
            <Text style={styles.recipeTitle}>{recipe.title}</Text>
            <Text style={styles.recipeText}>{recipe.description}</Text>
            <Text style={styles.recipeSubTitle}>Ingredients:</Text>
            {recipe.ingredients.map((ingredient, index) => (
              <Text key={index} style={styles.recipeText}>- {ingredient}</Text>
            ))}
            <Text style={styles.recipeSubTitle}>Steps:</Text>
            {recipe.steps.map((step, index) => (
              <Text key={index} style={styles.recipeText}>{index + 1}. {step}</Text>
            ))}
          </View>
        )}

        {/* Upcoming Tasks (To-Do) */}
        <Text style={styles.sectionTitle}>Your Tasks</Text>
        <View style={styles.taskInputContainer}>
          <TextInput
            style={styles.taskInput}
            placeholder="Task Title"
            value={newTaskTitle}
            onChangeText={setNewTaskTitle}
          />
          <TouchableOpacity
            style={styles.timePicker}
            onPress={() => setShowTimePicker(true)}>
            <Text style={styles.timeText}>
              {selectedTime.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })}
            </Text>
            <Image
              source={require('../assets/clock.png')}
              style={styles.clockIcon}
            />
          </TouchableOpacity>
          
          {showTimePicker && (
            <DateTimePicker
              value={selectedTime}
              mode="time"
              is24Hour={false}
              display="default"
              onChange={onTimeChange}
            />
          )}
          <TouchableOpacity style={styles.addButton} onPress={addTask}>
            <Text style={styles.addButtonText}>Add Task</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={tasks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.appointmentSection}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.appointmentCard}>
              <LinearGradient colors={['#FFFFFF', '#F8FAFF']} style={styles.cardGradient}>
                <Image source={item.icon} style={styles.appointmentIcon} />
                <Text style={styles.appointmentTitle}>{item.title}</Text>
                <Text style={styles.appointmentTime}>{item.time}</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>No tasks yet. Add one above!</Text>}
        />

        {/* Recipe Suggester Card */}
        <TouchableOpacity
          style={styles.recipeSuggesterCard}
          onPress={() => navigation.navigate('recipe')}>
          <LinearGradient colors={['#0D69D7', '#1C8EF9']} style={styles.recipeSuggesterGradient}>
            <Text style={styles.recipeSuggesterText}>Get Personalized Diet Charts</Text>
            <Image
              source={require('../assets/nutrition.png')} // Replace with your icon
              style={styles.recipeSuggesterIcon}
            />
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#0D69D7',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  timeText: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  clockIcon: {
    width: 20,
    height: 20,
    // tintColor: '#0D69D7',
  },
  scrollContainer: {
    padding: 16,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    elevation: 3,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  profileSubtitle: {
    fontSize: 14,
    color: '#E6F3FF',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  gridCard: {
    width: '48%',
    height: 180,
    marginBottom: 16,
    borderRadius: 16,
    elevation: 3,
  },
  cardGradient: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  gridIcon: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  statTitle: {
    fontSize: 14,
    fontWeight: '600',
    flexShrink: 1,
  },
  gridValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F0F0F0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  taskInputContainer: {
    marginBottom: 12,
  },
  taskInput: {
    borderWidth: 1,
    borderColor: '#0D69D7',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    color: '#000',
  },
  addButton: {
    backgroundColor: '#0D69D7',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  appointmentSection: {
    paddingVertical: 10,
  },
  appointmentCard: {
    width: 160,
    height: 140,
    marginRight: 12,
    borderRadius: 16,
    elevation: 3,
  },
  appointmentIcon: {
    width: 32,
    height: 32,
    alignSelf: 'center',
    marginBottom: 8,
  },
  appointmentTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2C3E50',
  },
  appointmentTime: {
    fontSize: 12,
    textAlign: 'center',
    color: '#666',
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  recipeCard: {
    width: '100%',
    minHeight: 100, // Expands based on content when recipe is shown
    borderRadius: 16,
    elevation: 3,
    marginTop: 12,
  },
  recipePrompt: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0D69D7',
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  recipeSubTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0D69D7',
    marginTop: 8,
    marginBottom: 4,
  },
  recipeText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
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
  
  recipeSuggesterCard: {
    width: '100%',
    height: 120,
    borderRadius: 16,
    elevation: 3,
    marginTop: 20,
  },
  recipeSuggesterGradient: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recipeSuggesterText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  recipeSuggesterIcon: {
    width: 40,
    height: 40,
    tintColor: '#FFF',
  },
});

export default DashboardScreen;