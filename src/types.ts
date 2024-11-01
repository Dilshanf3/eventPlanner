// src/types.ts

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
  EventScreen: undefined;
  PostsAndComments: undefined;
  PhotosScreen: undefined;
  // Add other screens as needed
};
