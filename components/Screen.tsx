import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ActivityIndicator, Button, Platform } from "react-native";
import RNPickerSelect from "react-native-picker-select"; // Import RNPickerSelect

const API_HOST = "numbersapi.p.rapidapi.com";
const API_KEY = "780bad24fcmsh3b3e10cbddce431p19bd5ejsn4fcaf87d8b42"; // Replace with your actual API key

const months = [
  { label: "January", value: "1" },
  { label: "February", value: "2" },
  { label: "March", value: "3" },
  { label: "April", value: "4" },
  { label: "May", value: "5" },
  { label: "June", value: "6" },
  { label: "July", value: "7" },
  { label: "August", value: "8" },
  { label: "September", value: "9" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" },
];

const Screen = () => {
  const [month, setMonth] = useState("1"); // Default to January
  const [day, setDay] = useState("");
  const [fact, setFact] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchFact = async () => {
    // Validate day input
    if (!day.match(/^\d+$/) || parseInt(day) < 1 || parseInt(day) > 31) {
      setFact("Please enter a valid day (1-31).");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://${API_HOST}/${month}/${day}/date`, {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": API_HOST,
        },
      });
      const text = await response.text();
      setFact(text);
    } catch (error) {
      setFact("Failed to fetch data. Please try again.");
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Date</Text>

      {/* Month Picker using RNPickerSelect */}
      <RNPickerSelect
        onValueChange={(value) => setMonth(value)}
        items={months}
        value={month}
        style={pickerSelectStyles}
        placeholder={{
          label: "Select Month",
          value: null,
        }}
      />

      {/* Day Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Day (1-31)"
        keyboardType="numeric"
        value={day}
        onChangeText={setDay}
      />

      {/* Fetch Button */}
      <Button title="Get Fact" onPress={fetchFact} />

      {/* Loading Indicator */}
      {loading ? <ActivityIndicator size="large" color="blue" /> : <Text style={styles.fact}>{fact}</Text>}
    </View>
  );
};

// Styling for RNPickerSelect
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  inputAndroid: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    width: "100%",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  fact: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    padding: 10,
    backgroundColor: "#e3f2fd",
    borderRadius: 5,
  },
});

export default Screen;
