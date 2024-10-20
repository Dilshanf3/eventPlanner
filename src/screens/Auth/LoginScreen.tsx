import React from 'react';
import {Text, TouchableOpacity, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import InputField from '../../component/InputField';
import useLoginScreen from './useLoginScreen';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from '../../styles/loginStyles';
import {Strings} from '../../constants/strings';
const LoginScreen = () => {
  const {
    email,
    password,
    confirmPassword,
    showPassword,
    showConfirmPassword,
    isSignUp,
    loading,
    setEmail,
    setPassword,
    setConfirmPassword,
    toggleShowPassword,
    toggleShowConfirmPassword,
    handleSignUpToggle,
    handleLoginToggle,
    handleSignUp,
    handleLogin,
  } = useLoginScreen();

  return (
    <SafeAreaView style={styles.container}>
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />

      <Text style={styles.welcomeTitle}>{Strings.welcome}</Text>
      <Text style={styles.welcomeSubtitle}>
        {isSignUp ? 'Create your account' : 'Welcome to your Portal'}
      </Text>

      {/* Email Input */}
      <InputField
        placeholder="your.email@gmail.com"
        value={email}
        onChangeText={setEmail}
        icon={require('../../assets/images/mail.png')}
        label="Email"
      />

      {/* Password Input */}
      <InputField
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        showToggle={true}
        toggleShow={toggleShowPassword}
        icon={require('../../assets/images/lock.png')}
        showPasswordIcon={require('../../assets/images/eye.png')}
        hidePasswordIcon={require('../../assets/images/eye.png')}
        label="Password"
      />

      {/* Confirm Password Input - Only during Sign Up */}
      {isSignUp && (
        <InputField
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
          showToggle={true}
          toggleShow={toggleShowConfirmPassword}
          icon={require('../../assets/images/lock.png')}
          showPasswordIcon={require('../../assets/images/eye.png')}
          hidePasswordIcon={require('../../assets/images/eye.png')}
          label='Confirm Password'
        />
      )}

      {/* Login/Sign Up Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={isSignUp ? handleSignUp : handleLogin}>
        <Text style={styles.buttonText}>{isSignUp ? 'Sign Up' : 'Login'}</Text>
        <Image
          source={require('../../assets/images/arrow.png')}
          style={styles.icon}
        />
      </TouchableOpacity>

      {/* Switch between Sign Up and Login */}
      <TouchableOpacity
        style={styles.button}
        onPress={isSignUp ? handleLoginToggle : handleSignUpToggle}>
        <Text style={styles.buttonText}>
          {isSignUp ? 'Back to Login' : 'Sign Up'}
        </Text>
        <Image
          source={require('../../assets/images/arrow.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;
