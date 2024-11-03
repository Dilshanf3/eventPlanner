import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationProp} from '@react-navigation/native';
import {Alert} from 'react-native';
import {ThunkAction} from 'redux-thunk';
import {AnyAction} from 'redux';
import {RootState} from '../../redux/store'; // Adjust path to your store file
import {setProfile} from '../../redux/actions/profileActions';

export const handleLogout = (
  navigation: NavigationProp<any>,
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async dispatch => {
    try {
      console.log('Attempting logout...');
      await auth().signOut(); // Sign out from Firebase
      await AsyncStorage.clear(); // Clear AsyncStorage

      dispatch(setProfile({})); // Remove local values

      navigation.navigate('Login'); // Navigate to login screen
    } catch (error) {
      Alert.alert('Logout failed. Please try again.');
    }
  };
};
