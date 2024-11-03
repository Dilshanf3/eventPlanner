import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import StackNavigator from './navigation/StackNavigator/StackNavigator';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {setUserId, clearProfile} from './redux/actions/profileActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingSpinner from './component/Spinner/LoadingSpinner';

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [initializing, setInitializing] = useState(true);
  const dispatch = useDispatch();

  // Function to load user ID from AsyncStorage
  const loadUserId = async () => {
    try {
      const savedUserId = await AsyncStorage.getItem('userId');
      if (savedUserId) {
        // Dispatch the user ID to Redux
        dispatch(setUserId(savedUserId));
      }
    } catch (error) {
      console.error('Error loading user ID from AsyncStorage:', error);
    }
  };

  // Function to handle authentication state change
  function onAuthStateChanged(user: any) {
    setUser(user);

    if (user) {
      // Save the user ID
      AsyncStorage.setItem('userId', user.email)
        .then(() => {
          dispatch(setUserId(user.email)); // Dispatch user ID to Redux
        })
        .catch(error => {
          console.error('Error saving user ID to AsyncStorage:', error);
        });
    } else {
      dispatch(clearProfile()); // Clear profile data when user logs out
      AsyncStorage.removeItem('userId'); // Remove user ID from AsyncStorage
    }

    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    loadUserId(); // Load user ID on initial app load
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // Unsubscribe on unmount
  }, []);

  if (initializing) {
    return <LoadingSpinner />;
  }

  return <StackNavigator user={user} />;
};

export default App;
