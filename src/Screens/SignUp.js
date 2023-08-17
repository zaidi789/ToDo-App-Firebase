import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import SourceImages from '../Images/SourceImages';
import CustomTextInput from '../Components/CustomTextInput';
import Button from '../Components/Button';
import {useNavigation} from '@react-navigation/native';

export default function Signup() {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.logoCon}>
        <Image style={styles.logo} source={SourceImages.Logo} />
        <View style={styles.welcomeCon}>
          <Text style={styles.welcomeText}>Create your account here!</Text>
          <Text style={styles.instructionText}>
            Enter the details below to create your account.
          </Text>
        </View>
      </View>
      <View style={styles.formCon}>
        <CustomTextInput
          label={'Username'}
          placeholder={'Enter your username'}
          style={styles.input1}
          isUserName={true}
          // errorText={'Please Enter your Email'}
        />
        <CustomTextInput
          label={'Email'}
          placeholder={'Enter your Email'}
          style={styles.input2}
          isEmail={true}
          // errorText={'Please Enter your Email'}
        />
        <CustomTextInput
          label={'Password'}
          placeholder={'Enter your Password'}
          style={styles.input3}
          isPassword={true}
          // errorText={'Please Enter your Password'}
        />
        <CustomTextInput
          label={'Confirm Password'}
          placeholder={'Confirm Password'}
          style={styles.input4}
          isPassword={true}
          // errorText={'Please Enter your Password'}
        />
        <Button
          ButtonName={'SignUp'}
          btnStyles={styles.button}
          btnTextStyles={styles.btntext}
        />
      </View>
      <View style={styles.lastCon}>
        <Text style={styles.lastText}>Don't have an Account?</Text>
        <TouchableOpacity
          style={styles.lastConBtn}
          onPress={() => {
            navigation.navigate('SignIns');
          }}>
          <Text style={styles.lastbtnText}>SignIn</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    // alignItems: 'center',
  },
  logoCon: {
    height: 250,
    // backgroundColor: 'pink',
    // alignItems: 'center',
    padding: 10,
  },
  welcomeCon: {
    alignItems: 'flex-start',
    left: 15,
    top: 15,
  },
  welcomeText: {
    fontSize: 25,
    fontWeight: '500',
    color: 'black',
    alignSelf: 'flex-start',
  },
  logo: {
    height: 150,
    width: 150,
    alignSelf: 'center',
  },
  formCon: {
    height: 400,
    alignItems: 'center',
  },
  input1: {
    top: 10,
    width: '85%',
  },
  input2: {
    top: 30,
    width: '85%',
  },
  input3: {
    top: 50,
    width: '85%',
  },
  input4: {
    top: 70,
    width: '85%',
  },

  button: {
    top: 120,
    backgroundColor: '#0077b6',
  },
  btntext: {
    color: '#FFFFFF',
  },
  lastCon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lastConBtn: {
    left: 5,
  },
  lastText: {
    fontSize: 16,
    fontWeight: '300',
    color: 'black',
    // left: 25,
    // alignSelf: 'center',
  },
  lastbtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: 'blue',
  },
});
