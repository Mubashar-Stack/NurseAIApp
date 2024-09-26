// import { StyleSheet } from 'react-native';

// import { Palette, scaledSize, scaleHeight, scaleWidth } from '@src/utils';

// export const loginStyles = ({ backgroundColor, secondaryColor }: Palette) =>
//   StyleSheet.create({
//     container: {
//       alignItems: 'center',
//       flex: 1,
//       justifyContent: 'center',
//     },
//     content: {
//       backgroundColor: backgroundColor,
//       borderRadius: scaledSize(30),
//       flex: 2,
//       paddingHorizontal: scaleWidth(15),
//       paddingTop: scaleHeight(25),
//       top: -scaleHeight(25),
//     },
//     fieldContainer: {},
//     header: {
//       backgroundColor: secondaryColor,
//       flex: 1,
//     },
//     input: {
//       marginVertical: scaleHeight(10),
//     },
//     loginBtn: {
//       marginTop: scaleHeight(15),
//     },
//   });

import { StyleSheet } from 'react-native';

import { Palette, scaled, scaleHeight, scaleWidth } from '@src/utils';

export const loginStyles = ({ primaryColor, textColor }: Palette) =>
  StyleSheet.create({
    btn: {
      marginTop: scaleHeight(30),
    },
    content: {
      flex:1,
      // marginTop: scaleHeight(25),
      paddingHorizontal: scaleWidth(25),
    },
    header: {
      // alignItems: 'center',
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
    // content: {
    //   backgroundColor: backgroundColor,
    //   borderRadius: scaledSize(30),
    //   flex: 2,
    //   paddingHorizontal: scaleWidth(15),
    //   paddingTop: scaleHeight(25),
    //   top: -scaleHeight(25),
    // },
    fieldContainer: {
      marginTop: 20,
    },
    // header: {
    //   backgroundColor: secondaryColor,
    //   flex: 1,
    // },
    input: {
      marginVertical: scaleHeight(10),
    },
    loginBtn: {
      marginTop: scaleHeight(15),
      textAlign: 'center'
    },
  });
