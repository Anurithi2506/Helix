import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { useSharedValue, withTiming, useAnimatedStyle, Easing } from 'react-native-reanimated';

const AuthScreen = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(true);
  const cardAnimation = useSharedValue(0); // Shared value for animation

  // Toggle between login and signup
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    cardAnimation.value = withTiming(isLogin ? 1 : 0, { duration: 300, easing: Easing.inOut(Easing.ease) });
  };

  // Animated style for the card
  const cardAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: cardAnimation.value === 0 ? 1 : 0.9,
      transform: [
        {
          translateY: cardAnimation.value * -20, // Move the card up by 20 units
        },
      ],
    };
  });

  return (
    <LinearGradient
      colors={['#0D69D7', '#1C8EF9', '#4AA8FF']}
      style={styles.container}
    >
      {/* Logo or App Name */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/Auth/logo.png')} // Replace with your logo
          style={styles.logo}
        />
        <Text style={styles.appName}>Helix</Text>
      </View>

      {/* Card Container */}
      <Animated.View style={[styles.card, cardAnimatedStyle]}>
        <Text style={styles.title}>{isLogin ? 'Welcome Back!' : 'Create Account'}</Text>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <Image
            source={require('../assets/Auth/email.png')} // Replace with your PNG
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
          />
        </View>
        <View style={styles.inputContainer}>
          <Image
            source={require('../assets/Auth/password.png')} // Replace with your PNG
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
          />
        </View>
        {!isLogin && (
          <View style={styles.inputContainer}>
            <Image
              source={require('../assets/Auth/password.png')} // Replace with your PNG
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#999"
              secureTextEntry
            />
          </View>
        )}

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.gradientButton}
          onPress={() => navigation.navigate('bottomtab')}
        >
          <LinearGradient
            colors={['#0D69D7', '#1C8EF9']}
            style={styles.gradientButtonBackground}
          >
            <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Sign Up'}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={toggleAuthMode}>
        <Image
          source={isLogin ? require('../assets/Auth/add-user.png') : require('../assets/Auth/login.png')} 
          style={styles.fabIcon}
        />
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  card: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0D69D7',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    marginBottom: 20,
  },
  inputIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
    resizeMode: 'contain',
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  gradientButton: {
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
  },
  gradientButtonBackground: {
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    backgroundColor: '#fff',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    right:10
  },
  fabIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});

export default AuthScreen;
