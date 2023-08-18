import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FloatingButton = ({onPress, buttonStyles, iconSize}) => {
  const size = iconSize === '' ? 20 : iconSize;
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, buttonStyles]}
      onPress={onPress}>
      <Ionicons name="add" size={size} color="#fff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 5,
    right: 15,
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
});

export default FloatingButton;
