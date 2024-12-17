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
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Tertiary,
      borderRadius: 8,
      paddingHorizontal: 16,
      height: 48,
      marginBottom: 16,
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
      width: 48,
      height: 48,
      borderRadius: 24,
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
      backgroundColor: '#000000',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 6,
      marginTop: 10,
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

