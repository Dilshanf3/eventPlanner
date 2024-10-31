import React, {useState} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import UploadButton from '../../component/UploadButton';
import WelcomeText from '../../component/WelcomeText';
import styles from '../../styles/profileImageStyles';
import ButtonComponent from '../../component/Button/ButtonComponent';
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
      <View style={styles.nextButton}>
        <ButtonComponent
          title={'Continue'}
          onPress={handleNext}
          icon={require('../../assets/images/arrow.png')}
          enabled={true}
        />
      </View>
    </View>
  );
};

export default ProfileImageScreen;
