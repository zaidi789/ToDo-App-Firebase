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

export default function Signup() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailErrorText, setEmailErrorText] = useState('');
  const [usernameErrorText, setUsernameErrorText] = useState('');
  const [passwordErrorText, setPasswordErrorText] = useState('');
  const [confirmPasswordErrorText, setConfirmPasswordErrorText] = useState('');

  const handleSignUp = async => {
    let hasErrors = false;

    if (username === '') {
      setUsernameErrorText('Please enter your username');
      hasErrors = true;
    } else {
      setUsernameErrorText('');
    }

    if (email === '') {
      setEmailErrorText('Please enter your email');
      hasErrors = true;
    } else {
      setEmailErrorText('');
    }

    if (password === '') {
      setPasswordErrorText('Please enter your password');
      hasErrors = true;
    } else {
      setPasswordErrorText('');
    }

    if (confirmPassword === '') {
      setConfirmPasswordErrorText('Please enter confirm password');
      hasErrors = true;
    } else if (password !== confirmPassword) {
      setConfirmPasswordErrorText("Passwords don't match");
      hasErrors = true;
    } else {
      setConfirmPasswordErrorText('');
    }

    if (!hasErrors) {
      try {
        auth()
          .createUserWithEmailAndPassword(email, password)
          .then(user => {
            alert('sucessfully registered');
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
              console.log('That email address is invalid!');
            }

            console.error(error);
          });
      } catch {
        error => {
          console.log(error);
        };
      }
      console.log('email', email, 'password', password);
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setUsernameErrorText('');
      setEmailErrorText('');
      setPasswordErrorText('');
      setConfirmPasswordErrorText('');
    }
  };

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
          onChangeText={setUsername}
          value={username}
          errorText={usernameErrorText}
          // errorText={'Please Enter your Email'}
        />
        <CustomTextInput
          label={'Email'}
          placeholder={'Enter your Email'}
          style={styles.input2}
          isEmail={true}
          onChangeText={setEmail}
          value={email}
          errorText={emailErrorText}

          // errorText={'Please Enter your Email'}
        />
        <CustomTextInput
          label={'Password'}
          placeholder={'Enter your Password'}
          style={styles.input3}
          isPassword={true}
          onChangeText={setPassword}
          value={password}
          errorText={passwordErrorText}

          // errorText={'Please Enter your Password'}
        />
        <CustomTextInput
          label={'Confirm Password'}
          placeholder={'Confirm Password'}
          style={styles.input4}
          isPassword={true}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          errorText={confirmPasswordErrorText}

          // errorText={'Please Enter your Password'}
        />
        <Button
          ButtonName={'SignUp'}
          btnStyles={styles.button}
          btnTextStyles={styles.btntext}
          onPress={() => {
            handleSignUp();
          }}
        />
      </View>
      <View style={styles.lastCon}>
        <Text style={styles.lastText}>Don't have an Account?</Text>
        <TouchableOpacity
          style={styles.lastConBtn}
          onPress={() => {
            navigation.navigate('SignIn');
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
    height: 500,
    alignItems: 'center',
  },
  input1: {
    top: 15,
    width: '85%',
  },
  input2: {
    top: 30,
    width: '85%',
  },
  input3: {
    top: 45,
    width: '85%',
  },
  input4: {
    top: 60,
    width: '85%',
  },

  button: {
    top: 90,
    backgroundColor: '#0077b6',
  },
  btntext: {
    color: '#FFFFFF',
  },
  lastCon: {
    position: 'absolute',
    top: 670,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    // backgroundColor: 'green',
  },
  lastConBtn: {
    left: 70,
  },
  lastText: {
    fontSize: 16,
    fontWeight: '300',
    color: 'black',
    left: 65,
    // alignSelf: 'center',
  },
  lastbtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: 'blue',
  },
});
