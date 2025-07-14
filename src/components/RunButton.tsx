import React from 'react';
import { Button } from 'react-native';

type RunButtonProps = {
  onPress: () => void;
};

const RunButton: React.FC<RunButtonProps> = ({ onPress }) => (
  <Button title="Start Run" onPress={onPress} />
);

export default RunButton; 