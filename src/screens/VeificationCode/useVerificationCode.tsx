import { useCallback, useState, useEffect } from 'react';
import * as yup from 'yup';
import { useAppContext } from '@src/context';
import { Screen } from '../../navigation/appNavigation.type';
import { sendOTP, verifyOTP } from '../../api/auth';
import { showSuccessToast, showErrorToast } from '@src/utils';
import { useSelector } from 'react-redux';
import { VerificationCodeStyles } from './VerificationCode.style';

const useVerificationCode = (fromPage: string) => {
  const { color, navigation } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const userInfo = useSelector((state: any) => state.auth.userInfo);
  console.log("🚀 ~ useVerificationCode ~ userInfo:", userInfo)
  const token = useSelector((state: any) => state.auth.isToken);


  const fieldValidation = yup.object().shape({
    otp: yup.string()
      .matches(/^[0-9]{6}$/, 'OTP must be exactly 6 digits')
      .required('OTP is required'),
  });

  const initialValues = {
    otp: '',
  };

  useEffect(() => {
    // Send OTP on component mount
    handleSendOTP();
  }, []);

  const handleSendOTP = async () => {

    try {
      const response = await sendOTP(userInfo.email, token);
      showSuccessToast(response.message, 2000);
    } catch (error: any) {
      console.error('Send OTP Error:', error.response);
      showErrorToast(error?.response?.data?.message || 'Failed to send OTP', 2000);
    }
  };

  const handleSubmit = useCallback(
    async (values: typeof initialValues) => {
      if (isLoading) return;

      setIsLoading(true);
      try {
        const response = await verifyOTP(userInfo.email, token, values.otp);
        showSuccessToast(response.message, 2000);

        // Navigate based on fromPage
        if (fromPage === 'document') {
          navigation.navigate(Screen.NURSE_HOME);
        } else if (fromPage === 'signup') {
          navigation.navigate(Screen.PATIENT_SET_LOCATION);
        } else if (fromPage === 'forgotPassword') {
          navigation.navigate(Screen.RESET_PASSWORD);
        } else {
          navigation.navigate(Screen.RESET_PASSWORD);
        }
      } catch (error: any) {
        console.error('Verify OTP Error:', error.response.data);
        showErrorToast(error?.response?.data?.message || 'Invalid OTP', 2000);
      } finally {
        setIsLoading(false);
      }
    },
    [navigation, fromPage, userInfo.email, isLoading]
  );

  return {
    styles: VerificationCodeStyles(color),
    color,
    isLoading,
    fieldValidation,
    handleSubmit,
    initialValues,
    navigation,
    handleSendOTP
  };
};

export default useVerificationCode;

