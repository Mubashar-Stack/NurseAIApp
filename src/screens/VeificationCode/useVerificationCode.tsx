import { useCallback, useState } from 'react';
import * as yup from 'yup';
import { useAppContext } from '@src/context';
import { logger } from '@src/utils';
import { Screen } from '../../navigation/appNavigation.type';

const useVerificationCode = (fromPage: string) => {
  const { color, navigation } = useAppContext();
  const [disabled, setDisabled] = useState(false);

  const fieldValidation = yup.object().shape({
    otp: yup.string()
      .matches(/^[0-9]{4}$/, 'OTP must be exactly 4 digits')
      .required('OTP is required'),
  });

  const initialValues = {
    otp: '',
  };

  const handleSubmit = useCallback(
    async (values: typeof initialValues) => {
      logger('values: ', values);
      logger('fromPage: ', fromPage); // Log the fromPage value

      setDisabled(true);
      await new Promise(res => setTimeout(res, 3000)); // Simulate async operation

      // Set conditional navigation based on fromPage value
      if (fromPage === 'document') {
        navigation.navigate(Screen.HOME); // Navigate to Home if fromPage is 'document'
      } else {
        navigation.navigate(Screen.RESET_PASSWORD); // Navigate to Reset Password otherwise
      }

      setDisabled(false);
    },
    [navigation, fromPage]
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
export default useVerificationCode;