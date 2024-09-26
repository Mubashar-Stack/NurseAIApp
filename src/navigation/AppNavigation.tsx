import React from 'react';
import { NavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import {
  ForgotPassword,
  LoginScreen,
  NetworkLoggerScreen,
  NewsDetailScreen,
  NewsListScreen,
  ResetPassword,
  SettingScreen,
  SignUp,
  UploadId,
  VerificationCode,
} from '@src/screens';
import { isForceUpdate } from '@src/store';
import { NavStackParams, Screen } from './appNavigation.type';
import { ForUpdateStack } from './ForceupdateStack';

export const navigationRef = React.createRef<NavigationContainerRef<NavStackParams>>();

const Stack = createNativeStackNavigator<NavStackParams>();

const screenOptions: NativeStackNavigationOptions = {
  animation: 'slide_from_right',
  headerShown: false,
};

export const AppNavigation = () => {
  const isForceUpdateApp = useSelector(isForceUpdate);

  return (
    <>
      {isForceUpdateApp ? (
        <ForUpdateStack />
      ) : (
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen name={Screen.NEWS_LIST} component={NewsListScreen} />
          <Stack.Screen name={Screen.NEWS_DETAIL} component={NewsDetailScreen} />
          <Stack.Screen name={Screen.SETTING} component={SettingScreen} />
          <Stack.Screen name={Screen.LOGIN} component={LoginScreen} />
          <Stack.Screen name={Screen.SIGNUP} component={SignUp} />
          <Stack.Screen name={Screen.UPLOAD_ID} component={UploadId} />
          <Stack.Screen name={Screen.FORGOT_PASSWORD} component={ForgotPassword} />
          <Stack.Screen name={Screen.VERIFICATION_CODE} component={VerificationCode} />
          <Stack.Screen name={Screen.RESET_PASSWORD} component={ResetPassword} />
          {__DEV__ && (
            <Stack.Screen
              name={Screen.NETWORK_CHECK}
              component={NetworkLoggerScreen}
            />
          )}
        </Stack.Navigator>
      )}
    </>
  );
};
