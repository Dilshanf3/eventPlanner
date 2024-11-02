import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import styles from './Styles/customDrawerStyles';
import {Strings} from '../../constants/strings';

const CustomDrawerContent = props => {
  const navigation = useNavigation();
  // Access user profile from Redux store
  const profile = useSelector(state => state.profile);

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      await auth().signOut(); // Sign out from Firebase
      await AsyncStorage.clear(); // Clear AsyncStorage

      navigation.navigate('Login'); // Navigate to the login screen after logout
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Logout failed. Please try again.');
    }
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={
            profile.profilePic
              ? {uri: profile.profilePic}
              : require('../../assets/images/profilepic.png')
          }
          style={styles.profileImage}
        />

        <Text style={styles.profileName}>
          {profile.firstName} {profile.lastName}
        </Text>
        <Text style={styles.profileEmail}>{profile.email}</Text>
      </View>

      {/* Drawer Items */}
      <View style={styles.drawerItems}>
        <DrawerItemList {...props} />
      </View>

      {/* Logout Section */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Image
            source={require('../../assets/images/Logout.png')}
            style={styles.logoutIcon}
          />
          <Text style={styles.logoutText}>{Strings.logout}</Text>
        </TouchableOpacity>

        {/* Version Info */}
        <Text style={styles.versionText}>{Strings.version}</Text>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
