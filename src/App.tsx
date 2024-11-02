import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StackNavigator from './navigation/StackNavigator/StackNavigator';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [initializing, setInitializing] = useState(true);

  function onAuthStateChanged(user: any) {
    setUser(user);
    
    if (user) {
      // Fetch user data from Firestore
      firestore()
        .collection('users')
        .doc(user.uid) 
        .get()
        .then(documentSnapshot => {
          const userData = documentSnapshot.data(); // Get user data
          console.log('User data:', userData); // Log user data for debugging

          // Store user email as userId in AsyncStorage
          AsyncStorage.setItem('userId', user.email)
            .then(() => {
              console.log('User email saved to AsyncStorage as userId:', user.email);
            })
            .catch(error => {
              console.error('Error saving user email to AsyncStorage:', error);
            });
        })
        .catch(error => {
          console.error('Error fetching user data from Firestore:', error);
        });
    } else {
      // Clear the user email from AsyncStorage when user logs out
      AsyncStorage.removeItem('userId')
        .then(() => {
          console.log('User email removed from AsyncStorage');
        })
        .catch(error => {
          console.error('Error removing user email from AsyncStorage:', error);
        });
    }

    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // Unsubscribe on unmount
  }, []);

  if (initializing) {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#DA5E42" />
      </View>
    );
  }

  return <StackNavigator user={user} />;
};

export default App;
