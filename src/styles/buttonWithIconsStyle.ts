import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    width: '48%',
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 16,
    marginRight: 10,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

export default styles;
