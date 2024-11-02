import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#444749',
    marginBottom: 5,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DA5E4214',
    borderRadius: 5,
    paddingHorizontal: 5,
    textAlign: 'left',
  },
  iconLeft: {
    paddingLeft: 10,
  },
  iconRight: {
    paddingRight: 10,
  },
  icon: {
    marginHorizontal: 5,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 2,
    fontSize: 16,
    color: '#444749',
   
  },
  bottomLine: {
    height: 1,
    backgroundColor: '#444749',
    marginTop: -5,
  },
  toggleIcon: {
    position: 'absolute',
    right: 10,
    padding: 5,
  },
});

export default styles;
