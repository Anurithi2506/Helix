import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';

const RecipeSuggestionScreen = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDiet, setSelectedDiet] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const dietaryRestrictions = ['All', 'Vegetarian', 'Vegan', 'Gluten-Free', 'Keto'];

  // Simulate fetching recipes from an AI-driven API
  useEffect(() => {
    setTimeout(() => {
      const sampleRecipes = [
        {
          id: '1',
          name: 'Quinoa Salad',
          image: 'https://i.imgur.com/5ZQ9Z1A.jpg',
          healthRating: 4.5,
          diet: 'Vegetarian',
        },
        {
          id: '2',
          name: 'Avocado Toast',
          image: 'https://i.imgur.com/7QZ9Z1A.jpg',
          healthRating: 4.0,
          diet: 'Vegan',
        },
        {
          id: '3',
          name: 'Grilled Salmon',
          image: 'https://i.imgur.com/8ZQ9Z1A.jpg',
          healthRating: 4.7,
          diet: 'Keto',
        },
        {
          id: '4',
          name: 'Chicken Stir-Fry',
          image: 'https://i.imgur.com/9ZQ9Z1A.jpg',
          healthRating: 4.2,
          diet: 'Gluten-Free',
        },
      ];
      setRecipes(sampleRecipes);
      setIsLoading(false);
    }, 2000); // Simulate a 2-second loading delay
  }, []);

  const filteredRecipes =
    selectedDiet === 'All'
      ? recipes
      : recipes.filter((recipe) => recipe.diet === selectedDiet);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recipe Suggestions</Text>
        <TouchableOpacity style={styles.filterButton} onPress={() => setShowFilters(true)}>
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Recipe List */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0D69D7" />
          <Text style={styles.loadingText}>Loading recipes...</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.recipeList}>
          {filteredRecipes.map((recipe) => (
            <View key={recipe.id} style={styles.recipeCard}>
              <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
              <View style={styles.recipeDetails}>
                <Text style={styles.recipeName}>{recipe.name}</Text>
                <Text style={styles.recipeHealthRating}>
                  Health Rating: {recipe.healthRating} ⭐
                </Text>
                <TouchableOpacity style={styles.seeRecipeButton}>
                  <Text style={styles.seeRecipeButtonText}>See Recipe</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}

      {/* Filter Modal */}
      <Modal visible={showFilters} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Dietary Restriction</Text>
            {dietaryRestrictions.map((diet) => (
              <TouchableOpacity
                key={diet}
                style={styles.filterItem}
                onPress={() => {
                  setSelectedDiet(diet);
                  setShowFilters(false);
                }}
              >
                <Text style={styles.filterItemText}>{diet}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowFilters(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0D69D7',
    paddingVertical: 15,
    paddingHorizontal: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  filterButton: {
    backgroundColor: '#FFF',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  filterButtonText: {
    color: '#0D69D7',
    fontSize: 14,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  recipeList: {
    padding: 20,
  },
  recipeCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  recipeImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  recipeDetails: {
    padding: 15,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  recipeHealthRating: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  seeRecipeButton: {
    backgroundColor: '#0D69D7',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  seeRecipeButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0D69D7',
    marginBottom: 10,
  },
  filterItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E6F3FF',
  },
  filterItemText: {
    fontSize: 16,
    color: '#333',
  },
  closeButton: {
    backgroundColor: '#0D69D7',
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RecipeSuggestionScreen;