import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {isValidEmail} from '../../Utils/validationUtils';
import {
  signUpWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '../../../services/LoginService/authService';
import ScreenNames from '../../../constants/screenNames';
import {RootStackParamList} from '../../../types';
import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const useLoginScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
 

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const handleSignUpToggle = () => setIsSignUp(!isSignUp);
  const handleLoginToggle = () => {
    setIsSignUp(false);
    setErrorMessage('');
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrorMessage('');
  };

  const handleSignUp = async () => {
    if (
      email.trim() === '' ||
      password.trim() === '' ||
      confirmPassword.trim() === ''
    ) {
      setErrorMessage('Required fields cannot be empty');
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }

    setLoading(true);

    try {
      await signUpWithEmailAndPassword(email, password); // Use the utility function for sign-up
      resetForm(); // Reset form fields after successful sign-up
      navigation.navigate(ScreenNames.PROFILE_IMAGE);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (email.trim() === '' || password.trim() === '') {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      await signInWithEmailAndPassword(email, password); // Use the utility function for login
      resetForm(); // Reset form fields after successful login
      navigation.navigate(ScreenNames.DASHBOARD);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    password,
    confirmPassword,
    showPassword,
    showConfirmPassword,
    isSignUp,
    loading,
    errorMessage,
    setEmail,
    setPassword,
    setConfirmPassword,
    toggleShowPassword,
    toggleShowConfirmPassword,
    handleSignUpToggle,
    handleLoginToggle,
    handleSignUp,
    handleLogin,
  };
};

export default useLoginScreen;
