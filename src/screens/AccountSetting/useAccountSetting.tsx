import { useCallback, useState } from 'react';
import * as yup from 'yup';
import { useAppContext } from '@src/context';
import { logger } from '@src/utils';
import { Screen } from '../../navigation/appNavigation.type';
import { Alert } from 'react-native';

const useAccountSetting = () => {
  const { color, navigation } = useAppContext();
  const [disabled, setDisabled] = useState(false);

  const fieldValidation = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    specialty: yup.string().required('Specialty is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phoneNumber: yup.string().matches(/^[0-9\s]+$/, 'Invalid phone number').required('Phone number is required'),
  });

  const initialValues = {
    firstName: '',
    lastName: '',
    specialty: '',
    email: '',
    phoneNumber: '',
  };

  const handleSubmit = useCallback(
    async (values: typeof initialValues) => {
      navigation.navigate(Screen.PROFILE)
      logger('values: ', values);
      setDisabled(true);
      await new Promise(res => setTimeout(res, 3000));
      setDisabled(false);
    },
    [navigation]
  );
  const deleteAccount = () => {
    Alert.alert(
      'Delete your Account',
      'Are you sure you want to delete your account?',
      [
        { text: 'Delete', style: 'cancel' },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  }

  return {
    color,
    disabled,
    fieldValidation,
    handleSubmit,
    initialValues,
    navigation,
    deleteAccount
  };
};
export default useAccountSetting;