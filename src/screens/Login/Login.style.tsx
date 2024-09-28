import { StyleSheet } from 'react-native';
import { Palette, scaled, scaleHeight, scaleWidth } from '@src/utils';

export const loginStyles = ({ primaryColor, textColor }: Palette) =>
  StyleSheet.create({
    btn: {
      marginTop: scaleHeight(30),
    },
    content: {
      flex: 1,
      paddingHorizontal: scaleWidth(25),
    },
    header: {
      justifyContent: 'center',
    },
    radio: {
      ...scaled(20),
      alignItems: 'center',
      borderRadius: 10,
      borderWidth: 1,
      justifyContent: 'center',
    },
    selectedRadio: {
      ...scaled(10),
      backgroundColor: primaryColor,
      borderRadius: 10,
    },
    themes: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: scaleHeight(5),
    },
    headerText: {
      color: textColor,
      fontSize: 22,
    },
    container: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
    fieldContainer: {
      marginTop: 20,
    },
    input: {
      marginVertical: scaleHeight(10),
    },
    loginBtn: {
      marginTop: scaleHeight(15),
      textAlign: 'center'
    },
  });