import { StyleSheet } from 'react-native';
import { Palette } from '@src/utils';
import { Fonts } from '@app/blueprints';

export const PatientLocationSetupStyles = (color: Palette) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.backgroundColor,
    },
    mainView: {
      flex: 1,
    },
    subView: {
      flex: 1,
      paddingHorizontal: 16,
      paddingVertical: 20,
    },
    inputContainer: {
      marginBottom: 16,
    },
    textView: {
      width: '99%',
      marginTop: 10,
      flexDirection: 'row',
      alignSelf: 'center',
      borderRadius: 16,
      backgroundColor: color.Tertiary,
      paddingHorizontal: 10,
      height: 52,
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    input: {
      fontSize: 14,
      fontWeight: '400',
      color: color.textColor,
      width: '90%',
      fontFamily: Fonts.Roboto_Light
    },
    errorText: {
      color: 'red',
      marginTop: 4,
      fontSize: 12,
    },
    saveButton: {
      backgroundColor: '#002A65',
      borderRadius: 8,
      height: 48,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 24,
    },
    saveButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
    sectionTitle: {
      marginTop: 24,
      marginBottom: 16,
    },
  });

