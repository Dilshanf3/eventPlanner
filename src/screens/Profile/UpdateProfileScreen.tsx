import React, {useEffect, useState, useMemo} from 'react';
import {View, ScrollView, SafeAreaView, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {setProfile} from '../../redux/actions/profileActions';
import ProfileHeader from '../../component/updateProfile/ProfileHeader';
import ProfilePicture from '../../component/updateProfile/ProfilePicture';
import ProfileForm from '../../component/ProfileForm/ProfileForm';
import {
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import styles from './Styles/UpdateProfileStyles';
import ButtonComponent from '../../component/Button/ButtonComponent';
import {AppDispatch} from '../../redux/store';
import {isValidEmail, isValidPhoneNumber} from '../Utils/validationUtils';
import LoadingSpinner from '../../component/Spinner/LoadingSpinner';

const ProfileScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: any) => state.profile);
  const userId = profile.userId; // Get userId directly from Redux
  const [localProfile, setLocalProfile] = useState(profile);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isEditable, setIsEditable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // State for error messages
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  useEffect(() => {
    if (userId) {
      fetchUserData(userId);
    } else {
      setLoading(false);
    }
  }, [userId]);

  const fetchUserData = async (userId: string) => {
    try {
      const userDoc = await firestore().collection('users').doc(userId).get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        if (userData) {
          dispatch(setProfile(userData));
          setLocalProfile(userData); // Set local profile for form
          setProfileImage(userData.profileImage || null);
        } else {
          console.warn('User data is undefined.');
        }
      } else {
        console.warn('No user document found with this userId.');
      }
    } catch (error) {
      console.error('Error fetching user data: ', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!userId) {
      Alert.alert('Error', 'User ID is not available.');
      return;
    }

    setEmailError('');
    setPhoneError('');

    // Validate email and phone number
    const emailValid = isValidEmail(localProfile.email);
    const phoneValid = isValidPhoneNumber(localProfile.phoneNumber);

    if (!emailValid) {
      setEmailError('Please enter a valid email address.');
    }

    if (!phoneValid) {
      setPhoneError('Please enter a valid phone number (10 digits).');
    }

    if (!emailValid || !phoneValid) {
      return;
    }

    setSaving(true);

    try {
      const updatedProfile = {
        ...localProfile,
        profilePic: profileImage || '',
      };

      await firestore().collection('users').doc(userId).set(updatedProfile);
      dispatch(setProfile(updatedProfile));
      setIsEditable(false);

      Alert.alert(
        'Profile Updated',
        'Your profile has been successfully updated!',
      );
    } catch (error) {
      console.error('Error saving user data: ', error);
      Alert.alert(
        'Error',
        'There was a problem updating your profile. Please try again.',
      );
    } finally {
      setSaving(false); // Reset saving state
    }
  };

  const handleEdit = () => {
    setIsEditable(!isEditable);
  };

  const handleProfilePhotoUpload = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
      },
      (response: ImagePickerResponse) => {
        if (
          !response.didCancel &&
          response.assets &&
          response.assets[0].base64
        ) {
          const base64Image = `data:image/jpeg;base64,${response.assets[0].base64}`;
          setProfileImage(base64Image);
        }
      },
    );
  };

  // Memoize fields array
  const fields = useMemo(
    () => [
      {
        label: 'First Name',
        value: localProfile.firstName,
        onChangeText: (text: string) =>
          setLocalProfile({...localProfile, firstName: text}),
        editable: isEditable,
        placeholder: 'First Name',
      },
      {
        label: 'Last Name',
        value: localProfile.lastName,
        onChangeText: (text: string) =>
          setLocalProfile({...localProfile, lastName: text}),
        editable: isEditable,
        placeholder: 'Last Name',
      },
      {
        label: 'Email',
        value: localProfile.email,
        onChangeText: (text: string) =>
          setLocalProfile({...localProfile, email: text}),
        editable: isEditable,
        placeholder: 'Email',
        error: emailError,
      },
      {
        label: 'Phone Number',
        value: localProfile.phoneNumber,
        onChangeText: (text: string) =>
          setLocalProfile({...localProfile, phoneNumber: text}),
        editable: isEditable,
        placeholder: 'Phone Number',
        error: phoneError,
      },
      {
        label: 'Mailing Address',
        value: localProfile.address,
        onChangeText: (text: string) =>
          setLocalProfile({...localProfile, address: text}),
        editable: isEditable,
        placeholder: 'Mailing Address',
      },
    ],
    [localProfile, isEditable, emailError, phoneError],
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{marginTop: 6}}>
        <ProfileHeader profilePic={profileImage || profile.profilePic} />

        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          style={{flexGrow: 1}}>
          <ProfilePicture
            profilePic={profileImage || profile.profilePic}
            onPress={isEditable ? handleProfilePhotoUpload : () => {}}
          />
          <ProfileForm fields={fields} />

          <ButtonComponent
            title={isEditable ? (saving ? 'Saving...' : 'Save') : 'Edit'}
            onPress={isEditable ? handleSave : handleEdit}
            buttonStyle={{marginBottom: 40}}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
