import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DA5E42',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: '80%',
    width: '100%',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    marginRight: 10,
    fontWeight: '500',
  },
  arrowIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#FFFFFF',
    
  },
});

export default styles;
