import { useCallback, useState } from 'react';
import * as yup from 'yup';
import { useAppContext } from '@src/context';
import { Screen } from '../../navigation/appNavigation.type';
import { showErrorToast } from '@src/utils';
import store from '../../redux/store';
import { setUserInfo } from '../../redux/slices/auth';
import { ForgotPasswordStyles } from './ForgotPassword.style';

const useForgotPassword = () => {
    const { color, navigation } = useAppContext();
    const [isLoading, setIsLoading] = useState(false);

    const fieldValidation = yup.object().shape({
        phoneNumber: yup.string()
            .required('Email is required'),
    });

    const initialValues = {
        phoneNumber: '',
    };

    const handleSubmit = useCallback(
        async (values: typeof initialValues) => {
            if (isLoading) return;
            setIsLoading(true);
            try {
                const response = {
                    data: {
                        user_id: '123',
                        user: {
                            email: values.phoneNumber,
                            role: 'patient',
                        },
                    },
                };

                store.dispatch(
                    setUserInfo({
                        userId: response.data.user_id,
                        email: response.data.user.email,
                        role: response.data.user.role || "patient",
                    }),
                );
                //@ts-ignore
                navigation.navigate(Screen.VERIFICATION_CODE, { fromPage: 'forgotPassword' });
            } catch (error: any) {
                console.error('Forgot Password Error:', error);
                showErrorToast(error?.response?.data?.message || 'Failed to process request', 2000);
            } finally {
                setIsLoading(false);
            }
        },
        [navigation, isLoading]
    );

    return {
        styles: ForgotPasswordStyles(color),
        isLoading,
        fieldValidation,
        handleSubmit,
        initialValues,
        navigation,
    };
};

export default useForgotPassword;

