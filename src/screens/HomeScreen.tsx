import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import TopBar from '../components/TopBar';
import ProgressRing from '../components/ProgressRing';
import bgImage from '../assets/images/cropped_background_runapp.png';

const HomeScreen = () => (
  <ImageBackground source={bgImage} style={styles.background}>
    <TopBar />
    <View style={styles.content}>
      <ProgressRing />
      <Text style={styles.text}>Home Screen</Text>
    </View>
  </ImageBackground>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default HomeScreen; 