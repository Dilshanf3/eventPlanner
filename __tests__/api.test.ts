import axiosInstance from '../src/services/axiosInstance';
import {
  fetchPosts,
  fetchComments,
  fetchOrganizers,
  fetchImages,
} from '../src/services/apiActions'; 
import MockAdapter from 'axios-mock-adapter';
import {Post, Comment} from '../src/types';

const mock = new MockAdapter(axiosInstance);

describe('API Functions', () => {
  afterEach(() => {
    mock.reset(); 
  });

  test('fetchPosts should return posts', async () => {
    const posts: Post[] = [
      {id: 1, title: 'Post 1', body: 'Content of post 1'},
      {id: 2, title: 'Post 2', body: 'Content of post 2'},
    ];

    mock.onGet('/posts').reply(200, posts);

    const result = await fetchPosts();
    expect(result).toEqual(posts);
  });

  test('fetchPosts should throw error on failure', async () => {
    mock.onGet('/posts').reply(500);

    await expect(fetchPosts()).rejects.toThrow(
      'Request failed with status code 500',
    );
  });

  test('fetchComments should return comments', async () => {
    const comments: Comment[] = [
      {
        postId: 1,
        id: 1,
        name: 'Commenter 1',
        email: 'commenter1@example.com',
        body: 'Content of comment 1',
      },
      {
        postId: 1,
        id: 2,
        name: 'Commenter 2',
        email: 'commenter2@example.com',
        body: 'Content of comment 2',
      },
    ];

    mock.onGet('/comments').reply(200, comments);

    const result = await fetchComments();
    expect(result).toEqual(comments);
  });

  test('fetchComments should throw error on failure', async () => {
    mock.onGet('/comments').reply(500);

    await expect(fetchComments()).rejects.toThrow(
      'Request failed with status code 500',
    );
  });

  test('fetchOrganizers should return the first 5 organizers', async () => {
    const organizers = [
      {id: 1, name: 'Organizer 1'},
      {id: 2, name: 'Organizer 2'},
      {id: 3, name: 'Organizer 3'},
      {id: 4, name: 'Organizer 4'},
      {id: 5, name: 'Organizer 5'},
      {id: 6, name: 'Organizer 6'},
    ];

    mock.onGet('/users').reply(200, organizers);

    const result = await fetchOrganizers();
    expect(result).toEqual(organizers.slice(0, 5));
  });

  test('fetchOrganizers should throw error on failure', async () => {
    mock.onGet('/users').reply(500);

    await expect(fetchOrganizers()).rejects.toThrow(
      'Request failed with status code 500',
    );
  });

  test('fetchImages should return the specified number of images', async () => {
    const images = [
      {id: 1, url: 'http://example.com/image1.jpg'},
      {id: 2, url: 'http://example.com/image2.jpg'},
      {id: 3, url: 'http://example.com/image3.jpg'},
      {id: 4, url: 'http://example.com/image4.jpg'},
      {id: 5, url: 'http://example.com/image5.jpg'},
    ];

    mock.onGet('/photos').reply(200, images);

    const result = await fetchImages(3);
    expect(result).toEqual(images.slice(0, 3));
  });

  test('fetchImages should throw error on failure', async () => {
    mock.onGet('/photos').reply(500);

    await expect(fetchImages(3)).rejects.toThrow(
      'Request failed with status code 500',
    );
  });
});
