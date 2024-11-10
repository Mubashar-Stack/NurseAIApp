import axios from 'axios';
import { Screen } from '../navigation/appNavigation.type';
import { baseURL } from '@src/services/Env';
import { showErrorToast, showSuccessToast } from '@src/utils';
import store from '../redux/store';
import { setToken, setUserInfo } from '../redux/slices/auth';

export const signupHandler = async (data: any, setDisabled: any, navigation: any) => {
  setDisabled(true);
  try {
    const response = await axios.post(baseURL + '/api/signup', data);
    console.log("🚀 ~ signupHandler ~ response:", response?.data)
    showSuccessToast(response?.data?.message, 2000);
    navigation.navigate(Screen.UPLOAD_ID);
    store.dispatch(setToken(response?.data?.token));
  } catch (error: any) {
    showErrorToast(error?.response?.data?.errors[0]?.message, 2000);
  } finally {
    setDisabled(false);
  }
};

export const signinHandler = async (data: any, setDisabled: any, navigation: any) => {
  setDisabled(true);
  try {
    const response = await axios.post(baseURL + '/api/signin', data);
    showSuccessToast(response?.data?.message, 2000);
    store.dispatch(
      setUserInfo({
        userId: response?.data?.data?.user_id,
        email: response?.data?.data?.email,
      }),
    );
    store.dispatch(setToken(response?.data?.data?.token));
    navigation.navigate(Screen.HOME);
  } catch (error: any) {
    showErrorToast(error?.response?.data?.message, 2000);
  } finally {
    setDisabled(false);
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