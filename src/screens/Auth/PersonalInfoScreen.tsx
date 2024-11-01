import React, {useState, useMemo, useEffect} from 'react';
import {View, Text, Alert, ActivityIndicator} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView} from 'react-native-gesture-handler';
import ProfileForm from '../../component/ProfileForm/ProfileForm';
import ButtonComponent from '../../component/Button/ButtonComponent';
import {updateProfile, fetchProfile} from '../../redux/actions/profileActions';
import styles from '../../styles/personalInfoStyles';
import {Strings} from '../../constants/strings';

type RootStackParamList = {
  PersonalInfo: {
    profileImage: string;
  };
  Dashboard: undefined;
};

type PersonalInfoRouteProp = RouteProp<RootStackParamList, 'PersonalInfo'>;

const PersonalInfoScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<PersonalInfoRouteProp>();
  const dispatch = useDispatch();

  const profile = useSelector((state: any) => state.profile);
  const [localProfile, setLocalProfile] = useState(profile);
  const [isEditable, setIsEditable] = useState(true);
  const [loading, setLoading] = useState(false); // Loading state for save button

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

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

  const savePersonalInfo = async () => {
    setLoading(true); // Show loading indicator
    try {
      const storedUserId = await AsyncStorage.getItem('userId');
      await firestore()
        .collection('users')
        .doc(storedUserId)
        .set({
          ...localProfile,
          profileImage: route.params?.profileImage,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
       dispatch(updateProfile(localProfile)); // Save to Redux and AsyncStorage
      Alert.alert('Info Saved', 'Your personal information has been saved.');
      navigation.navigate('Dashboard');
    } catch (error) {
      Alert.alert('Error', 'Failed to save personal information.');
      console.error('Error saving user info: ', error.message);
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.headerTitle}>{Strings.personalInfo}</Text>
        <Text style={styles.headerSubtitle}>{Strings.personalInfoContent}</Text>

        <ProfileForm fields={fields} />

        <View style={styles.buttonContainer}>
          <ButtonComponent
            title={Strings.back}
            onPress={() => navigation.goBack()}
            buttonStyle={styles.backButton}
            textStyle={styles.backButtonText}
            isBackButton={true}
            icon={require('../../assets/images/back_arrow.png')}
            enabled={true}
          />

          <ButtonComponent
            title={Strings.next}
            onPress={savePersonalInfo}
            buttonStyle={styles.nextButton}
            textStyle={styles.nextButtonText}
            icon={require('../../assets/images/arrow.png')}
            enabled={true}
          />
        </View>

        {/* Loading Spinner */}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default PersonalInfoScreen;
