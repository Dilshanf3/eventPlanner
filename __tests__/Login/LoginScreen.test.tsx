import React from 'react';
import {render} from '@testing-library/react-native';
import LoginScreen from '../../src/screens/Auth/LoginScreen/LoginScreen';

// Mock the useLoginScreen hook to provide necessary props for the component
jest.mock('../../src/screens/Auth/LoginScreen/useLoginScreen', () => {
  return jest.fn(() => ({
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
    isSignUp: false,
    loading: false,
    errorMessage: '',
    setEmail: jest.fn(),
    setPassword: jest.fn(),
    setConfirmPassword: jest.fn(),
    toggleShowPassword: jest.fn(),
    toggleShowConfirmPassword: jest.fn(),
    handleSignUpToggle: jest.fn(),
    handleLoginToggle: jest.fn(),
    handleSignUp: jest.fn(),
    handleLogin: jest.fn(),
  }));
});

describe('<LoginScreen />', () => {
  it('renders correctly', () => {
    const {toJSON} = render(<LoginScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
});
