import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';
import Dashboard from '../../screens/Dashboard/Dashboard';
import LoginScreen from '../../screens/Auth/LoginScreen/LoginScreen';
import ProfileImageScreen from '../../screens/Auth/EditProfileImage/EditProfileImageScreen';
import PersonalInfoScreen from '../../screens/Auth/EditProfile/EditProfileScreen';
import ProfileScreen from '../../screens/Profile/UpdateProfileScreen';
import PostsAndComments from '../../screens/Posts/PostsAndCommentsScreen';
import PhotosScreen from '../../screens/Photos/PhotoGalleryScreen';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'black',
        },
        tabBarActiveTintColor: '#D36F56',
        tabBarInactiveTintColor: '#fff',
      }}>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: 'Dashboard',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color}) => (
            <Image
              source={require('../../assets/images/home.png')}
              style={{width: 24, height: 24, tintColor: color}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color}) => (
            <Image
              source={require('../../assets/images/profile.png')}
              style={{width: 24, height: 24, tintColor: color}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const StackNavigator = ({user}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user ? 'Dashboard' : 'Login'} // Navigate based on user state
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="ProfileImageScreen"
          component={ProfileImageScreen}
          options={{title: 'Upload Profile Image'}}
        />
        <Stack.Screen
          name="PersonalInfoScreen"
          component={PersonalInfoScreen}
          options={{title: 'Personal Information'}}
        />
        <Stack.Screen name="Dashboard" component={TabNavigator} />
        <Stack.Screen
          name="PostsAndComments"
          component={PostsAndComments}
          options={{title: 'Posts & Comments', headerShown: true}} // Enable header for this screen
        />
         <Stack.Screen
          name="PhotosScreen"
          component={PhotosScreen}
          options={{title: 'Gallery', headerShown: true}} // Enable header for this screen
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
