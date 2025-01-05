import { useCallback, useRef, useState } from 'react';
import { TextInput } from 'react-native';
import * as yup from 'yup';
import { useAppContext } from '@src/context';
import { loginStyles } from './Login.style';
import { signinHandler } from '../../api/auth';

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
    email: 'hyhello57@gmail.com',
    password: 'Hello@1234',
  };

  const handleSubmit = useCallback(
    async (values: typeof initialValues) => {
      const data = {
        email: values.email,
        password: values.password,
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