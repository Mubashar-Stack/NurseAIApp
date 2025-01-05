import axios from 'axios';
import { Screen } from '../navigation/appNavigation.type';
import { baseURL } from '@src/services/Env';
import { showErrorToast, showSuccessToast } from '@src/utils';
import store from '../redux/store';
import { setToken, setUserInfo } from '../redux/slices/auth';
import { storage } from '@src/context/storage';
import { StorageKeys } from '@src/constants/storageKeys';

interface SendOTPResponse {
  message: string;
  success: boolean;
}

interface VerifyOTPResponse {
  message: string;
  success: boolean;
}

interface ResetPasswordResponse {
  message: string;
  success: boolean;
}


export const signupHandler = async (data: any, setDisabled: any, setIsLoading: any, navigation: any) => {
  setDisabled(true);
  setIsLoading(true);
  try {
    const response = await axios.post(baseURL + '/api/signup', data);
    console.log("🚀 ~ signupHandler ~ response:", response?.data);
    showSuccessToast(response?.data?.message, 2000);
    store.dispatch(
      setUserInfo({
        userId: response?.data?.data?.user_id,
        email: response?.data?.data?.user?.email,
        role: response?.data?.data?.user?.role || "patient",
      }),
    );
    storage.setData(StorageKeys.USER_ID, response?.data?.data?.user_id);
    storage.setData(StorageKeys.USER_TOKEN, response?.data?.data?.token);
    store.dispatch(setToken(response?.data?.data?.token));
    const { user: { role } } = response?.data?.data;
    navigation.navigate(
      role !== "nurse" ? Screen.VERIFICATION_CODE : Screen.UPLOAD_ID,
      role !== "nurse" ? { fromPage: 'signup' } : {},
    );
  } catch (error: any) {
    showErrorToast(error?.response?.data?.errors[0]?.message, 2000);
  } finally {
    setDisabled(false);
    setIsLoading(false);

  }
};

export const signinHandler = async (data: any, setDisabled: any, setLoading: any, navigation: any) => {
  setDisabled(true);
  setLoading(true);
  try {
    const response = await axios.post(baseURL + '/api/signin', data);
    showSuccessToast(response?.data?.message, 2000);
    store.dispatch(
      setUserInfo({
        userId: response?.data?.data?.user_id,
        email: response?.data?.data?.email,
        role: response?.data?.data?.role || "patient",
      }),
    );
    storage.setData(StorageKeys.USER_ID, response?.data?.data?.user_id);
    storage.setData(StorageKeys.USER_TOKEN, response?.data?.data?.token);
    store.dispatch(setToken(response?.data?.data?.token));
    const { role } = response?.data?.data;
    navigation.navigate(role == "nurse" ? Screen.NURSE_HOME : Screen.HOME);
  } catch (error: any) {
    showErrorToast(error?.response?.data?.message, 2000);
  } finally {
    setDisabled(false);
    setLoading(false);

  }
};

export const uploadDocument = async (data: any) => {
  try {
    const response = await axios.post(baseURL + '/api/upload-document', data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    showSuccessToast(response?.data?.message, 2000);

    // navigation.navigate(Screen.HOME);
  } catch (error: any) {
    console.log("🚀 ~ uploadDocument ~ error:", error?.response?.data)
    showErrorToast(error?.response?.data?.message, 2000);
  }
};

export const sendOTP = async (email: string, token: string): Promise<SendOTPResponse> => {

  const response = await axios.post(
    'https://technlogics.co/api/send-otp',
    { email },
    // {
    //   headers: {
    //     'Authorization': `Token ${token}`,
    //   },
    // }
  );

  return response.data;
};

export const verifyOTP = async (email: string, token: string, otp: string): Promise<VerifyOTPResponse> => {

  const response = await axios.post(
    'https://technlogics.co/api/verify-otp',
    { email, otp },
    // {
    //   headers: {
    //     'Authorization': `Token ${token}`,
    //   },
    // }
  );

  return response.data;
};


export const resetPassword = async (
  email: string,
  newPassword: string,
  confirmPassword: string
): Promise<ResetPasswordResponse> => {
  const response = await axios.post(
    'https://technlogics.co/api/reset-password',
    {
      email,
      new_password: newPassword,
      confirm_password: confirmPassword,
    },
    {
      headers: {
        'Accept': 'application/json',
      },
    }
  );

  return response.data;
};