export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  profilePic: string | null; // Updated: can hold a base64 string or a URL or be null
}

export interface ProfileAction {
  type: string;
  payload: UserProfile | Partial<UserProfile>; // Allows partial updates, like only updating profilePic
}
