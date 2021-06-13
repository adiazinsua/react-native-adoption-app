import React, {useContext} from 'react';
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  ImageBackground,
} from 'react-native';
import BrandButton from '../components/BrandButton';
import MainButton from '../components/MainButton';
import {AuthContext} from '../navigation/AuthProvider';
import COLORS from '../const/colors';
import Input from '../components/Input';

const SignUp = ({navigation}) => {
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const {register, googleLogin} = useContext(AuthContext);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.container}>
        <ImageBackground
          resizeMode="cover"
          source={require('../../assets/images/aber.png')}
          style={{flex: 1, width: '100%', height: 735}}>
          <View style={{flex: 1}}>
            <Text style={styles.title}>Sign Up</Text>
          </View>
          <View style={{flex: 1, top: 50}}>
            <View style={styles.buttonContainer}>
              <BrandButton
                image={require('../../assets/images/google.png')}
                onPress={() => googleLogin()}
              />
            </View>
            <Text style={styles.simpleText}>Or register with email...</Text>
          </View>

          <View style={styles.formContainer}>
            <Input
              labelValue={fullName}
              placeholderText="Full name"
              iconType="face"
              onChangeText={text => setFullName(text)}
            />

            <Input
              labelValue={email}
              placeholderText="Email"
              iconType="alternate-email"
              onChangeText={text => setEmail(text)}
            />

            <Input
              labelValue={password}
              placeholderText="Password"
              iconType="lock-outline"
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
            />

            <Input
              labelValue={confirmPassword}
              placeholderText="Repeat password"
              iconType="lock-outline"
              onChangeText={text => setConfirmPassword(text)}
              secureTextEntry={true}
            />

            <View style={{flex: 1, bottom: 10}}>
              <MainButton
                buttonTitle="Sign Up"
                onPress={() => register(email, password, fullName)}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.white,
    top: 50,
    alignSelf: 'flex-start',
    left: 35,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 55,
  },
  simpleText: {
    top: 15,
    fontSize: 14,
    color: '#ACACAC',
    textAlign: 'center',
  },
  formContainer: {
    flex: 2,
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    bottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: COLORS.lightgrey,
    width: 300,
    height: 48,
    fontSize: 16,
    paddingLeft: 40,
  },
  icon: {
    position: 'absolute',
    marginTop: 15,
    left: 5,
    color: '#ACACAC',
  },
});

export default SignUp;
