import React, {useEffect, useState} from 'react';
import {View, ScrollView, Alert, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateProfile, setProfile} from '../../redux/actions/profileActions';

import {UserProfile} from '../../redux/types/profileTypes';
import ProfileHeader from '../../component/updateProfile/ProfileHeader';
import ProfilePicture from '../../component/updateProfile/ProfilePicture';
import ProfileInput from '../../component/updateProfile/ProfileInput';
import EditButton from '../../component/EditButton';
import {
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import styles from '../../styles/profileStyles';

const ProfileScreen: React.FC = () => {
  const dispatch = useDispatch();
  const profile: UserProfile = useSelector((state: any) => state.profile);
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
  }, [dispatch]);

  const fetchUserData = async (userId: string) => {
    try {
      const userDoc = await firestore().collection('users').doc(userId).get();
      if (userDoc.exists) {
        const userData: UserProfile = userDoc.data() as UserProfile;
        console.log('userData', userData);

        // Update profile in Redux store
        dispatch(setProfile(userData));

        // Set local state for profile image
        setProfileImage(userData.profilePic || null);
      } else {
        console.log('No such document!');
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
        ...profile,
        profilePic: profileImage,
      };

      if (profileImage) {
        await firestore()
          .collection('users')
          .doc(userId)
          .update({profilePic: profileImage});
      }

      // Save  profile details
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
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
      },
      (response: ImagePickerResponse) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.assets && response.assets[0].base64) {
          const base64Image = `data:image/jpeg;base64,${response.assets[0].base64}`;
          setProfileImage(base64Image);
        }
      },
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <ProfileHeader profilePic={profileImage || profile.profilePic} />
      <ProfilePicture
        profilePic={profileImage || profile.profilePic}
        onPress={isEditable ? handleProfilePhotoUpload : undefined}
      />
      <ProfileInput
        label="First Name"
        value={profile.firstName}
        onChangeText={text => dispatch(updateProfile({firstName: text}))}
        editable={isEditable}
        placeholder="First Name"
      />
      <ProfileInput
        label="Last Name"
        value={profile.lastName}
        onChangeText={text => dispatch(updateProfile({lastName: text}))}
        editable={isEditable}
        placeholder="Last Name"
      />
      <ProfileInput
        label="Email"
        value={profile.email}
        onChangeText={text => dispatch(updateProfile({email: text}))}
        editable={isEditable}
        placeholder="Email"
      />
      <ProfileInput
        label="Phone Number"
        value={profile.phoneNumber}
        onChangeText={text => dispatch(updateProfile({phoneNumber: text}))}
        editable={isEditable}
        placeholder="Phone Number"
      />
      <ProfileInput
        label="Mailing Address"
        value={profile.address}
        onChangeText={text => dispatch(updateProfile({address: text}))}
        editable={isEditable}
        placeholder="Mailing Address"
      />
      <EditButton
        onPress={isEditable ? handleSave : handleEdit}
        isEditable={isEditable}
      />
      <View style={{height: 80}} />
    </ScrollView>
  );
};

export default ProfileScreen;
