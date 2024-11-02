import {useState} from 'react';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

const useLoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const handleSignUpToggle = () => setIsSignUp(!isSignUp);
  const handleLoginToggle = () => setIsSignUp(false);

  const handleSignUp = async () => {
    // Check for empty strings
    if (
      email.trim() === '' ||
      password.trim() === '' ||
      confirmPassword.trim() === ''
    ) {
      Alert.alert('Error', 'Required fields cannot be empty');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }

    setLoading(true); // Show spinner

    try {
      await auth().createUserWithEmailAndPassword(email, password);

      navigation.navigate('ProfileImageScreen'); // Navigate to Profile Image Screen
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  const handleLogin = async () => {
    // Check for empty strings
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    setLoading(true); // Show spinner

    try {
      await auth().signInWithEmailAndPassword(email, password);
      Alert.alert('Success', 'Logged in successfully!');
      navigation.navigate('Dashboard'); // Navigate to Profile Image Screen
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  return {
    email,
    password,
    confirmPassword,
    showPassword,
    showConfirmPassword,
    isSignUp,
    loading, // Return loading state
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
