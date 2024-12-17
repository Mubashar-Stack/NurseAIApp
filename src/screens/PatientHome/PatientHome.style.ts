import { StyleSheet } from 'react-native';
import { Palette } from '@src/utils';

export const PatientHomeStyles = ({ textColor }: Palette) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    locationText: {
      color: textColor,
      fontSize: 14,
    },
    buttonContainer: {
      flexDirection: 'row',
      paddingHorizontal: 16,
      paddingVertical: 20,
      gap: 8,
    },
    button: {
      flex: 1,
      padding: 14,
      borderRadius: 8,
      alignItems: 'center',
    },
    primaryButton: {
      backgroundColor: '#000',
    },
    secondaryButton: {
      backgroundColor: '#666',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '500',
    },
    welcomeSection: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: '#eee',
    },
    welcomeTitle: {
      fontSize: 20,
      fontWeight: '600',
      marginBottom: 4,
      color: textColor,
    },
    userName: {
      fontSize: 14,
      color: textColor,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      paddingHorizontal: 16,
      paddingVertical: 20,
      color: textColor,
    },
    updateCard: {
      backgroundColor: '#f5f5f5',
      padding: 16,
      marginLeft: 16,
      marginRight: 8,
      borderRadius: 16,
      width: 260,
    },
    updateDiscount: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 8,
    },
    updateDescription: {
      fontSize: 14,
      marginBottom: 12,
    },
    readMoreButton: {
      backgroundColor: '#000',
      padding: 8,
      borderRadius: 6,
      alignSelf: 'flex-start',
    },
    readMoreText: {
      color: '#fff',
      fontSize: 12,
    },
    hospitalCard: {
      backgroundColor: '#f5f5f5',
      padding: 16,
      marginHorizontal: 16,
      marginBottom: 12,
      borderRadius: 16,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    hospitalImage: {
      width: 88,
      height: 88,
      borderRadius: 12,
      backgroundColor: '#ddd',
    },
    hospitalInfo: {
      flex: 1,
    },
    hospitalName: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 4,
    },
    hospitalDistance: {
      fontSize: 14,
      color: '#666',
      marginBottom: 8,
    },
    ratingContainer: {
      flexDirection: 'row',
      gap: 4,
    },
    bookButton: {
      backgroundColor: '#000',
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 6,
      marginTop: 8,
    },
    bookButtonText: {
      color: '#fff',
      fontSize: 12,
    },
    paginationDots: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingVertical: 16,
      gap: 6,
    },
    dot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: '#ddd',
    },
    activeDot: {
      backgroundColor: '#000',
      width: 20,
    },

  });