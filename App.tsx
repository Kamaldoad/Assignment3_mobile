import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import Screen from "./components/Screen"; // Updated import

export default function App() {
  const [showScreen, setShowScreen] = useState(false);

  return (
    <View style={styles.container}>
      {showScreen ? (
        <Screen onBack={() => setShowScreen(false)} />
      ) : (
        <View style={styles.main}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>Assignment 3: Fetching API</Text>
          <Button title="Fetch Date Fact" onPress={() => setShowScreen(true)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#f8f9fa",
  },
  main: {
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 20,
    color: "#555",
    marginBottom: 20,
  },
});
