import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './Styles/profileHeaderStyles';
import {Strings} from '../../constants/strings';
interface ProfileHeaderProps {
  profilePic: string | null; // Accept profilePic as a prop
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({profilePic}) => {
  return (
    <View style={styles.header}>
      <Image
        source={
          profilePic
            ? {uri: profilePic}
            : require('../../assets/images/profilepic.png') // Default image
        }
        style={styles.profileIcon}
      />
      <Text style={styles.title}>{Strings.profile}</Text>
    </View>
  );
};

export default ProfileHeader;
