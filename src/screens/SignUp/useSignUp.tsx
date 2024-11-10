import { useCallback, useRef, useState } from 'react';
import { TextInput } from 'react-native';
import * as yup from 'yup';
import { useAppContext } from '@src/context';
import { specialCharacters } from '@src/services/Env';
import { signupHandler } from '../../api/auth';

const useSignUp = () => {
  const { color, navigation } = useAppContext();
  const [disabled, setDisabled] = useState(false);
  const passwordRef = useRef<TextInput>(null);

  const fieldValidation = yup.object().shape({
    name: yup.string().required('Name is required'),
    phoneNumber: yup.string()
      .required('Phone number is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(specialCharacters, 'Password must contain at least one special character')
      .required('Password is required'),
  });

  const initialValues = {
    name: '',
    phoneNumber: '',
    email: '',
    password: '',
  };

  const handleSubmit = useCallback(
    async (values: typeof initialValues) => {
      const data = {
        name: values.name,
        email: values.email,
        mobile_no: values.phoneNumber,
        password: values.password,
        user_photo: null,
        gender: "male",
        address: "123 Main St",
        role: "patient"
      };
      signupHandler(data, setDisabled, navigation,);
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
  };
};
export default useSignUp;