
export const SET_PROFILE = 'SET_PROFILE';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const SET_USER_ID = 'SET_USER_ID';
export const CLEAR_PROFILE = 'CLEAR_PROFILE'; // Action type for clearing profile

// Action to set user profile data
export const setProfile = (profileData: any) => (dispatch: any) => {
  dispatch({type: SET_PROFILE, payload: profileData});
};

// Action to update user profile data
export const updateProfile = (updatedData: any) => (dispatch: any) => {
  dispatch({type: UPDATE_PROFILE, payload: updatedData});
};

// Action to set user ID in Redux
export const setUserId = (userId: string | null) => ({
  type: SET_USER_ID,
  payload: userId,
});

// Action to clear user profile
export const clearProfile = () => (dispatch: any) => {
  dispatch({type: CLEAR_PROFILE});
};
