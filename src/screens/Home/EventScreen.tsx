import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './Styles/EventScreenStyles';
import {Strings} from '../../constants/strings';
import {
  fetchOrganizers,
  fetchImages,
  fetchPosts,
} from '../../services/apiActions';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types';
import LoadingSpinner from '../../component/Spinner/LoadingSpinner';
interface Organizer {
  id: string;
  name: string;
  email: string;
}

interface ImageItem {
  id: string;
  url: string;
  title: string;
}
interface Post {
  id: string;
}
type EventScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'EventScreen'
>;

const EventScreen: React.FC = () => {
  const navigation = useNavigation<EventScreenNavigationProp>();
  const [organizers, setOrganizers] = useState<Organizer[]>([]);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [posts, setPosts] = useState<Post[]>([]); // Ensure Post interface aligns with incoming data
  const [loading, setLoading] = useState(true);

  // Fetch the organizers, images, and posts from the APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const organizersData = await fetchOrganizers();
        const imagesData = await fetchImages(10);
        const postsData = await fetchPosts(); // Fetch posts
        setOrganizers(organizersData);
        setImages(imagesData);
        setPosts(postsData); // Update posts state
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Render a single organizer
  const renderOrganizer = ({item}: {item: Organizer}) => (
    <View style={styles.organizerContainer}>
      <Image
        source={{uri: 'https://via.placeholder.com/40'}}
        style={styles.organizerImage}
      />
      <View style={styles.organizerTextContainer}>
        <Text style={styles.organizerName}>{item.name}</Text>
        <Text style={styles.organizerEmail}>{item.email}</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('PostsAndComments')}>
        <Image
          source={require('../../assets/images/chat.png')}
          style={styles.chatIcon}
        />
      </TouchableOpacity>
    </View>
  );

  // Render a single image in the horizontal list
  const renderImage = ({item}: {item: ImageItem}) => (
    <View style={styles.imageCard}>
      <Image source={{uri: item.url}} style={styles.photo} />
      <Text style={styles.imageTitle}>{item.title}</Text>
    </View>
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <ScrollView style={styles.container}>
      {/* Top Image Slider */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}>
        {images.map((image, index) => (
          <View key={index} style={styles.sliderContainer}>
            <Image source={{uri: image.url}} style={styles.sliderImage} />
            <View style={styles.imageCount}>
              <Text style={styles.imageCountText}>
                {index + 1} / {images.length}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Event Name */}
      <View style={styles.detailsContainer}>
        <Text style={styles.eventName}>{Strings.event_Name}</Text>
        <Text style={styles.eventLocation}>{Strings.event_location}</Text>
      </View>

      {/* Organizers Section */}
      <View style={styles.organizersContainer}>
        <Text style={styles.sectionTitle}>{Strings.organizers}</Text>
        <FlatList
          data={organizers}
          renderItem={renderOrganizer}
          keyExtractor={item => item.id}
        />
      </View>

      {/* Photos Section */}
      <View style={styles.photosContainer}>
        <View style={styles.photosHeader}>
          <Text style={styles.sectionTitle}>{Strings.photoes}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('PhotosScreen')}>
            <Text style={styles.allPhotosLink}>{Strings.all_Photos}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={images}
          renderItem={renderImage}
          horizontal
          keyExtractor={item => item.id}
        />
      </View>

      {/* Post Count Section at the Bottom */}
      <View style={styles.postCountContainer}>
        <TouchableOpacity
          style={styles.postCountContainer}
          onPress={() => navigation.navigate('PostsAndComments')} // Navigate to PostsAndComments
        >
          <Text style={styles.postCountNumber}>{posts.length}</Text>
          <Text style={styles.postCountLabel}>{Strings.posts}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EventScreen;
