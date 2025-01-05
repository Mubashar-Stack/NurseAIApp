import { StyleSheet, Dimensions } from 'react-native';
import { Palette } from '@src/utils';
import { Fonts } from '@app/blueprints';

const { width } = Dimensions.get('window');

export const PatientSetLocationStyles = ({ textColor, Tertiary, backgroundColor = '#FFFFFF' }: Palette) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor,
    },
    searchContainer: {
      position: 'absolute',
      top: 16,
      left: 16,
      right: 16,
      zIndex: 1,
    },
    searchBar: {
      width: '99%',
      marginTop: 10,
      flexDirection: 'row',
      alignSelf: 'center',
      borderRadius: 16,
      backgroundColor: Tertiary,
      paddingHorizontal: 10,
      height: 52,
      alignItems: 'center', justifyContent: 'space-between'
    },
    searchInput: {
      fontSize: 14,
      fontWeight: '400',
      color: textColor,
      width: '90%',
      fontFamily: Fonts.Roboto_Light
    },
    mapContainer: {
      // flex: 1,
      height: 500,
      width: width,
      marginTop: 130
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 24,
      left: 16,
      right: 16,
    },
    setLocationButton: {
      backgroundColor: '#002A65',
      borderRadius: 8,
      paddingVertical: 16,
      alignItems: 'center',
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
    micButton: {
      padding: 10,
    },
    loadingContainer: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2,
    },
    permissionContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    permissionText: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 20,
      color: textColor,
    },
    permissionButton: {
      backgroundColor: '#000000',
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 24,
    },
    suggestionsContainer: {
      position: 'absolute',
      top: 80, // Below search bar
      left: 16,
      right: 16,
      backgroundColor: Tertiary,
      borderRadius: 8,
      maxHeight: 200,
      // elevation: 4,
      // shadowColor: '#000',
      // shadowOffset: { width: 0, height: 2 },
      // shadowOpacity: 0.25,
      // shadowRadius: 3.84,
      zIndex: 2,
    },
    suggestionItem: {
      padding: 9,
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
    },
    suggestionText: {
      color: textColor,
      fontSize: 16,
    },
    suggestionSubText: {
      color: '#666',
      fontSize: 14,
      marginTop: 2,
    },
    loadingIndicator: {
      padding: 15,
      alignItems: 'center',
    },
    currentLocationButton: {
      position: 'absolute',
      bottom: 16,
      right: 16,
      backgroundColor: 'white',
      borderRadius: 30,
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  });