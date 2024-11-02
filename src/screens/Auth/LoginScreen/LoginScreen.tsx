import React from 'react';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import useLoginScreen from './useLoginScreen';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from './Styles/LoginScreenStyles';
import {Strings} from '../../../constants/strings';
import ButtonComponent from '../../../component/Button/ButtonComponent';
import TextInputFieldComponent from '../../../component/Input/TextInputField';
import LoadingSpinner from '../../../component/Spinner/LoadingSpinner';

const LoginScreen = () => {
  const {
    email,
    password,
    confirmPassword,
    showPassword,
    showConfirmPassword,
    isSignUp,
    loading,
    errorMessage, // Get error message
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
  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcomeTitle}>{Strings.welcome}</Text>
      <Text style={styles.welcomeSubtitle}>
        {isSignUp ? 'Create your account' : 'Welcome to your Portal'}
      </Text>

      {/* Email Input */}
      <TextInputFieldComponent
        label="Email"
        value={email}
        onChangeText={setEmail}
        icon={require('../../../assets/images/mail.png')}
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
        icon={require('../../../assets/images/lock.png')}
        showPasswordIcon={require('../../../assets/images/eye.png')}
        hidePasswordIcon={require('../../../assets/images/eye.png')}
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
          icon={require('../../../assets/images/lock.png')}
          showPasswordIcon={require('../../../assets/images/eye.png')}
          hidePasswordIcon={require('../../../assets/images/eye.png')}
          placeholder="Confirm Password"
          enableUnderLine={false}
        />
      )}
      {/* Display error message if it exists */}
      {errorMessage !== '' && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}

      {/* Login/Sign Up Button */}
      <ButtonComponent
        title={isSignUp ? 'Sign Up' : 'Login'}
        onPress={isSignUp ? handleSignUp : handleLogin}
        icon={require('../../../assets/images/arrow.png')}
        enabled={true}
      />

      {/* Switch between Sign Up and Login */}
      <ButtonComponent
        title={isSignUp ? 'Back to Login' : 'Sign Up'}
        onPress={isSignUp ? handleLoginToggle : handleSignUpToggle}
        icon={require('../../../assets/images/arrow.png')}
        enabled={true}
      />
    </SafeAreaView>
  );
};

export default LoginScreen;
