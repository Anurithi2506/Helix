import React, { useState, useCallback } from "react";
import { View, ScrollView, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { Card, Divider } from "react-native-paper";
import LottieView from "lottie-react-native";
import { useFocusEffect } from "@react-navigation/native";

const DietChartScreen = () => {
  const [dietChart, setDietChart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sugarLevel, setSugarLevel] = useState("");
  const API_URL = "http://192.168.243.154:8000/diet_chart";

  const fetchDietChart = async () => {
    if (!sugarLevel || isNaN(sugarLevel)) {
      Alert.alert("Invalid Input", "Please enter a valid numeric sugar level");
      return;
    }
  
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sugar_level: parseFloat(sugarLevel) }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      
      // Validate response structure
      if (!data.meals || !data.allowed_foods) {
        throw new Error("Invalid diet chart format received");
      }
      
      setDietChart(data);
    } catch (error) {
      console.error("Fetch error:", error);
      Alert.alert("Error", `Failed to load diet chart: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Sugar Level (mg/dL)"
          keyboardType="numeric"
          value={sugarLevel}
          onChangeText={setSugarLevel}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={fetchDietChart}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Generating..." : "Get Diet Chart"}
          </Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.animationContainer}>
          <LottieView
            source={require("../assets/Lottie/1.json")}
            autoPlay
            loop
            style={styles.lottie}
          />
        </View>
      )}

      {dietChart && (
        <Card style={styles.card}>
          <Card.Title 
            title={`${dietChart.diet_type} Diet Chart`}
            subtitle={`For Sugar Level: ${sugarLevel} mg/dL`}
            titleStyle={styles.title}
            subtitleStyle={styles.subtitle}
          />
          
          <Card.Content>
            {/* Meals */}
            <Text style={styles.sectionHeader}>🌅 Breakfast</Text>
            <Text style={styles.text}>{dietChart.meals.breakfast}</Text>

            <Text style={styles.sectionHeader}>☕ Mid-Morning Snack</Text>
            <Text style={styles.text}>{dietChart.meals.mid_morning_snack}</Text>

            <Text style={styles.sectionHeader}>🌞 Lunch</Text>
            <Text style={styles.text}>{dietChart.meals.lunch}</Text>

            <Text style={styles.sectionHeader}>🍵 Evening Snack</Text>
            <Text style={styles.text}>{dietChart.meals.evening_snack}</Text>

            <Text style={styles.sectionHeader}>🌙 Dinner</Text>
            <Text style={styles.text}>{dietChart.meals.dinner}</Text>

            <Divider style={styles.divider} />

            {/* Nutrients */}
            <Text style={styles.sectionHeader}>📊 Key Nutrients</Text>
            {dietChart.key_nutrients.map((nutrient, index) => (
              <Text key={index} style={styles.bulletText}>• {nutrient}</Text>
            ))}

            {/* Food Lists */}
            <View style={styles.columns}>
              <View style={styles.column}>
                <Text style={styles.sectionHeader}>✅ Allowed Foods</Text>
                {dietChart.allowed_foods.map((food, index) => (
                  <Text key={index} style={styles.bulletText}>• {food}</Text>
                ))}
              </View>

              <View style={styles.column}>
                <Text style={styles.sectionHeader}>❌ Avoid</Text>
                {dietChart.foods_to_avoid.map((food, index) => (
                  <Text key={index} style={styles.bulletText}>• {food}</Text>
                ))}
              </View>
            </View>

            <Text style={styles.sectionHeader}>📝 Notes</Text>
            <Text style={styles.text}>{dietChart.additional_notes}</Text>
          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 16,
    color:'#000'
  },
  button: {
    backgroundColor: "#0D69D7",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  subtitle: {
    color: "#666",
    fontSize: 14,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0D69D7",
    marginTop: 15,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: "#444",
    lineHeight: 24,
  },
  bulletText: {
    fontSize: 16,
    color: "#444",
    marginLeft: 8,
    lineHeight: 24,
  },
  divider: {
    marginVertical: 20,
    backgroundColor: "#ddd",
  },
  columns: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  column: {
    width: "48%",
  },
  animationContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  lottie: {
    width: 200,
    height: 200,
  },
});

export default DietChartScreen;