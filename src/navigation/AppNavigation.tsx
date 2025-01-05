import React from 'react';
import { NavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
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
  SettingScreen,
  AccountSetting,
  Address,
  Wallet,
  ShareProfile,
  Notification,
  HelpAndSupport,
  AddTaskScreen,
  CompleteTasks,
  PatientSetLocationScreen,
  PatientLocationSetupScreen,
  SingleChatScreen,
  PatientAccountSettingsScreen,
  MedicalHistoryScreen,
  PatientDetail,
  PatientCreditCardsScreen
} from '@src/screens';
import { NavStackParams, Screen } from './appNavigation.type';
import TabNavigator from './TabNavigation';
import TabNurseNavigator from './TabNueseNavigation';

export const navigationRef = React.createRef<NavigationContainerRef<NavStackParams>>();

const Stack = createNativeStackNavigator<NavStackParams>();

const screenOptions: NativeStackNavigationOptions = {
  animation: 'slide_from_right',
  headerShown: false,
};

export const AppNavigation = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name={Screen.MAIN_SCREEN} component={MainScreen} />
      <Stack.Screen name={Screen.NURSE_HOME} component={TabNurseNavigator} />
      <Stack.Screen name={Screen.UPLOAD_DOCUMENTS} component={UploadDocuments} />
      <Stack.Screen name={Screen.SELFI_SCREEN} component={SelfiScreen} />
      <Stack.Screen name={Screen.UPLOAD_ID} component={UploadId} />
      <Stack.Screen name={Screen.HOME} component={TabNavigator} />
      <Stack.Screen name={Screen.PATIENT_LOCATION_SETUP} component={PatientLocationSetupScreen} />
      <Stack.Screen name={Screen.PATIENT_SET_LOCATION} component={PatientSetLocationScreen} />
      <Stack.Screen name={Screen.LOGIN} component={LoginScreen} />
      <Stack.Screen name={Screen.SIGNUP} component={SignUp} />
      <Stack.Screen name={Screen.FORGOT_PASSWORD} component={ForgotPassword} />
      <Stack.Screen name={Screen.VERIFICATION_CODE} component={VerificationCode} />
      <Stack.Screen name={Screen.RESET_PASSWORD} component={ResetPassword} />
      <Stack.Screen name={Screen.SINGLE_CHAT} component={SingleChatScreen} />
      <Stack.Screen name={Screen.ACCOUNT_SETTING} component={AccountSetting} />
      <Stack.Screen name={Screen.PATIENT_ACCOUNT_SETTINGS} component={PatientAccountSettingsScreen} />
      <Stack.Screen name={Screen.ADDRESS} component={Address} />
      <Stack.Screen name={Screen.WALLET} component={Wallet} />
      <Stack.Screen name={Screen.MEDICAL_HISTORY} component={MedicalHistoryScreen} />
      <Stack.Screen name={Screen.SHARE_PROFILE} component={ShareProfile} />
      <Stack.Screen name={Screen.SETTING} component={SettingScreen} />
      <Stack.Screen name={Screen.NOTIFICATION} component={Notification} />
      <Stack.Screen name={Screen.HELP_AND_SUPPORT} component={HelpAndSupport} />
      <Stack.Screen name={Screen.ADD_TASK_LIST} component={AddTaskScreen} />
      <Stack.Screen name={Screen.COMPLETE_TASKS} component={CompleteTasks} />
      <Stack.Screen name={Screen.PATIENT_DETAIL} component={PatientDetail} />
      <Stack.Screen name={Screen.PATIENT_CREDIT_CARD} component={PatientCreditCardsScreen} />



      {__DEV__ && (
        <Stack.Screen
          name={Screen.NETWORK_CHECK}
          component={NetworkLoggerScreen}
        />
      )}
    </Stack.Navigator>
  );
};
