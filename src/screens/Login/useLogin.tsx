import { useCallback, useRef, useState } from 'react';
import { TextInput } from 'react-native';
import * as yup from 'yup';
import { useAppContext } from '@src/context';
import { logger } from '@src/utils';
import { loginStyles } from './Login.style';

const useLogin = () => {
  const { color, navigation } = useAppContext();
  const [disabled, setDisabled] = useState(false);
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
      logger('values: ', values);
      setDisabled(true);
      await new Promise(res => setTimeout(res, 3000));
      setDisabled(false);
    },
    [navigation]
  );

  return {
    color,
    disabled,
    fieldValidation,
    handleSubmit,
    initialValues,
    navigation,
    passwordRef,
    styles: loginStyles(color),
  };
};
export default useLogin;