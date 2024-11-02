import React, {useState} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import UploadButton from '../../../component/ImageUpload/UploadButton';
import WelcomeText from '../../../component/WelcomeText';
import styles from './Styles/EditProfileImageScreen';
import ButtonComponent from '../../../component/Button/ButtonComponent';

// Define the type for your stack navigator
type RootStackParamList = {
  PersonalInfoScreen: {
    profileImage: string | undefined;
    welcomeMessage: string;
  };
};

type ProfileImageScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PersonalInfoScreen'
>;

const ProfileImageScreen: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | undefined>(
    undefined,
  );
  const [welcomeMessage] = useState(
    'You are logged in for the first time and can upload a profile photo.',
  );
  const navigation = useNavigation<ProfileImageScreenNavigationProp>();

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
        } else {
          console.log('Image selection failed');
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
        sourceImage={require('../../../assets/images/Union.png')}
      />
      <View style={styles.nextButton}>
        <ButtonComponent
          title="Continue"
          onPress={handleNext}
          icon={require('../../../assets/images/arrow.png')}
          enabled={true}
        />
      </View>
    </View>
  );
};

export default ProfileImageScreen;
