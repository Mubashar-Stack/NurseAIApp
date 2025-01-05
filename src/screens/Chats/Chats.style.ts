import { StyleSheet } from 'react-native';
import { Palette } from '@src/utils';

export const ChatsStyles = ({ textColor, backgroundColor, Tertiary }: Palette) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: backgroundColor,
    },
    centerContent: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    searchContainer: {
      padding: 16,
      backgroundColor: backgroundColor,
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
      flex: 1,
      marginLeft: 8,
      color: textColor,
      fontSize: 16,
    },
    chatList: {
      flex: 1,
    },
    chatItem: {
      flexDirection: 'row',
      padding: 16,
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: Tertiary,
    },
    avatar: {
      width: 70,
      height: 70,
      borderRadius: 50,
      backgroundColor: '#E1E1E1',
      marginRight: 12,
    },
    chatInfo: {
      flex: 1,
    },
    chatHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },
    userName: {
      fontSize: 16,
      fontWeight: '600',
      color: textColor,
    },
    timestamp: {
      fontSize: 12,
      color: '#8E8E93',
    },
    messagePreview: {
      fontSize: 14,
      color: '#8E8E93',
      marginRight: 8,
    },
    unreadContainer: {
      minWidth: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: '#BE0B31',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 6,
      marginTop: 20,
      marginRight: 20,
      position: 'absolute',
      right: 0,
      top: 30,
    },
    unreadCount: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: '600',
    },
  });

