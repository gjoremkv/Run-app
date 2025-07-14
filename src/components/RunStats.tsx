import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type RunStatsProps = {
  distance: number;
  time: number;
};

const RunStats: React.FC<RunStatsProps> = ({ distance, time }) => (
  <View style={styles.container}>
    <Text>Distance: {distance} km</Text>
    <Text>Time: {time} min</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 10,
  },
});

export default RunStats; 