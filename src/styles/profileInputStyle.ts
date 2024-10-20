import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: '#444749',
    marginBottom: 5,
    marginTop: 10,
    fontFamily:'Noto Sans',
    marginLeft:10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  inputDisabled: {
    backgroundColor: '#DA5E4214',
    borderColor: '#D3D3D3',
  },
  inputEnabled: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D36F56',
  },
});

export default styles;
