import React from 'react';
import { Button } from 'react-native';
import TopBar from './components/TopBar';

type RunButtonProps = {
  onPress: () => void;
};

const RunButton: React.FC<RunButtonProps> = ({ onPress }) => (
  <Button title="Start Run" onPress={onPress} />
);

export default RunButton; 