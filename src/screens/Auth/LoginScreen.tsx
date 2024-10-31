import React from 'react';
import {Text, TouchableOpacity, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import InputField from '../../component/InputField';
import useLoginScreen from './useLoginScreen';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from '../../styles/loginStyles';
import {Strings} from '../../constants/strings';
import ButtonComponent from '../../component/Button/ButtonComponent';
import TextInputFieldComponent from '../../component/Input/TextInputField';
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

      <TextInputFieldComponent
        label="Email"
        value={email}
        onChangeText={setEmail}
        icon={require('../../assets/images/mail.png')}
        placeholder="your.email@gmail.com"
        enableUnderLine={false}
      />
      {/* Password Input */}
      <TextInputFieldComponent
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        showToggle={true}
        toggleShow={toggleShowPassword}
        icon={require('../../assets/images/lock.png')}
        showPasswordIcon={require('../../assets/images/eye.png')}
        hidePasswordIcon={require('../../assets/images/eye.png')}
        placeholder="Password"
        enableUnderLine={false}
      />
      {/* Confirm Password Input - Only during Sign Up */}
      {isSignUp && (
        <TextInputFieldComponent
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
          showToggle={true}
          toggleShow={toggleShowConfirmPassword}
          icon={require('../../assets/images/lock.png')}
          showPasswordIcon={require('../../assets/images/eye.png')}
          hidePasswordIcon={require('../../assets/images/eye.png')}
          placeholder="Confirm Password"
          enableUnderLine={false}
        />
      )}

      {/* Login/Sign Up Button */}
      <ButtonComponent
        title="Login"
        onPress={isSignUp ? handleSignUp : handleLogin}
        icon={require('../../assets/images/arrow.png')}
        enabled={true}
      />

      {/* Switch between Sign Up and Login */}
      <ButtonComponent
        title={isSignUp ? 'Back to Login' : 'Sign Up'}
        onPress={isSignUp ? handleLoginToggle : handleSignUpToggle}
        icon={require('../../assets/images/arrow.png')}
        enabled={true}
      />
    </SafeAreaView>
  );
};

export default LoginScreen;
