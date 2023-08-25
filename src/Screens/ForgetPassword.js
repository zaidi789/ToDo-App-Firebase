import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomTextInput from '../Components/CustomTextInput';
import Button from '../Components/Button';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Loader from '../Components/Loader';

export default function ForgetPassword() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handelForgotPassword = () => {
    setIsLoading(true);
    try {
      auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          alert('Reset email sent sucessfully');
          setIsLoading(false);
          navigation.navigate('SignIn');
        })
        .catch(error => {
          setIsLoading(false);
          alert('email address not found');
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Loader modalVisible={isLoading} />
      <View style={styles.txtCon}>
        <View style={styles.iconCon}>
          <Ionicons name="finger-print-outline" size={35} color="black" />
        </View>

        <Text style={styles.text}>Forget password?</Text>
        <Text style={styles.text2}>
          No worries we'll send you reset instructions.
        </Text>
        <View>
          <CustomTextInput
            label={'Email'}
            placeholder={'Enter registered email'}
            isEmail={true}
            labelStyle={{backgroundColor: '#f8edeb'}}
            onChangeText={setEmail}
            value={email}
          />
          <Button
            ButtonName={'Reset password'}
            btnStyles={styles.btn}
            btnTextStyles={styles.btnText}
            onPress={() => {
              handelForgotPassword();
            }}
          />
        </View>
        <View style={styles.backBtnCon}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => {
              navigation.navigate('SignIn');
            }}>
            <Ionicons name="arrow-back" size={24} color="black" />
            <Text>Back to log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8edeb',
  },
  txtCon: {
    marginTop: 100,
    flex: 1,
    // justifyContent: 'center',
    padding: 20,
  },
  iconCon: {
    backgroundColor: '#FFFFFF',
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  text2: {
    marginTop: 10,
    fontSize: 14,
    marginBottom: 20,
  },
  btn: {
    marginTop: 30,
    backgroundColor: 'black',
    width: '100%',
    alignSelf: 'center',
    height: 45,
    borderRadius: 0,
  },
  btnText: {
    color: 'white',
  },
  backBtnCon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  backBtn: {
    flexDirection: 'row',
  },
});
