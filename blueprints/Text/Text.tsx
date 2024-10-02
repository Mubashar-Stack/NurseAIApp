import React from 'react';
import {
  // eslint-disable-next-line no-restricted-imports
  Text as RNText,
  StyleProp,
  TextProps as TextProperties,
  TextStyle,
} from 'react-native';

import { useColor } from '@src/context';
import { scaledSize } from '@src/utils';

export enum Fonts {
  Roboto_Black = 'Roboto-Black',
  Roboto_BlackItalic = 'Roboto-BlackItalic',
  Roboto_Bold = 'Roboto-Bold',
  Roboto_BoldItalic = 'Roboto-BoldItalic',
  Roboto_Italic = 'Roboto-Italic',
  Roboto_Light = 'Roboto-Light',
  Roboto_LightItalic = 'Roboto-LightItalic',
  Roboto_Medium = 'Roboto-MediumItalic',
  Roboto_Regular = 'Roboto-Regular',
  Roboto_Thin = 'Roboto-Thin',
  Roboto_ThinItalic = 'Roboto-ThinItalic',
}

const BASE_TEXT: TextStyle = {
  fontSize: scaledSize(7),
};

export const presets = {
  default: BASE_TEXT,
  font400: {
    ...BASE_TEXT,
    //add your font normal for weight 400
    fontFamily: Fonts.Roboto_Regular,
  } as TextStyle,
  font500: {
    ...BASE_TEXT,
    //add your font medium for weight 500
    fontFamily: Fonts.Roboto_Regular,
  } as TextStyle,
  font600: {
    ...BASE_TEXT,
    //add your font semi-bold for weight 600
    fontFamily: Fonts.Roboto_Regular,
  } as TextStyle,
  font700: {
    ...BASE_TEXT,
    //add your font bold for weight 700
    fontFamily: Fonts.Roboto_Regular,
  } as TextStyle,
  h1: {
    ...BASE_TEXT,
    fontFamily: Fonts.Roboto_Regular,
    fontSize: scaledSize(20),
    fontWeight: '500',
  } as TextStyle,
  h2: {
    ...BASE_TEXT,
    fontFamily: Fonts.Roboto_Regular,
    fontSize: scaledSize(16),
    fontWeight: '400',
  } as TextStyle,
  h3: {
    ...BASE_TEXT,
    fontFamily: Fonts.Roboto_Black,
    fontSize: scaledSize(16),
    fontWeight: '300',
  } as TextStyle,
  h4: {
    ...BASE_TEXT,
    fontFamily: Fonts.Roboto_Regular,
    fontSize: scaledSize(16),
    fontWeight: '400',
  } as TextStyle,
  h5: {
    ...BASE_TEXT,
    fontFamily: Fonts.Roboto_Regular,
    fontSize: scaledSize(12),
    fontWeight: '300',
  } as TextStyle,
  h6: {
    ...BASE_TEXT,
    fontFamily: Fonts.Roboto_Regular,
    fontSize: scaledSize(9),
    fontWeight: '400',
  } as TextStyle,
  small: {
    ...BASE_TEXT,
    fontFamily: Fonts.Roboto_Regular,
    fontSize: scaledSize(6),
    fontWeight: '300',
  } as TextStyle,
  title: {
    ...BASE_TEXT,
    fontFamily: Fonts.Roboto_Regular,
    fontSize: scaledSize(13),
    fontWeight: '700',
  } as TextStyle,
};

export type TextPresets = keyof typeof presets;

export interface TextProps extends TextProperties {
  style?: StyleProp<TextStyle>;
  preset?: TextPresets;
  color?: string;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}

export const Text = ({ children, ...props }: TextProps) => {
  const {
    color,
    preset = 'default',
    style: styleOverride,
    textAlign = 'auto',
    ...rest
  } = props;

  const { color: palette } = useColor();

  return (
    <RNText
      {...rest}
      style={[
        presets[preset] as TextProps,
        { color: color ? color : palette.textColor, textAlign: textAlign },
        styleOverride,
      ]}>
      {children}
    </RNText>
  );
};
