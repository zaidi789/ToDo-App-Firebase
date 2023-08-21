import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import SourceImages from '../Images/SourceImages';
import CustomTextInput from '../Components/CustomTextInput';
import Button from '../Components/Button';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

export default function SignIn() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErrorText, setEmailErrorText] = useState('');
  const [passwordErrorText, setPasswordErrorText] = useState('');

  const handleSignIn = () => {
    if (email === '' && password === '') {
      setEmailErrorText('Please enter your email');
      setPasswordErrorText('Please enter your password');
    } else if (email === '') {
      setEmailErrorText('Please enter your email');
      setPasswordErrorText('');
    } else if (password === '') {
      setEmailErrorText('');
      setPasswordErrorText('Please enter your password');
    } else {
      // console.log('email', email, 'password', password);
      try {
        auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            alert('Login Sucessfull');
            navigation.navigate('HomeTabs');
          });
      } catch (error) {
        console.log(error);
      }
      setEmail('');
      setPassword('');
      setEmailErrorText('');
      setPasswordErrorText('');
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.logoCon}>
        <Image style={styles.logo} source={SourceImages.Logo} />
        <View style={styles.welcomeCon}>
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={styles.welcomeText}>login Here!</Text>
        </View>
      </View>
      <View style={styles.formCon}>
        <CustomTextInput
          label={'Email'}
          placeholder={'Enter your Email'}
          style={styles.input1}
          isEmail={true}
          onChangeText={setEmail}
          value={email}
          errorText={emailErrorText}
          // errorText={'Please Enter your Email'}
        />
        <CustomTextInput
          label={'Password'}
          placeholder={'Enter your Password'}
          style={styles.input2}
          isPassword={true}
          onChangeText={setPassword}
          value={password}
          errorText={passwordErrorText}
          // errorText={'Please Enter your Password'}
        />
        <TouchableOpacity style={styles.forgetTextCon}>
          <Text style={styles.forgetText}>Forget Password ?</Text>
        </TouchableOpacity>
        <Button
          ButtonName={'SignIn'}
          btnStyles={styles.button}
          btnTextStyles={styles.btntext}
          onPress={() => {
            handleSignIn();
          }}
        />
      </View>
      <View style={styles.lastCon}>
        <Text style={styles.lastText}>Don't have an Account?</Text>
        <TouchableOpacity
          style={styles.lastConBtn}
          onPress={() => {
            navigation.navigate('Signup');
          }}>
          <Text style={styles.lastbtnText}>SignUp</Text>
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
    top: 50,
    width: '85%',
  },
  input2: {
    top: 70,
    width: '85%',
  },
  forgetTextCon: {
    top: 80,
    alignSelf: 'flex-end',
    right: 30,
    color: 'black',
  },
  forgetText: {
    color: 'black',
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
