import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  profileEmail: {
    fontSize: 14,
    color: '#808080',
  },
  drawerItems: {
    flexGrow: 1,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
  versionText: {
    textAlign: 'center',
    color: '#808080',
    marginTop: 10,
  },
  logoutIcon: {
    width: 20, 
    height: 20, 
    marginRight: 10, 
  },
});

export default styles;
