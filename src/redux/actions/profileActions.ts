
import AsyncStorage from '@react-native-async-storage/async-storage';

export const setProfile = (profileData: any) => async (dispatch: any) => {
  await AsyncStorage.setItem('userProfile', JSON.stringify(profileData));
  dispatch({type: 'SET_PROFILE', payload: profileData});
};

export const updateProfile = (updatedData: any) => async (dispatch: any) => {
  const storedProfile = await AsyncStorage.getItem('userProfile');
  const profileData = storedProfile ? JSON.parse(storedProfile) : {};

  const newProfileData = {...profileData, ...updatedData};

  await AsyncStorage.setItem('userProfile', JSON.stringify(newProfileData));
  dispatch({type: 'UPDATE_PROFILE', payload: newProfileData});
};

export const fetchProfile = () => async (dispatch: any) => {
  const storedProfile = await AsyncStorage.getItem('userProfile');
  if (storedProfile) {
    dispatch({type: 'SET_PROFILE', payload: JSON.parse(storedProfile)});
  }
};
