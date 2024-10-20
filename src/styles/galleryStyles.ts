import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    flex: 1, // Ensure the container takes the full height
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  imageContainer: {
    alignItems: 'center', // Center the text below the image
    marginBottom: 10, // Space between images
  },
  image: {
    width: '100%', // Use full width of the container
    aspectRatio: 1, // Keep the aspect ratio for the images
  },
  imageTitle: {
    marginTop: 5,
    textAlign: 'center', // Center align the title
    fontSize: 12,
    color: '#333', // Dark gray color for the text
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent background
  },
  fullImage: {
    width: '90%', // Adjust width as needed
    height: '90%', // Adjust height as needed
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: 'black',
  },
});

export default styles;
