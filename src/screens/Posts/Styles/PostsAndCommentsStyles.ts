import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  listContainer: {
    paddingBottom: 20,
  },
  postContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  postBody: {
    fontSize: 16,
    color: '#555',
    marginVertical: 10,
  },
  commentsContainer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 10,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  commentItem: {
    marginVertical: 5,
    paddingVertical: 5,
    paddingLeft: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#FFA500',
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  commentName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  commentBody: {
    fontSize: 14,
    color: '#555',
  },
  
});

export default styles;
