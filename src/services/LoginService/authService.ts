import auth from '@react-native-firebase/auth';

/**
 * Signs up a user with the provided email and password.
 * @param email - User's email.
 * @param password - User's password.
 * @returns A promise that resolves to the user credential.
 */
export const signUpWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  return await auth().createUserWithEmailAndPassword(email, password);
};

/**
 * Logs in a user with the provided email and password.
 * @param email - User's email.
 * @param password - User's password.
 * @returns A promise that resolves to the user credential.
 */
export const signInWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
 
  const result = await auth().signInWithEmailAndPassword(email, password);
  return result; // Return the result from the Firebase method
};
