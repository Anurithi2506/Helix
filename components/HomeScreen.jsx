import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ProgressBar} from 'react-native-paper';

const DashboardScreen = ({navigation}) => {
  const healthStats = [
    {
      id: '1',
      title: 'Heart Rate',
      value: '72 bpm',
      progress: 0.7,
      color: '#0D69D7',
      image: require('../assets/Dashboard/heart.png'),
      navigateTo: 'health',
    },
    {
      id: '2',
      title: 'Steps',
      value: '8,560',
      progress: 0.85,
      color: '#1C8EF9',
      image: require('../assets/Dashboard/steps.png'),
      navigateTo: 'steps',
    },
    {
      id: '3',
      title: 'Smartwatch',
      value: 'Connected',
      progress: 1,
      color: '#0D69D7',
      image: require('../assets/Dashboard/smartwatch.png'),
      navigateTo: 'watch',
    },
    {
      id: '4',
      title: 'Blood Pressure',
      value: '120/80',
      progress: 0.6,
      color: '#FF4060',
      image: require('../assets/Dashboard/heart.png'),
      navigateTo: 'bloodpressure',
    },
  ];

  const appointments = [
    {
      id: '1',
      title: 'Doctor Visit',
      time: '2:00 PM',
      icon: require('../assets/Dashboard/doctor.png'),
    },
    {
      id: '2',
      title: 'Blood Test',
      time: '4:30 PM',
      icon: require('../assets/Dashboard/test.png'),
    },
  ];

  return (
    <LinearGradient colors={['#E6F3FF', '#FFFFFF']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Section */}
        <LinearGradient
          colors={['#0D69D7', '#1C8EF9']}
          style={styles.profileCard}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <Image
            source={require('../assets/Dashboard/profile.png')}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.profileName}>Hello, John Doe</Text>
            <Text style={styles.profileSubtitle}>Your Health Dashboard</Text>
          </View>
        </LinearGradient>

        {/* Health Stats Grid */}
        <View style={styles.gridContainer}>
          {healthStats.map((stat) => (
            <TouchableOpacity
              key={stat.id}
              style={styles.gridCard}
              onPress={() => navigation.navigate(stat.navigateTo)}>
              <LinearGradient
                colors={['#FFFFFF', '#F8FAFF']}
                style={styles.cardGradient}>
                <View style={styles.cardHeader}>
                  <Image source={stat.image} style={styles.gridIcon} />
                  <Text style={[styles.statTitle, {color: stat.color}]}>
                    {stat.title}
                  </Text>
                </View>
                <Text style={styles.gridValue}>{stat.value}</Text>
                <ProgressBar
                  progress={stat.progress}
                  color={stat.color}
                  style={styles.progressBar}
                />
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {/* Upcoming Appointments */}
        <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
        <FlatList
          horizontal
          data={appointments}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.appointmentSection}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.appointmentCard}
              onPress={() => navigation.navigate('recipie')}>
              <LinearGradient
                colors={['#FFFFFF', '#F8FAFF']}
                style={styles.cardGradient}>
                <Image source={item.icon} style={styles.appointmentIcon} />
                <Text style={styles.appointmentTitle}>{item.title}</Text>
                <Text style={styles.appointmentTime}>{item.time}</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        />

        {/* Recent Alerts */}
        <Text style={styles.sectionTitle}>Recent Alerts</Text>
        <LinearGradient
          colors={['#FFFFFF', '#F8FAFF']}
          style={styles.alertCard}>
          <Text style={styles.alertText}>
            No new alerts from your smartwatch.
          </Text>
        </LinearGradient>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
  appointmentSection: {
    paddingVertical: 10,
  },
  appointmentCard: {
    width: 160,
    height: 140,
    marginRight: 12,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
  alertCard: {
    padding: 16,
    borderRadius: 16,
    elevation: 3,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  alertText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default DashboardScreen;