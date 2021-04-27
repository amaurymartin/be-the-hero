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

  headerText: {
    fontSize: 15,
    color: '#737380',
  },

  headerTextBold: {
    fontWeight: 'bold',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#13131A',
    marginTop: 48,
    marginBottom: 16,
  },

  description: {
    fontSize: 16,
    color: '#737380',
    lineHeight: 24,
  },

  incidents: {
    marginTop: 32,
  },

  incident: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#FFF',
    marginBottom: 10,
  },

  incidentProperty: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#41414D',
  },

  incidentValue: {
    fontSize: 15,
    color: '#737380',
    marginTop: 8,
    marginBottom: 24,
  },

  showIncidentButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  showIncidentButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#E02041',
  },
});
