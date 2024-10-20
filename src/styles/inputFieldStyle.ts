import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 10,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DA5E4214',
    borderRadius: 5,
    height: 50,
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    paddingVertical: 0,
    fontSize: 16,
    color: '#191C1E',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 4,
    marginLeft: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1A1A1A',
    marginBottom: 5,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: 5,
  },
});

export default styles;
