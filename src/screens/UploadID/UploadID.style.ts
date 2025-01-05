import { StyleSheet } from 'react-native';
import { Palette } from '@src/utils';

export const UploadIDStyles = ({ textColor, backgroundColor, primaryColor }: Palette) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: backgroundColor,
    },
    header: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: '600',
      marginLeft: 32,
      marginBottom: 10,

    },
    content: {
      flex: 1,
      padding: 16,
    },
    title: {
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 16,
    },
    uploadArea: {
      height: 400,
      backgroundColor: '#E5E5E5',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    uploadText: {
      fontSize: 16,
      marginTop: 12,
      textAlign: 'center',
    },
    description: {
      fontSize: 12,
      lineHeight: 20,
      color: '#666666',
      textAlign: 'left',

    },
    continueButton: {
      backgroundColor: primaryColor,
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 'auto',
      marginBottom: 16,
    },
    disabledButton: {
      backgroundColor: '#999999',
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '500',
    }
  });

