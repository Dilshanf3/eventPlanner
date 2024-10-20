import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import styles from '../styles/uploadButtonStyle';
interface UploadButtonProps {
  profileImage: string | null;
  onUpload: () => void;
}

const UploadButton: React.FC<UploadButtonProps> = ({
  profileImage,
  onUpload,
}) => {
  return (
    <TouchableOpacity style={styles.photoContainer} onPress={onUpload}>
      {profileImage ? (
        <Image source={{uri: profileImage}} style={styles.profileImage} />
      ) : (
        <View style={styles.uploadIconContainer}>
          <Image
            source={require('../assets/images/Union.png')}
            style={styles.cameraIcon}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default UploadButton;
