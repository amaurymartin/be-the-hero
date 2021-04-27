import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  incident: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#FFF',
    marginTop: 48,
    marginBottom: 16,
  },

  incidentProperty: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#41414D',
    marginTop: 24,
  },

  incidentValue: {
    fontSize: 15,
    color: '#737380',
    marginTop: 8,
  },

  contact: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#FFF',
    marginTop: 48,
    marginBottom: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'#13131A',
    lineHeight: 30,
  },

  description: {
    fontSize: 15,
    color:'#737380',
    marginTop: 16,
  },

  actions: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  action: {
    backgroundColor: '#E02041',
    borderRadius: 8,
    height: 50,
    width: '42%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  actionText: {
    fontSize: 15,
    fontWeight: 'bold',
    color:'#FFF',
  },
});
