import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {RootState} from '../../redux/store';
import {handleLogout} from '../../services/LogoutService/Logout';
import styles from './Styles/customDrawerStyles';
import {Strings} from '../../constants/strings';

interface Profile {
  profilePic?: string;
  firstName: string;
  lastName: string;
  email: string;
}

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = props => {
  const dispatch = useDispatch();
  const profile = useSelector<RootState, Profile>(state => state.profile);

  const onLogout = () => {
    props.navigation.closeDrawer();

    dispatch(handleLogout(props.navigation));
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
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
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
