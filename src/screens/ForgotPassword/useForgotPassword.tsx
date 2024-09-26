import { useCallback, useState } from 'react';
import * as yup from 'yup';
import { useAppContext } from '@src/context';
import { logger } from '@src/utils';
import { Screen } from '../../navigation/appNavigation.type';

const useForgotPassword = () => {
 const { color, navigation } = useAppContext();
 const [disabled, setDisabled] = useState(false);

 const fieldValidation = yup.object().shape({
  phoneNumber: yup.string()
   .required('Phone number is required'),
 });

 const initialValues = {
  phoneNumber: '',
 };

 const handleSubmit = useCallback(
  async (values: typeof initialValues) => {
   navigation.navigate(Screen.VERIFICATION_CODE);
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
export default useForgotPassword;