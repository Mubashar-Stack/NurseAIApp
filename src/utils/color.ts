import { ColorSchemeName } from 'react-native';

export const color = {
  dark: {
    backgroundColor: '#212121', // light grey
    primaryColor: '#0a84ff', // bright blue
    secondaryColor: '#dcdcdc', // dark grey
    textColor: '#f8f9fa', // off-white
    Tertiary: '#E6E6E6', // input background color
    errorText: 'red'
  },
  light: {
    // backgroundColor: '#f8f9fa', // grey
    // primaryColor: '#000080', // blue
    // secondaryColor: '#6c757d', // off-white
    // textColor: '#343a40', // dark grey
    backgroundColor: '#f5f5f5', // grey screen background color
    primaryColor: '#000000', // blue button background color
    secondaryColor: '#ffffff', // off-white button text color
    textColor: '#000000', // dark grey
    Tertiary: '#E6E6E6', // input background color
    errorText: 'red'
  },
  theme1: {
    backgroundColor: '#f8f8f8', // light pink
    primaryColor: '#ff5a5f', // red
    secondaryColor: '#f2c9c9', // off-white
    textColor: '#424242', // dark grey
    Tertiary: '#E6E6E6', // input background color
    errorText: 'red'
  },
  theme2: {
    backgroundColor: '#e5e5e5', // wheat
    primaryColor: '#000080', // navy blue
    secondaryColor: '#f5deb3', // light grey
    textColor: '#333333', // dark grey
    Tertiary: '#E6E6E6', // input background color
    errorText: 'red'
  },
  theme3: {
    backgroundColor: '#f0f0f0', // light yellow
    primaryColor: '#800000', // maroon
    secondaryColor: '#ffffe0', // light grey
    textColor: '#2f4f4f', // dark slate grey
    Tertiary: '#E6E6E6', // input background color
    errorText: 'red'
  },
  theme4: {
    backgroundColor: '#f5f5f5', // misty rose
    primaryColor: '#663399', // rebecca purple
    secondaryColor: '#ffe4e1', // light grey
    textColor: '#333333', // dark grey
    Tertiary: '#E6E6E6', // input background color
    errorText: 'red'
  },
};

export type Palette = (typeof color)[keyof typeof color];

export type Theme = ColorSchemeName | keyof typeof color;
