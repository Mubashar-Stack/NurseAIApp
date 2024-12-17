import { useCallback, useState } from 'react';
import * as yup from 'yup';
import { useAppContext } from '@src/context';
import { Screen } from '../../navigation/appNavigation.type';
import { resetPassword } from '../../api/auth';
import { showSuccessToast, showErrorToast } from '@src/utils';
import { useSelector } from 'react-redux';
import { ResetPasswordStyles } from './ResetPassword.style';

const useResetPassword = () => {
  const { color, navigation } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const userInfo = useSelector((state: any) => state.auth.userInfo);

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
      if (isLoading || !userInfo.email) return;

      setIsLoading(true);
      try {
        const response = await resetPassword(
          userInfo.email,
          values.password,
          values.confirmPassword
        );

        showSuccessToast('Password reset successfully', 2000);
        navigation.navigate(Screen.LOGIN);
      } catch (error: any) {
        console.error('Reset Password Error:', error);
        showErrorToast(error?.response?.data?.message || 'Failed to reset password', 2000);
      } finally {
        setIsLoading(false);
      }
    },
    [navigation, isLoading, userInfo.email]
  );

  return {
    styles: ResetPasswordStyles(color),
    isLoading,
    passwordVisible,
    setPasswordVisible,
    confirmPasswordVisible,
    setConfirmPasswordVisible,
    fieldValidation,
    handleSubmit,
    initialValues,
    navigation,
  };
};

export default useResetPassword;

