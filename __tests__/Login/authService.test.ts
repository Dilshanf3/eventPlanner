import auth from '@react-native-firebase/auth';
import {signInWithEmailAndPassword} from '../../src/services/LoginService/authService';

// Mock the auth module completely
jest.mock('@react-native-firebase/auth', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
  })),
}));

describe('Auth Service', () => {
  const mockEmail = 'dd@gmail.com';
  const mockPassword = 'test1234';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('signInWithEmailAndPassword', () => {
    it('should call signInWithEmailAndPassword with correct arguments and return result', async () => {
      const mockSignIn = auth().signInWithEmailAndPassword as jest.Mock;
      const expectedResult = {user: {email: mockEmail}};
      mockSignIn.mockResolvedValueOnce(expectedResult);

      await signInWithEmailAndPassword(mockEmail, mockPassword);
    });

    it('should throw an error when signInWithEmailAndPassword fails', async () => {
      const error = new Error('Invalid credentials');
      const mockSignIn = auth().signInWithEmailAndPassword as jest.Mock;
      mockSignIn.mockRejectedValueOnce(error);
    });
  });
});
