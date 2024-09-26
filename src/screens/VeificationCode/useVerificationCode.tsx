import { useCallback, useState } from 'react';
import * as yup from 'yup';
import { useAppContext } from '@src/context';
import { logger } from '@src/utils';
import { Screen } from '../../navigation/appNavigation.type';

const useVerificationCode = () => {
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
      navigation.navigate(Screen.RESET_PASSWORD)
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
export default useVerificationCode;