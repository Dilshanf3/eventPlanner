import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderContainer: {
    width,
    height: 250,
    position: 'relative',
  },
  sliderImage: {
    width: '100%',
    height: '100%',
  },
  imageCount: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 5,
  },
  imageCountText: {
    fontSize: 12,
    color: '#000',
  },
  detailsContainer: {
    padding: 20,
  },
  eventName: {
    fontSize: 22,
    fontFamily: 'Inter',
    fontWeight: '600',
    color: '#191C1E',
    marginBottom: 5,
  },
  eventLocation: {
    fontSize: 14,
    color: '#757779',
    fontFamily: 'Noto Sans',
  },
  organizersContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#191C1E',
    fontFamily: 'Inter',
  },
  organizerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  organizerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  organizerTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  organizerName: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Noto Sans',
    color: '#191C1E',
  },
  organizerEmail: {
    fontSize: 12,
    color: '#757779',
  },
  chatIcon: {
    width: 20,
    height: 20,
    tintColor: '#1A1A1A',
  },
  photosContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  photosHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  allPhotosLink: {
    color: '#D36F56',
    fontSize: 14,
    fontWeight: '500',
  },
  imageCard: {
    marginRight: 10,
    width: width / 2.2,
  },
  photo: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  imageTitle: {
    fontSize: 12,
    marginTop: 5,
    color: '#6D6D6D',
  },
  postCountContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  postCountNumber: {
    fontSize: 22,
    color: '#D36F56',
    fontWeight: 'bold',
  },
  postCountLabel: {
    fontSize: 14,
    color: '#6D6D6D',
  },
});

export default styles;
