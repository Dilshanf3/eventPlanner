// src/types.ts
import ScreenNames from './constants/screenNames';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export type RootStackParamList = {
  [ScreenNames.LOGIN]: undefined;
  [ScreenNames.DASHBOARD]: undefined;
  [ScreenNames.PROFILE_IMAGE]: undefined;

  [ScreenNames.PROFILE]: undefined;
  [ScreenNames.POSTS_AND_COMMENTS]: undefined;
  [ScreenNames.PHOTOS_SCREEN]: undefined;
  [ScreenNames.PERSONAL_INFO]: {
    profileImage: string | undefined;
    welcomeMessage: string;
  };
  EventScreen: undefined;
  PostsAndComments: undefined;
  PhotosScreen: undefined;
};
