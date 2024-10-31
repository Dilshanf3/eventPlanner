import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DA5E42',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 20,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginRight: 10,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },

  disabledButton: {
    backgroundColor: '#d3d3d3',
  },
});

export default styles;
