// PersonalInfoScreen.tsx
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, Alert} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import {ScrollView} from 'react-native-gesture-handler';
import ProfileInput from '../../component/updateProfile/ProfileInput';
import styles from '../../styles/personalInfoStyles';
import {Strings} from '../../constants/strings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonComponent from '../../component/Button/ButtonComponent';
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
  const {profileImage} = route.params;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  const savePersonalInfo = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('userId');
      const data = await firestore().collection('users').doc(storedUserId).set({
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        profileImage,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      Alert.alert('Info Saved', 'Your personal information has been saved.');
      navigation.navigate('Dashboard');
    } catch (error) {
      Alert.alert('Error', 'Failed to save personal information.');
      console.error('Error saving user info: ', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.headerTitle}>{Strings.personalInfo}</Text>
        <Text style={styles.headerSubtitle}>{Strings.personalInfoContent}</Text>

        <ProfileInput
          label="First Name"
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          editable={true}
        />
        <ProfileInput
          label="Last Name"
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          editable={true}
        />
        <ProfileInput
          label="Email"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          editable={true}
        />
        <ProfileInput
          label="Phone Number"
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          editable={true}
        />
        <ProfileInput
          label="Mailing Address"
          placeholder="Mailing Address"
          value={address}
          onChangeText={setAddress}
          editable={true}
        />

        <View style={styles.buttonContainer}>
          <ButtonComponent
            title={Strings.back}
            onPress={() => navigation.goBack()}
            buttonStyle={styles.backButton}
            textStyle={styles.backButtonText}
            isBackButton={true}
            icon={require('../../assets/images/back_arrow.png')}
          />

          <ButtonComponent
            title={Strings.next}
            onPress={savePersonalInfo}
            buttonStyle={styles.nextButton}
            textStyle={styles.nextButtonText}
            icon={require('../../assets/images/arrow.png')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default PersonalInfoScreen;
