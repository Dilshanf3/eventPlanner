import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';

interface ProfilePictureProps {
  profilePic: string | null;
  onPress: () => void;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({
  profilePic,
  onPress,
}) => {
  console.log('Profile Picture Base64:', profilePic); // This will log the base64 string
  return (
    <View style={styles.profilePicContainer}>
      <TouchableOpacity onPress={onPress} style={styles.touchable}>
        <Image
          source={
            profilePic
              ? {uri: profilePic}
              : require('../../assets/images/editProfile.png')
          }
          style={styles.profilePic}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  profilePicContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  touchable: {
    position: 'relative',
  },
  profilePic: {
    width: 116,
    height: 116,
    borderRadius: 58,
  },
});

export default ProfilePicture;
