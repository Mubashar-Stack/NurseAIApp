import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { NewsResult } from '@src/services';

export enum Screen {
  FORCE_UPDATE_SCREEN = 'FORCE_UPDATE_SCREEN',
  NETWORK_CHECK = 'NETWORK_CHECK',
  MAIN_SCREEN = 'MAIN_SCREEN',
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP',
  UPLOAD_ID = 'UPLOAD_ID',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  VERIFICATION_CODE = 'VERIFICATION_CODE',
  RESET_PASSWORD = 'RESET_PASSWORD',
  SELFI_SCREEN = 'SELFI_SCREEN',
  UPLOAD_DOCUMENTS = 'UPLOAD_DOCUMENTS',
  HOME = 'HOME',
  PROFILE = 'PROFILE',
  MESSAGE = 'MESSAGE',
  ACCOUNT_SETTING = 'ACCOUNT_SETTING',
  ADDRESS = 'ADDRESS',
  WALLET = 'WALLET',
  SHARE_PROFILE = 'SHARE_PROFILE',
  SETTING = 'SETTING',
  NOTIFICATION = 'NOTIFICATION',
  HELP_AND_SUPPORT = 'HELP_AND_SUPPORT',
  TASK_LIST = 'TASK_LIST',
  ADD_TASK_LIST = 'ADD_TASK_LIST',
  COMPLETE_TASKS = 'COMPLETE_TASKS',
}

export type NavStackParams = {
  [Screen.FORCE_UPDATE_SCREEN]: undefined;
  [Screen.NETWORK_CHECK]: undefined;
  [Screen.MAIN_SCREEN]: undefined;
  [Screen.SETTING]: undefined;
  [Screen.LOGIN]: undefined;
  [Screen.SIGNUP]: undefined;
  [Screen.UPLOAD_ID]: undefined;
  [Screen.FORGOT_PASSWORD]: undefined;
  [Screen.VERIFICATION_CODE]: undefined;
  [Screen.RESET_PASSWORD]: undefined;
  [Screen.SELFI_SCREEN]: undefined;
  [Screen.UPLOAD_DOCUMENTS]: undefined;
  [Screen.HOME]: undefined;
  [Screen.PROFILE]: undefined;
  [Screen.MESSAGE]: undefined;
  [Screen.ACCOUNT_SETTING]: undefined;
  [Screen.ADDRESS]: undefined;
  [Screen.WALLET]: undefined;
  [Screen.SHARE_PROFILE]: undefined;
  [Screen.NOTIFICATION]: undefined;
  [Screen.HELP_AND_SUPPORT]: undefined;
  [Screen.TASK_LIST]: undefined;
  [Screen.ADD_TASK_LIST]: undefined;
  [Screen.COMPLETE_TASKS]: undefined;
};

export type NewsDetailParams = {
  item: NewsResult;
};

export type AppNavigationProp = NativeStackNavigationProp<NavStackParams>;

