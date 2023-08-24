import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import LottieView from 'lottie-react-native';
import SourceImages from '../Images/SourceImages';

export default function Loader({modalVisible}) {
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View style={styles.modalView}>
        <LottieView
          source={SourceImages.loading}
          style={styles.animation}
          autoPlay
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  animation: {
    width: 100,
    height: 100,
    // backgroundColor: 'white',
  },
  modalView: {
    margin: 20,
    marginTop: 300,
    backgroundColor: 'transparent',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    alignSelf: 'center',
  },
});
