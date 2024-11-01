import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import styles from '../../styles/uploadButtonStyle';

interface UploadButtonProps {
  profileImage: string | any | null; // Accept both 'require' images and URIs
  onUpload: () => void;
  sourceImage: any; // Accept 'require' sources for the placeholder image
}

const UploadButton: React.FC<UploadButtonProps> = ({
  profileImage,
  onUpload,
  sourceImage,
}) => {
  return (
    <TouchableOpacity style={styles.photoContainer} onPress={onUpload}>
      {profileImage ? (
        typeof profileImage === 'string' ? (
          <Image source={{uri: profileImage}} style={styles.profileImage} />
        ) : (
          <Image source={profileImage} style={styles.profileImage} />
        )
      ) : (
        <View style={styles.uploadIconContainer}>
          <Image source={sourceImage} style={styles.cameraIcon} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default UploadButton;
