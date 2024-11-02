import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 10,
    color: '#191C1E',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#757779',
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDECE8',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    width: '48%',
    alignSelf: 'center',
  },
  backButtonText: {
    fontSize: 16,
    color: '#D36F56',
    marginLeft: 20,
    alignContent:'center'
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D36F56',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    width: '48%',
    alignSelf: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    color: '#fff',
    marginRight: 10,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

export default styles;
