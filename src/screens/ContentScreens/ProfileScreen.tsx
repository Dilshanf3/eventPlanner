import React, {useEffect, useState, useMemo} from 'react';
import {View, ScrollView, Alert, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateProfile, setProfile} from '../../redux/actions/profileActions';
import ProfileHeader from '../../component/updateProfile/ProfileHeader';
import ProfilePicture from '../../component/updateProfile/ProfilePicture';
import ProfileForm from '../../component/ProfileForm/ProfileForm';
import {
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import styles from '../../styles/profileStyles';
import ButtonComponent from '../../component/Button/ButtonComponent';

const ProfileScreen: React.FC = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);
  const [localProfile, setLocalProfile] = useState(profile);
  const [userId, setUserId] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isEditable, setIsEditable] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await AsyncStorage.getItem('userId');
        setUserId(id);
        if (id) {
          await fetchUserData(id);
        }
      } catch (error) {
        console.error('Error retrieving userId from AsyncStorage:', error);
      }
    };
    fetchUserId();
  }, []);

  const fetchUserData = async (userId: string) => {
    try {
      const userDoc = await firestore().collection('users').doc(userId).get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        console.log('userDatauserDatauserData', userData);
        dispatch(setProfile(userData));
        setLocalProfile(userData); // Set local profile for form
        setProfileImage(userData.profilePic || null);
      }
    } catch (error) {
      console.error('Error fetching user data: ', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const updatedProfile = {
        ...localProfile,
        profilePic: profileImage,
      };

      await firestore().collection('users').doc(userId).set(updatedProfile);
      dispatch(setProfile(updatedProfile));
      setIsEditable(false);
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      console.error('Error saving user data: ', error);
    }
  };

  const handleEdit = () => {
    setIsEditable(!isEditable);
  };

  const handleProfilePhotoUpload = () => {
    console.log('ggggggg');
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
      },
      {
        label: 'Phone Number',
        value: localProfile.phoneNumber,
        onChangeText: (text: string) =>
          setLocalProfile({...localProfile, phoneNumber: text}),
        editable: isEditable,
        placeholder: 'Phone Number',
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
    [localProfile, isEditable],
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  }

  return (
    <View style={{backgroundColor: 'white'}}>
      <View style={{marginTop: 6}}>
        <ProfileHeader profilePic={profileImage || profile.profilePic} />
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}>
          <ProfilePicture
            profilePic={profileImage || profile.profilePic}
            onPress={isEditable ? handleProfilePhotoUpload : undefined}
          />
          <ProfileForm fields={fields} />
          <ButtonComponent
            title={isEditable ? 'Save' : 'Edit'}
            onPress={isEditable ? handleSave : handleEdit}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default ProfileScreen;
