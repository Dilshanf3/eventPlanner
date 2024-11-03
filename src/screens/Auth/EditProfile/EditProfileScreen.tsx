import React, {useState, useMemo, useEffect} from 'react';
import {View, Text, Alert, ScrollView} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileForm from '../../../component/ProfileForm/ProfileForm';
import ButtonComponent from '../../../component/Button/ButtonComponent';
import {
  updateProfile,
  fetchProfile,
} from '../../../redux/actions/profileActions';
import styles from './Styles/EditProfileStyles';
import {Strings} from '../../../constants/strings';
import {isValidEmail, isValidPhoneNumber} from '../../Utils/validationUtils';
import LoadingSpinner from '../../../component/Spinner/LoadingSpinner';

// types for the stack param list
type RootStackParamList = {
  PersonalInfo: {
    profileImage?: string; 
  };
  Dashboard: undefined;
};

//route prop type for the PersonalInfo screen
type PersonalInfoRouteProp = RouteProp<RootStackParamList, 'PersonalInfo'>;

// state shape for the profile in Redux
interface ProfileState {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
}

const PersonalInfoScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<PersonalInfoRouteProp>();
  const dispatch = useDispatch();

  // Used a typed selector for the profile state
  const profile = useSelector(
    (state: {profile: ProfileState}) => state.profile,
  );
  const [localProfile, setLocalProfile] = useState<ProfileState>(profile);
  const [isEditable, setIsEditable] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');

  // useEffect(() => {
  //   dispatch(fetchProfile());
  // }, [dispatch]);

  const fields = useMemo(() => {
    return [
      {
        label: 'First Name',
        value: localProfile.firstName,
        onChangeText: (text: string) =>
          setLocalProfile(prev => ({...prev, firstName: text})),
        editable: isEditable,
        placeholder: 'First Name',
      },
      {
        label: 'Last Name',
        value: localProfile.lastName,
        onChangeText: (text: string) =>
          setLocalProfile(prev => ({...prev, lastName: text})),
        editable: isEditable,
        placeholder: 'Last Name',
      },
      {
        label: 'Email',
        value: localProfile.email,
        onChangeText: (text: string) =>
          setLocalProfile(prev => ({...prev, email: text})),
        editable: isEditable,
        placeholder: 'Email',
        error: emailError,
      },
      {
        label: 'Phone Number',
        value: localProfile.phoneNumber,
        onChangeText: (text: string) =>
          setLocalProfile(prev => ({...prev, phoneNumber: text})),
        editable: isEditable,
        placeholder: 'Phone Number',
        error: phoneError,
      },
      {
        label: 'Mailing Address',
        value: localProfile.address,
        onChangeText: (text: string) =>
          setLocalProfile(prev => ({...prev, address: text})),
        editable: isEditable,
        placeholder: 'Mailing Address',
      },
    ];
  }, [localProfile, isEditable, emailError, phoneError]);

  const savePersonalInfo = async () => {
    setLoading(true); 
    setEmailError(''); 
    setPhoneError('');

    // Validate email if it's not empty
    if (localProfile.email && !isValidEmail(localProfile.email)) {
      setEmailError('Please enter a valid email address.');
      setLoading(false);
      return; // Exit the function if validation fails
    }

    // Validate phone number if it's not empty
    if (
      localProfile.phoneNumber &&
      !isValidPhoneNumber(localProfile.phoneNumber)
    ) {
      setPhoneError('Please enter a valid 10-digit phone number.');
      setLoading(false);
      return; // Exit the function if validation fails
    }

    try {
      const storedUserId = await AsyncStorage.getItem('userId');
      if (storedUserId) {
        await firestore()
          .collection('users')
          .doc(storedUserId)
          .set({
            ...localProfile,
            profileImage: route.params?.profileImage || '', 
            createdAt: firestore.FieldValue.serverTimestamp(),
          });
        dispatch(updateProfile(localProfile)); // Save to Redux
        navigation.navigate('Dashboard'); // Navigate to Dashboard
      } else {
        Alert.alert('Error', 'User ID not found.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save personal information.');
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };
  if (loading) {
    return <LoadingSpinner />; //  LoadingSpinner component
  }
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>{Strings.personalInfo}</Text>
      <Text style={styles.headerSubtitle}>{Strings.personalInfoContent}</Text>
      <ScrollView>
        <ProfileForm fields={fields} />

        <View style={styles.buttonContainer}>
          <ButtonComponent
            title={Strings.back}
            onPress={() => navigation.goBack()}
            buttonStyle={styles.backButton}
            textStyle={styles.backButtonText}
            isBackButton={true}
            icon={require('../../../assets/images/back_arrow.png')}
            enabled={true}
          />

          <ButtonComponent
            title={Strings.next}
            onPress={savePersonalInfo}
            buttonStyle={styles.nextButton}
            textStyle={styles.nextButtonText}
            icon={require('../../../assets/images/arrow.png')}
            enabled={true}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default PersonalInfoScreen;
