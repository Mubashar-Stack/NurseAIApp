import { useCallback, useRef, useState } from 'react';
import { TextInput } from 'react-native';
import * as yup from 'yup';
import { storage, useAppContext } from '@src/context';
import { loginStyles } from './Login.style';
import { signinHandler } from '../../api/auth';
import { Platform } from 'react-native';
import { StorageKeys } from '../../constants/storageKeys';

const useLogin = () => {
  const { color, navigation } = useAppContext();
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordRef = useRef<TextInput>(null);

  const fieldValidation = yup.object().shape({
    email: yup.string().trim()
      .email('Invalid email')
      .required('Please enter your Email'),
    password: yup.string().trim()
      .min(8, 'Password must be at least 8 characters')
      .required('Please enter your Password'),
  });

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = useCallback(
    async (values: typeof initialValues) => {
      const deviceType = Platform.OS === 'ios' ? 'ios' : 'android';
      let fcmToken = storage.getData(StorageKeys.FCM_TOKEN);
      const data = {
        email: values.email,
        password: values.password,
        fcm_token: fcmToken,
        device_id: fcmToken,
        device_type: deviceType
      };
      console.log("🚀 ~ data:", data)
      signinHandler(data, setDisabled, setLoading, navigation,);
    },
    [navigation]
  );

  return {
    color,
    disabled,
    loading,
    fieldValidation,
    handleSubmit,
    initialValues,
    navigation,
    passwordRef,
    styles: loginStyles(color),
  };
};
export default useLogin;