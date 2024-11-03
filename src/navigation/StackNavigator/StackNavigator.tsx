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
import ScreenNames from '../../constants/screenNames';
import {RootStackParamList} from '../../types';

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
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
      name={ScreenNames.DASHBOARD}
      component={Dashboard}
      options={{
        title: 'Dashboard',
        tabBarIcon: ({color}) => (
          <Image
            source={require('../../assets/images/home.png')}
            style={{width: 24, height: 24, tintColor: color}}
          />
        ),
      }}
    />
    <Tab.Screen
      name={ScreenNames.PROFILE}
      component={ProfileScreen}
      options={{
        title: 'Profile',
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
const Stack = createStackNavigator<RootStackParamList>();
const StackNavigator = ({user}: {user: boolean}) => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName={user ? ScreenNames.DASHBOARD : ScreenNames.LOGIN}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={ScreenNames.LOGIN} component={LoginScreen} />
      <Stack.Screen
        name={ScreenNames.PROFILE_IMAGE}
        component={ProfileImageScreen}
        options={{title: 'Upload Profile Image'}}
      />
      <Stack.Screen
        name={ScreenNames.PERSONAL_INFO}
        component={PersonalInfoScreen}
        options={{title: 'Personal Information'}}
      />
      <Stack.Screen name={ScreenNames.DASHBOARD} component={TabNavigator} />
      <Stack.Screen
        name={ScreenNames.POSTS_AND_COMMENTS}
        component={PostsAndComments}
        options={{title: 'Posts & Comments', headerShown: true}}
      />
      <Stack.Screen
        name={ScreenNames.PHOTOS_SCREEN}
        component={PhotosScreen}
        options={{title: 'Gallery', headerShown: true}}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default StackNavigator;
