import { StyleSheet } from 'react-native';
import { Palette } from '@src/utils';

export const PatientProfileStyles = (color: Palette) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.backgroundColor,
    },
    header: {
      padding: 16,
    },
    profileSection: {
      flex: 1,
      alignItems: 'center',
      marginVertical: 24,
      flexDirection: 'row',
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: '#E5E5E5',
      marginBottom: 12,
      marginLeft: 20
    },
    profileInfo: {
      paddingHorizontal: 16,
      marginBottom: 15,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#E5E5E5',
    },
    menuItemText: {
      flex: 1,
      marginLeft: 12,
    },
    bottomNav: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: '#E5E5E5',
    },
    navItem: {
      alignItems: 'center',
    },
  });