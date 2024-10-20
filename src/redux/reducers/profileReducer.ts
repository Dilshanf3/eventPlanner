// src/redux/reducers/profileReducer.ts
const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  address: '',
  profilePic: null,
};

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
    default:
      return state;
  }
};

export default profileReducer;
