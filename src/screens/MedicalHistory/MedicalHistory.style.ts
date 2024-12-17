import { StyleSheet } from 'react-native';
import { Palette } from '@src/utils';

export const MedicalHistoryStyles = ({ textColor, backgroundColor, Tertiary }: Palette) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: backgroundColor,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      backgroundColor: backgroundColor,
    },
    backButton: {
      marginRight: 12,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      color: textColor,
    },
    content: {
      flex: 1,
      padding: 16,
    },
    textInput: {
      height: 160,
      backgroundColor: Tertiary,
      borderRadius: 12,
      padding: 16,
      color: textColor,
      textAlignVertical: 'top',
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: textColor,
      marginTop: 24,
      marginBottom: 12,
    },
    uploadContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderStyle: 'dashed',
      borderColor: '#000',
      borderRadius: 12,
      padding: 40,
    },
    uploadContainerSuccess: {
      borderColor: '#4CAF50',
      borderStyle: 'solid',
    },
    uploadIcon: {
      marginRight: 12,
    },
    uploadText: {
      fontSize: 14,
      color: textColor,
      marginLeft: 12,
    },
    saveButton: {
      backgroundColor: '#000000',
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      marginHorizontal: 16,
      marginBottom: 16,
    },
    saveButtonDisabled: {
      opacity: 0.5,
    },
    saveButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
  });

