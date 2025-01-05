import { StyleSheet, Dimensions } from 'react-native';
import { Palette, scaleHeight } from '@src/utils';

export const HomeStyles = ({ textColor }: Palette) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F8F9FA',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 16,
      backgroundColor: '#fff',
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginVertical: 10
    },
    locationIcon: {
      width: 34,
      height: 34,
    },
    locationText: {
      fontSize: 14,
      color: '#000',
      fontWeight: '400',
    },
    notificationContainer: {
      position: 'relative',
    },
    notificationDot: {
      position: 'absolute',
      top: -2,
      right: -2,
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#C8102E',
      borderWidth: 1.5,
      borderColor: '#fff',
    },
    buttonContainer: {
      flexDirection: 'row',
      paddingHorizontal: 16,
      paddingVertical: 16,
      gap: 12,
      backgroundColor: '#fff',
    },
    button: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    primaryButton: {
      backgroundColor: '#002B49',
    },
    secondaryButton: {
      backgroundColor: '#4B4B4B',
    },
    buttonText: {
      color: '#fff',
      fontSize: 14,
      fontWeight: '500',
    },
    welcomeSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      padding: 16,
      backgroundColor: '#fff',
    },
    avatar: {
      width: 70,
      height: 70,
      borderRadius: 50,
    },
    welcomeInfo: {
      gap: 4,
    },
    welcomeTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: '#000',
    },
    userName: {
      fontSize: 14,
      color: '#666',
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: '#000',
      paddingHorizontal: 16,
      paddingVertical: 16,
      backgroundColor: '#fff',
    },
    updateCard: {
      width: 350,
      marginLeft: 16,
      borderRadius: 12,
      overflow: 'hidden',
      backgroundColor: '#F0F0F0',
      flexDirection: 'row'
    },
    updateImage: {
      width: 160,
      height: 170,
      backgroundColor: '#F0F0F0',
      marginRight: 8
    },
    updateContent: {
      padding: 10,
      marginTop: 20
    },
    discountText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#C8102E',
      marginBottom: 4,
    },
    updateDescription: {
      fontSize: 14,
      color: '#666',
      marginBottom: 12,
      maxWidth: 192
    },
    readMoreButton: {
      backgroundColor: '#002B49',
      paddingVertical: 5,
      paddingHorizontal: 16,
      borderRadius: 4,
      alignSelf: 'flex-start',
    },
    readMoreText: {
      color: '#fff',
      fontSize: 12,
      fontWeight: '500',
    },
    paginationContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 6,
      paddingVertical: 16,
      backgroundColor: '#fff',
    },
    paginationDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#D9D9D9',
    },
    activePaginationDot: {
      width: 24,
      backgroundColor: '#002B49',
    },
    hospitalCard: {
      flexDirection: 'row',
      padding: 16,
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderBottomColor: '#F0F0F0',
    },
    hospitalImage: {
      width: 88,
      height: 88,
      borderRadius: 12,
      marginRight: 16,
    },
    hospitalInfo: {
      flex: 1,
      justifyContent: 'space-between',
    },
    hospitalName: {
      fontSize: 16,
      fontWeight: '600',
      color: '#000',
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
      marginBottom: 4,
    },
    bookButton: {
      backgroundColor: '#002B49',
      paddingVertical: 5,
      paddingHorizontal: 20,
      borderRadius: 4,
      alignSelf: 'flex-start',
    },
    bookButtonText: {
      color: '#fff',
      fontSize: 14,
      fontWeight: '500',
    },
    favoriteButton: {
      marginLeft: 'auto',
    },
    bottomNav: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 12,
      backgroundColor: '#fff',
      borderTopWidth: 1,
      borderTopColor: '#E5E7EB',
    },
    navItem: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    horizontalScroll: {
      paddingHorizontal: scaleHeight(18),
      height: scaleHeight(150),
      backgroundColor: '#fff',
    },
    videoThumbnail: {
      width: 200,
      // marginRight: 16,
      marginLeft: 16,
    },
    videoImage: {
      width: 200,
      height: 112,
      borderRadius: 8,
    },
    playIconOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      borderRadius: 8,
    },
    videoTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: '#fff',
      marginTop: 8,
    },
    checkinCard: {
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 16,
      marginRight: 16,
      width: 200,
      alignItems: 'center',
    },
    checkinLocation: {
      fontSize: 14,
      fontWeight: '600',
      color: '#000',
      marginTop: 8,
    },
    checkinDate: {
      fontSize: 12,
      color: '#666',
      marginTop: 4,
    },
  });

