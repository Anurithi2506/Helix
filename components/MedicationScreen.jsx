import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const MedicationReminderScreen = () => {
  const [medicines, setMedicines] = useState([]);
  const [newMedicine, setNewMedicine] = useState('');
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const addMedicine = () => {
    if (newMedicine.trim() === '') return;

    const medicine = {
      id: Math.random().toString(),
      name: newMedicine,
      time: selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
      hours: selectedTime.getHours(),
    };

    setMedicines((prev) => [...prev, medicine]);
    setNewMedicine('');
    setSelectedTime(new Date());
  };

  const removeMedicine = (id) => {
    setMedicines((prev) => prev.filter((item) => item.id !== id));
  };

  const onTimeChange = (event, selected) => {
    setShowPicker(false);
    if (selected) {
      setSelectedTime(selected);
    }
  };

  // Categorize medicines
  const morningMeds = medicines.filter((med) => med.hours >= 5 && med.hours < 12);
  const afternoonMeds = medicines.filter((med) => med.hours >= 12 && med.hours < 18);
  const nightMeds = medicines.filter((med) => med.hours >= 18 || med.hours < 5);

  const renderMedicineList = (medList) => {
    return medList.length === 0 ? (
      <Text style={styles.emptyText}>No medicines added.</Text>
    ) : (
      medList.map((medicine) => (
        <View key={medicine.id} style={styles.medicineCard}>
          <View style={styles.medicineInfo}>
            <Text style={styles.medicineName}>{medicine.name}</Text>
            <Text style={styles.medicineTime}>{medicine.time}</Text>
          </View>
          <TouchableOpacity onPress={() => removeMedicine(medicine.id)}>
            <Image source={require('../assets/delete.png')} style={styles.deleteIcon} />
          </TouchableOpacity>
        </View>
      ))
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Medication Reminder</Text>

      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          value={newMedicine}
          onChangeText={setNewMedicine}
          placeholder="Enter medicine name..."
          placeholderTextColor="#666"
        />
      </View>

      <TouchableOpacity style={styles.timePicker} onPress={() => setShowPicker(true)}>
        <Text style={styles.timeText}>
          {selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
        </Text>
        <Image source={require('../assets/clock.png')} style={styles.clockIcon} />
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker value={selectedTime} mode="time" is24Hour={false} display="default" onChange={onTimeChange} />
      )}

      <TouchableOpacity style={styles.addButton} onPress={addMedicine}>
        <Text style={styles.addButtonText}>Add Medicine</Text>
      </TouchableOpacity>

      <Text style={styles.sectionHeader}>Morning</Text>
      {renderMedicineList(morningMeds)}

      <Text style={styles.sectionHeader}>Afternoon</Text>
      {renderMedicineList(afternoonMeds)}

      <Text style={styles.sectionHeader}>Night</Text>
      {renderMedicineList(nightMeds)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0D69D7',
    marginBottom: 15,
    textAlign: 'center',
  },
  inputSection: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
    elevation: 3,
  },
  input: {
    fontSize: 16,
    color: '#333',
  },
  timePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  timeText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  clockIcon: {
    width: 20,
    height: 20,
  },
  addButton: {
    backgroundColor: '#0D69D7',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0D69D7',
    marginTop: 15,
    marginBottom: 5,
  },
  medicineCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
  },
  medicineInfo: {
    flexDirection: 'column',
  },
  medicineName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  medicineTime: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  deleteIcon: {
    width: 20,
    height: 20,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 10,
  },
});

export default MedicationReminderScreen;
