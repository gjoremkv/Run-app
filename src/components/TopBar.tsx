import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TopBar = () => (
  <View style={styles.container}>
    <TouchableOpacity>
      <Icon name="person" size={28} />
    </TouchableOpacity>
    <Text style={styles.title}>RunApp</Text>
    <TouchableOpacity>
      <Icon name="settings" size={28} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default TopBar; 