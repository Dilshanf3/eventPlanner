import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  photoContainer: {
    alignSelf: 'center',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#F4E6E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
  },
  cameraIcon: {
    width: 40,
    height: 40,
    tintColor: '#D36F56',
    resizeMode: 'contain',
  },
});
export default styles;
