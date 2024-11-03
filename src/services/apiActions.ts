// src/api.ts

import axiosInstance from './axiosInstance';
import {Post, Comment} from '../types'; // Adjust the path if necessary

// Function to fetch posts
export const fetchPosts = async (): Promise<Post[]> => {
  try {
    const response = await axiosInstance.get<Post[]>('/posts');
    return response.data; // Return all posts
  } catch (error) {
    throw error;
  }
};

// Function to fetch comments
export const fetchComments = async (): Promise<Comment[]> => {
  try {
    const response = await axiosInstance.get<Comment[]>('/comments');
    return response.data; // Return all comments
  } catch (error) {
    throw error;
  }
};

// Function to fetch event organizers
export const fetchOrganizers = async () => {
  try {
    const response = await axiosInstance.get('/users');

    return response.data.slice(0, 5); // Return the first 5 organizers
  } catch (error) {
    throw error;
  }
};

// Function to fetch images
export const fetchImages = async itemCount => {
  try {
    const response = await axiosInstance.get('/photos');
    return response.data.slice(0, itemCount); // Return the first 10 images
  } catch (error) {
    throw error;
  }
};
