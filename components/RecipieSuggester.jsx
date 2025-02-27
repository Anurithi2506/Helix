import React, { useState, useCallback } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { Card, Divider } from "react-native-paper";
import LottieView from "lottie-react-native";
import { useFocusEffect } from "@react-navigation/native";

const RecipeScreen = () => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = "https://fastapi-server-render.onrender.com/recipe";

  const fetchRecipe = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_data: {
            extracted_health_info: {
              patient_info: {
                name: "John Doe",
                age: 45,
                gender: "Male",
                report_date: "27-Feb-2025",
                patient_id: "ABC12345",
                doctor: "Dr. Smith, MD (Endocrinology)",
              },
              vital_signs: {
                blood_pressure: "130/85 mmHg",
                fasting_blood_sugar: 110,
                post_meal_blood_sugar: 180,
                hba1c_level: 6.5,
                cholesterol: 200,
                bmi: 28.0,
              },
              doctor_observations:
                "The patient presents with elevated blood pressure and borderline high cholesterol, indicating early risk factors for cardiovascular disease.",
              medication_plan: ["Metformin 500mg", "Amlodipine 5mg", "Atorvastatin 10mg"],
              dietary_recommendations: [
                "Reduce processed foods and sugar intake.",
                "Increase fiber intake from vegetables and whole grains.",
                "Engage in at least 30 minutes of exercise daily.",
                "Monitor blood sugar and blood pressure regularly.",
                "Reduce stress levels and ensure adequate sleep.",
              ],
              follow_up: {
                next_appointment: "10-Mar-2025",
                recommended_tests: ["Lipid Profile", "Kidney Function Test"],
                doctor_contact: "+123 456 7890",
              },
            },
          },
        }),
      });

      const data = await response.json();
      setRecipe(data);
    } catch (error) {
      console.error("Error fetching recipe:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchRecipe();
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <View style={styles.animationContainer}>
        <LottieView
          source={require("../assets/Lottie/1.json")}
          autoPlay
          loop
          style={styles.lottie}
        />
        </View>
      ) : (
        recipe && (
          <Card style={styles.card}>
            <Card.Title title={recipe.recipe_name} titleStyle={styles.title} />
            <Card.Content>
              <Text style={styles.heading}>Ingredients:</Text>
              {recipe.ingredients.map((item, index) => (
                <Text key={index} style={styles.text}>• {item}</Text>
              ))}

              <Divider style={styles.divider} />

              <Text style={styles.heading}>Calories: {recipe.calories} kcal</Text>
              <Text style={styles.heading}>Diet Friendly: {recipe.diet_friendly}</Text>

              <Divider style={styles.divider} />

              <Text style={styles.heading}>Instructions:</Text>
              <Text style={styles.text}>{recipe.instructions}</Text>

              <Divider style={styles.divider} />

              <Text style={styles.heading}>Health Benefits:</Text>
              <Text style={styles.text}>{recipe.health_benefits}</Text>
            </Card.Content>
          </Card>
        )
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  lottie: {
    width: 200,
    height: 200,
  },
  card: {
    width: "100%",
    padding: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2b2e36",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: "#2b2e36",
  },
  text: {
    fontSize: 16,
    marginTop: 5,
    color: "#555",
  },
  divider: {
    marginVertical: 10,
  },
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#E6F3FF',
  },
});

export default RecipeScreen;
