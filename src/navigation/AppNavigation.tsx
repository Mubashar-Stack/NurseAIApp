import React from 'react';
import { NavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import {
  ForgotPassword,
  LoginScreen,
  NetworkLoggerScreen,
  MainScreen,
  ResetPassword,
  SignUp,
  UploadId,
  VerificationCode,
  SelfiScreen,
  UploadDocuments,
} from '@src/screens';
import { isForceUpdate } from '@src/store';
import { NavStackParams, Screen } from './appNavigation.type';
import { ForUpdateStack } from './ForceupdateStack';
import TabNavigator from './TabNavigation';

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
          <Stack.Screen name={Screen.MAIN_SCREEN} component={MainScreen} />
          <Stack.Screen name={Screen.LOGIN} component={LoginScreen} />
          <Stack.Screen name={Screen.SIGNUP} component={SignUp} />
          <Stack.Screen name={Screen.UPLOAD_ID} component={UploadId} />
          <Stack.Screen name={Screen.FORGOT_PASSWORD} component={ForgotPassword} />
          <Stack.Screen name={Screen.VERIFICATION_CODE} component={VerificationCode} />
          <Stack.Screen name={Screen.RESET_PASSWORD} component={ResetPassword} />
          <Stack.Screen name={Screen.SELFI_SCREEN} component={SelfiScreen} />
          <Stack.Screen name={Screen.UPLOAD_DOCUMENTS} component={UploadDocuments} />
          <Stack.Screen name={Screen.HOME} component={TabNavigator} />
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
