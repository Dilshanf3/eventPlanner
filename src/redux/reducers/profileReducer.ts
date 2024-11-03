// src/redux/reducers/profileReducer.ts

const initialState = {
  userId: null,
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  address: '',
  profilePic: null,
};

// Profile reducer to handle user profile state
const profileReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_PROFILE':
      return {
        ...state,
        ...action.payload,
      };
    case 'UPDATE_PROFILE':
      return {
        ...state,
        ...action.payload,
      };
    case 'SET_USER_ID':
      return {
        ...state,
        userId: action.payload,
      };
    case 'CLEAR_PROFILE':
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default profileReducer;
