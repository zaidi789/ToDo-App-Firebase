import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

export default function Button({
  ButtonName,
  onPress,
  btnStyles,
  btnTextStyles,
}) {
  return (
    <TouchableOpacity style={[styles.btnCon, btnStyles]} onPress={onPress}>
      <Text style={[styles.btnText, btnTextStyles]}>{ButtonName}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnCon: {
    height: 50,
    width: '85%',
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  btnText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
  },
});
