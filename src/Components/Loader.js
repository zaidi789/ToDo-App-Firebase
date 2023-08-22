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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
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
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
