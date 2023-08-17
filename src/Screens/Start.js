import {StyleSheet, Text, Image, View, TouchableOpacity} from 'react-native';
import React from 'react';
import SourceImages from '../Images/SourceImages';
import {useNavigation} from '@react-navigation/native';

export default function Start() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.imageCon}>
        <Image style={styles.image} source={SourceImages.StartScreen} />
        <View style={styles.textCon}>
          <Text style={styles.text1}>Task Management &</Text>
          <Text style={styles.text1}>To-Do List</Text>
          <Text style={styles.text2}>
            This is productive tool is designed to help
          </Text>
          <Text style={styles.text3}>you better manage your task</Text>
          <Text style={styles.text3}>conviniently</Text>
        </View>
        <View style={styles.btnCon}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              navigation.navigate('SignIn');
            }}>
            <Text style={styles.btnText}>Let's Start</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  imageCon: {
    height: 400,
    width: '100%',
  },
  image: {
    height: 400,
    width: '95%',
    resizeMode: 'stretch',
  },
  textCon: {
    alignItems: 'center',
  },
  text1: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 5,
  },
  text2: {
    fontSize: 14,
    color: 'black',
    marginTop: 10,
  },
  text3: {
    fontSize: 14,
    color: 'black',
    marginTop: 2,
  },
  btnCon: {
    alignItems: 'center',
    marginTop: 60,
  },
  btn: {
    height: 55,
    width: '80%',
    backgroundColor: 'blue',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },
});
