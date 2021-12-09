import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Timer from './components/Timer'
import AnimateClock from './components/AnimateClock'
import Pie from './components/Pie'

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pomo work in progress!</Text>
      {/* <Timer/> */}
      <AnimateClock />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    borderWidth: 1,
    padding: 5, margin: 5,
    borderRadius: 5,
  },
});
