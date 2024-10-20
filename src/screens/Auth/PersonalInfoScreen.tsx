// PersonalInfoScreen.tsx
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, Alert} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import {ScrollView} from 'react-native-gesture-handler';
import ProfileInput from '../../component/updateProfile/ProfileInput';
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
  const {profileImage} = route.params;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  const savePersonalInfo = async () => {
    try {
      await firestore().collection('users').doc(email).set({
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
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Image
              source={require('../../assets/images/back_arrow.png')}
              style={styles.icon}
            />
            <Text style={styles.backButtonText}>{Strings.back}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.nextButton}
            onPress={savePersonalInfo}>
            <Text style={styles.nextButtonText}>{Strings.next}</Text>
            <Image
              source={require('../../assets/images/arrow.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default PersonalInfoScreen;
