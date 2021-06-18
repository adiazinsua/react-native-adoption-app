import React, {useContext} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';

import MainButton from '../components/MainButton';
import BrandButton from '../components/BrandButton';

import {AuthContext} from '../navigation/AuthProvider';
import COLORS from '../const/colors';
import Input from '../components/Input';

const SignIn = ({navigation}) => {
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  const {login, googleLogin} = useContext(AuthContext);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.container}>
        <View style={styles.container1}>
          <Image
            style={styles.logo}
            source={require('../../assets/images/hola2.jpg')}
          />
          <Text style={styles.title}>Sign In</Text>
        </View>

        <View style={styles.formContainer}>
          <Input
            labelValue={email}
            placeholderText="Email"
            iconType="alternate-email"
            onChangeText={onChangeEmail}
          />

          <Input
            labelValue={password}
            placeholderText="Password"
            iconType="lock-outline"
            secureTextEntry={true}
            onChangeText={onChangePassword}
          />
          <Text style={styles.forgot}>Forgot?</Text>

          <View style={styles.buttonContainer1}>
            <MainButton
              buttonTitle="Sign In"
              onPress={() => login(email, password)}
            />
          </View>
        </View>

        <View style={styles.container2}>
          <Text style={styles.simpleText}>Or login with...</Text>
          <View style={styles.buttonContainer}>
            <BrandButton
              image={require('../../assets/images/google.png')}
              onPress={() => googleLogin()}
            />
          </View>
          <TouchableOpacity
            style={styles.textContainer}
            onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.simpleText}>New to AdoptApp?</Text>
            <Text style={styles.highlightText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container1: {
    flex: 2,
    alignItems: 'center',
  },

  logo: {
    top: 40,
    width: 358,
    height: 232,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.secondary,
    top: 45,
    alignSelf: 'flex-start',
    left: 45,
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
  },

  buttonContainer1: {flex: 1},

  container2: {
    flex: 1,
    top: 20,
  },
  simpleText: {
    fontSize: 14,
    color: '#ACACAC',
    textAlign: 'center',
  },
  buttonContainer: {
    top: 15,

    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 55,
  },
  highlightText: {
    color: COLORS.yellow,
    fontSize: 14,
    fontWeight: 'bold',
    left: 5,
  },
  textContainer: {
    top: 30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  forgot: {
    color: COLORS.yellow,
    fontSize: 16,
    fontWeight: 'bold',
    position: 'absolute',
    marginTop: 15,
    right: 55,
  },
});

export default SignIn;
