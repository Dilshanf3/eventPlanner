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

const PhotosScreen: React.FC = () => {
  const [images, setImages] = useState<
    {id: number; thumbnailUrl: string; title: string; url: string}[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const fetchedImages = await fetchImages(50); // Fetch images from the API
        console.log('Fetched Images:', fetchedImages);
        setImages(fetchedImages); // Set the state with fetched images
      } catch (err) {
        console.error('Error loading images:', err);
        setError('Failed to load images.'); // Set error state if fetching fails
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    loadImages(); // Call the loadImages function
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );
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

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={3}
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
