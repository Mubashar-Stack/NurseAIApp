import React, { createRef } from 'react';

import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';
import { View, Text } from 'react-native';
import { scaledSize } from './dimensions';
import { IndicatorRef } from '../../blueprints/Indicator/Indicator';

interface ToastData {
  text1: string;
  topOffset: number;
  type: 'Success' | 'error'; // Assuming 'type' can only be 'Success' or 'error'
  position: 'top';
  isVisible: boolean;
  visibilityTime: number;
}

export const toastConfig = {
  Success: (props: any) => (
    <View style={{ borderRadius: 15, zIndex: 9999, shadowOffset: { width: -2, height: 4 }, shadowColor: '#ffffff', shadowOpacity: 0.5, shadowRadius: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', width: '90%', alignSelf: 'center', paddingHorizontal: 15, paddingVertical: 14, borderWidth: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', width: '85%' }}>
        <View style={{ height: 9, width: 9, borderRadius: 10, backgroundColor: 'white' }}></View>
        <View style={{ paddingLeft: 12, width: '98%', flexDirection: 'row', flexWrap: 'wrap' }}>
          <Text style={{ fontSize: 14, color: 'black', fontFamily: 'Montserrat-Medium' }}>{props.text1}</Text>
        </View>
      </View>
    </View>
  ), error: (props: any) => (
    <View style={{ borderRadius: 15, shadowOffset: { width: -2, height: 4 }, shadowColor: '#ffffff', shadowOpacity: 0.5, shadowRadius: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', width: '90%', alignSelf: 'center', paddingHorizontal: 15, paddingVertical: 14, borderWidth: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', width: '85%' }}>
        <View style={{ height: 9, width: 9, borderRadius: 10, backgroundColor: 'red' }}></View>
        <View style={{ paddingLeft: 12, width: '98%', flexDirection: 'row', flexWrap: 'wrap' }}>
          <Text style={{ fontSize: 14, color: 'black', fontFamily: 'Montserrat-Medium' }}>{props.text1}</Text>
        </View>
      </View>
    </View>
  )
};

export function showSuccessToast(text: string, duration: number): void {
  const data: ToastData = {
    text1: text,
    topOffset: 50,
    type: 'Success',
    position: 'top',
    isVisible: true,
    visibilityTime: duration,
  };
  Toast.show(data);
}

export function showErrorToast(text: string, duration: number): void {
  const data: ToastData = {
    text1: text,
    topOffset: 50,
    type: 'error',
    position: 'top',
    isVisible: true,
    visibilityTime: duration,
  };
  Toast.show(data);
}

export const isNetworkConnected = async () => {
  const state = await NetInfo.refresh();
  return state.isConnected || false;
};

export function isEmpty(obj: object) {
  return Object.keys(obj).length === 0;
}

export const logger = (...args: any) => {
  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
};

export const scaled = (value: number) => {
  return {
    height: scaledSize(value),
    width: scaledSize(value),
  };
};

export function boxShadow(
  color: string,
  offset = { height: 2, width: 2 },
  radius = 8,
  opacity = 0.2
) {
  return {
    elevation: radius,
    shadowColor: color,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
  };
}

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve as () => void, ms));
}

export const loader = createRef<IndicatorRef>();
