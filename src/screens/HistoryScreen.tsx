import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HistoryScreen = () => (
  <View style={styles.container}>
    <Text>History Screen</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HistoryScreen; 