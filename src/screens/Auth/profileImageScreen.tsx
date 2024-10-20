import React, {useState} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import UploadButton from '../../component/UploadButton';
import WelcomeText from '../../component/WelcomeText';
import NextButton from '../../component/NextButton';
import styles from '../../styles/profileImageStyles';

const ProfileImageScreen: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [welcomeMessage] = useState<string>(
    'You are logged in for the first time and can upload a profile photo.',
  );
  const navigation = useNavigation();

  const handleProfilePhotoUpload = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
      },
      (response: ImagePickerResponse) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.assets && response.assets[0].base64) {
          setProfileImage(
            `data:image/jpeg;base64,${response.assets[0].base64}`,
          );
        }
      },
    );
  };

  const handleNext = () => {
    navigation.navigate('PersonalInfoScreen', {profileImage, welcomeMessage});
  };

  return (
    <View style={styles.container}>
      <WelcomeText message={welcomeMessage} />
      <UploadButton
        profileImage={profileImage}
        onUpload={handleProfilePhotoUpload}
      />
      <NextButton onPress={handleNext} buttonText="Continue" />
    </View>
  );
};

export default ProfileImageScreen;
