import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { NewsResult } from '@src/services';

export enum Screen {
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
  NURSE_HOME = 'NURSE_HOME',
  TAB_HOME = 'TAB_HOME',
  PROFILE = 'PROFILE',
  CHATS = 'CHATS',
  SINGLE_CHAT = 'SINGLE_CHAT',
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
  PATIENT_SET_LOCATION = 'PATIENT_SET_LOCATION',
  PATIENT_LOCATION_SETUP = 'PATIENT_LOCATION_SETUP',
  PATIENT_ACCOUNT_SETTINGS = 'PATIENT_ACCOUNT_SETTINGS',
  MEDICAL_HISTORY = 'MEDICAL_HISTORY',
  PATIENT_DETAIL = "PATIENT_DETAIL",
  PATIENT_CREDIT_CARD = "PATIENT_CREDIT_CARD",
  FAVORITE_HOSPITALS = "FAVORITE_HOSPITALS",
  YOUTUBE_VIDEOS = "YOUTUBE_VIDEOS",
  CHATBOT_SCREEN = "CHATBOT_SCREEN",
  DETAIL_RESPONSE_SCREEN = "DETAILED_RESPONSE_SCREEN"

}

export type NavStackParams = {
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
  [Screen.NURSE_HOME]: undefined;
  [Screen.TAB_HOME]: undefined;
  [Screen.PROFILE]: undefined;
  [Screen.CHATS]: undefined;
  [Screen.SINGLE_CHAT]: undefined;
  [Screen.ACCOUNT_SETTING]: undefined;
  [Screen.ADDRESS]: undefined;
  [Screen.WALLET]: undefined;
  [Screen.MEDICAL_HISTORY]: undefined;
  [Screen.SHARE_PROFILE]: undefined;
  [Screen.NOTIFICATION]: undefined;
  [Screen.HELP_AND_SUPPORT]: undefined;
  [Screen.TASK_LIST]: undefined;
  [Screen.ADD_TASK_LIST]: undefined;
  [Screen.COMPLETE_TASKS]: undefined;
  [Screen.PATIENT_DETAIL]: undefined;
  [Screen.PATIENT_SET_LOCATION]: undefined;
  [Screen.PATIENT_LOCATION_SETUP]: undefined;
  [Screen.PATIENT_ACCOUNT_SETTINGS]: undefined;
  [Screen.PATIENT_CREDIT_CARD]: undefined;
  [Screen.FAVORITE_HOSPITALS]: undefined;
  [Screen.YOUTUBE_VIDEOS]: undefined;
  [Screen.CHATBOT_SCREEN]: undefined;
  [Screen.DETAIL_RESPONSE_SCREEN]: undefined;





};

export type NewsDetailParams = {
  item: NewsResult;
};

export type AppNavigationProp = NativeStackNavigationProp<NavStackParams>;

