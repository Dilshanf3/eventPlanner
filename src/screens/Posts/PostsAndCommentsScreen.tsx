// src/screens/PostsAndComments.tsx

import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import {fetchPosts, fetchComments} from '../../services/apiActions';
import {Post, Comment} from '../../types';
import styles from './Styles/PostsAndCommentsStyles';
import {Strings} from '../../constants/strings';
import LoadingSpinner from '../../component/Spinner/LoadingSpinner';

const PostsAndComments: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostsAndComments = async () => {
      try {
        const postsData = await fetchPosts(); // Fetch posts
        setPosts(postsData);

        const commentsData = await fetchComments(); // Fetch comments
        setComments(commentsData);

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchPostsAndComments();
  }, []);

  const renderPost = ({item}: {item: Post}) => {
    const postComments = comments.filter(comment => comment.postId === item.id);

    return (
      <View style={styles.postContainer}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postBody}>{item.body}</Text>
        {postComments.length > 0 && (
          <View style={styles.commentsContainer}>
            <Text style={styles.commentsTitle}>{Strings.comments}</Text>
            {postComments.map(comment => (
              <View key={comment.id} style={styles.commentItem}>
                <Text style={styles.commentName}>{comment.name}</Text>
                <Text style={styles.commentBody}>{comment.body}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default PostsAndComments;
