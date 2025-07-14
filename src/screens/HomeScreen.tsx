import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Platform, PermissionsAndroid, Alert } from 'react-native';
import TopBar from '../components/TopBar';
import ProgressRing from '../components/ProgressRing';
import bgImage from '../assets/images/cropped_background_runapp.png';
import Geolocation from '@react-native-community/geolocation';

function getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
  const R = 6371000; // Radius of the earth in meters
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const HomeScreen = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [path, setPath] = useState([]); // Array of {latitude, longitude}
  const [distance, setDistance] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const watchId = useRef(null);
  const timer = useRef(null);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permission Denied', 'Location permission is required to use this feature.');
        return false;
      }
    }
    return true;
  };

  const handleStartRun = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return;
    setIsRunning(true);
    setPath([]);
    setDistance(0);
    setStartTime(Date.now());
    setElapsed(0);
    // Start timer
    timer.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    // Start location tracking
    watchId.current = Geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setPath((prev) => {
          if (prev.length > 0) {
            const last = prev[prev.length - 1];
            const d = getDistanceFromLatLonInMeters(last.latitude, last.longitude, latitude, longitude);
            setDistance((dist) => dist + d);
          }
          return [...prev, { latitude, longitude }];
        });
      },
      (error) => {
        Alert.alert('Error', error.message);
      },
      { enableHighAccuracy: true, distanceFilter: 5, interval: 2000, fastestInterval: 1000 }
    );
  };

  const handleStopRun = () => {
    setIsRunning(false);
    if (watchId.current !== null) {
      Geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
    if (timer.current !== null) {
      clearInterval(timer.current);
      timer.current = null;
    }
  };

  return (
    <ImageBackground source={bgImage} style={styles.background}>
      <TopBar />
      <View style={styles.content}>
        <ProgressRing onStart={handleStartRun} />
        {isRunning ? (
          <TouchableOpacity style={styles.stopButton} onPress={handleStopRun}>
            <Text style={styles.stopText}>Stop</Text>
          </TouchableOpacity>
        ) : null}
        <Text style={styles.text}>Home Screen</Text>
        <Text style={styles.stats}>Distance: {(distance / 1000).toFixed(2)} km</Text>
        <Text style={styles.stats}>Time: {Math.floor(elapsed / 60)}:{('0' + (elapsed % 60)).slice(-2)}</Text>
      </View>
    </ImageBackground>
  );
};

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
  stats: {
    color: '#fff',
    fontSize: 18,
    marginTop: 8,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  stopButton: {
    marginTop: 16,
    backgroundColor: '#e74c3c',
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  stopText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default HomeScreen; 