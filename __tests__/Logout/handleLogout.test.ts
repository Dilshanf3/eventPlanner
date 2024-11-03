import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {handleLogout} from '../../src/services/LogoutService/Logout';
import {NavigationProp} from '@react-navigation/native';
import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';

// Mock dependencies
jest.mock('@react-native-firebase/auth', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    signOut: jest.fn(),
  })),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  clear: jest.fn(),
}));

describe('handleLogout', () => {
  const mockSignOut = jest.fn();
  const mockAuth = jest.fn(() => ({
    signOut: mockSignOut,
  }));

  // Override the default mock
  (auth as jest.Mock).mockImplementation(mockAuth);

  const mockNavigation = {} as NavigationProp<any>;

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  it('should call Firebase signOut and clear AsyncStorage on logout', async () => {
    const dispatch = jest.fn() as unknown as ThunkDispatch<{}, {}, AnyAction>; // Mock dispatch function

    // Call the handleLogout function
    await handleLogout(mockNavigation)(dispatch);

    // Assert
    expect(mockSignOut).toHaveBeenCalled();
    expect(AsyncStorage.clear).toHaveBeenCalled();
  });

  it('should handle errors during logout', async () => {
    const error = new Error('Logout failed');
    mockSignOut.mockRejectedValueOnce(error);

    const dispatch = jest.fn() as unknown as ThunkDispatch<{}, {}, AnyAction>; // Mock dispatch function

    // Call the handleLogout function
    await handleLogout(mockNavigation)(dispatch);

    // Assert
    expect(mockSignOut).toHaveBeenCalled();
    expect(AsyncStorage.clear).not.toHaveBeenCalled();
  });
});
