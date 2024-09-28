import { useCallback, useState } from 'react';
import * as yup from 'yup';
import { useAppContext } from '@src/context';
import { logger } from '@src/utils';
import { Screen } from '../../navigation/appNavigation.type';

const useResetPassword = () => {
  const { color, navigation } = useAppContext();
  const [disabled, setDisabled] = useState(false);

  const fieldValidation = yup.object().shape({
    password: yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .required('Password is required'),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const initialValues = {
    password: '',
    confirmPassword: ''
  };

  const handleSubmit = useCallback(
    async (values: typeof initialValues) => {
      navigation.navigate(Screen.LOGIN);
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
  };
};
export default useResetPassword;