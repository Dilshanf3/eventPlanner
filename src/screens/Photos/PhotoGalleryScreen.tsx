import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Image,
  ActivityIndicator,
  Text,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {fetchImages} from '../../services/apiActions';
import styles from './Styles/PhotoGalleryStyles';
import {Strings} from '../../constants/strings';
import LoadingSpinner from '../../component/Spinner/LoadingSpinner';
import Spinner from 'react-native-loading-spinner-overlay';

const PhotosScreen: React.FC = () => {
  const [images, setImages] = useState<
    {id: number; thumbnailUrl: string; title: string; url: string}[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [page, setPage] = useState(1); // Track current page
  const [hasMore, setHasMore] = useState(true); // Track if more images are available

  useEffect(() => {
    const loadImages = async () => {
      if (!hasMore) {
        return;
      } // Do not load if there are no more images

      setLoading(true);
      try {
        const fetchedImages = await fetchImages(50, page); // Fetch images from the API with pagination
        if (fetchedImages.length > 0) {
          setImages(prevImages => [...prevImages, ...fetchedImages]); // Append new images to the existing array
        } else {
          setHasMore(false); // No more images to load
        }
      } catch (err) {
        console.error('Error loading images:', err);
        setError('Failed to load images.'); // Set error state if fetching fails
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    loadImages(); // Call the loadImages function
  }, [page]); // Add page as a dependency

  if (loading && images.length === 0) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const renderItem = ({
    item,
  }: {
    item: {id: number; thumbnailUrl: string; title: string; url: string};
  }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedImage(item.url);
        setModalVisible(true);
      }}>
      <View style={styles.imageContainer}>
        <Image source={{uri: item.thumbnailUrl}} style={styles.image} />
        <Text style={styles.imageTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  // Load more images when the user scrolls to the end of the list
  const loadMoreImages = () => {
    if (!loading && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={3}
        onEndReached={loadMoreImages} // Trigger loadMoreImages when scrolled to end
        onEndReachedThreshold={0.5} // How close to the bottom of the list before loading more
        ListFooterComponent={loading ? <LoadingSpinner /> : null} // Show loading indicator at the bottom
      />

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>{Strings.close}</Text>
          </TouchableOpacity>
          <Image source={{uri: selectedImage}} style={styles.fullImage} />
        </View>
      </Modal>
    </View>
  );
};

export default PhotosScreen;
