import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import circleImage from '../assets/images/circle-runningapp.png';

const RADIUS = 70;
const STROKE_WIDTH = 14;
const CENTER = RADIUS + STROKE_WIDTH;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const PROGRESS = 0.6; // 60% progress for demo
const ANGLE = 360 * PROGRESS;
const GREEN_TRAIL = 0.2; // 20% trail

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

const ProgressRing = () => {
  // Calculate runner position
  const runnerPos = polarToCartesian(CENTER, CENTER, RADIUS, ANGLE);
  // Calculate green trail path
  const trailStart = polarToCartesian(CENTER, CENTER, RADIUS, ANGLE - GREEN_TRAIL * 360);
  const trailEnd = runnerPos;
  const trailPath = `M ${trailStart.x} ${trailStart.y} A ${RADIUS} ${RADIUS} 0 0 1 ${trailEnd.x} ${trailEnd.y}`;

  return (
    <View style={styles.container}>
      <View style={styles.circleWrapper}>
        <Image source={circleImage} style={styles.circleImage} />
        <Svg style={styles.svg} width={2 * (RADIUS + STROKE_WIDTH)} height={2 * (RADIUS + STROKE_WIDTH)}>
          {/* Removed green trail Path */}
        </Svg>
        {/* Runner icon (animated position) */}
        <MaterialCommunityIcons
          name="run"
          size={28}
          color="#27ae60"
          style={{
            position: 'absolute',
            left: runnerPos.x - 14,
            top: runnerPos.y - 14,
          }}
        />
      </View>
      {/* Start button below the circle */}
      <TouchableOpacity style={styles.startButton}>
        <Text style={styles.startText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 32,
    width: 2 * (RADIUS + STROKE_WIDTH),
  },
  circleWrapper: {
    width: 2 * (RADIUS + STROKE_WIDTH),
    height: 2 * (RADIUS + STROKE_WIDTH),
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleImage: {
    position: 'absolute',
    width: 2 * (RADIUS + STROKE_WIDTH),
    height: 2 * (RADIUS + STROKE_WIDTH),
    resizeMode: 'contain',
  },
  svg: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  startButton: {
    marginTop: 16,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  startText: {
    color: '#e74c3c',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default ProgressRing; 