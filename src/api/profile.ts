import axios from 'axios';
import { baseURL } from '@src/services/Env';
import { showErrorToast, showSuccessToast } from '@src/utils';
import store from '../redux/store';
import { setUserInfo } from '../redux/slices/auth';

export const fetchUserProfile = async (token: string) => {
    try {
        const response = await axios.get(baseURL + '/api/profile', {
            headers: {
                'Authorization': `Token ${token}`,
            },
        });

        return response.data;
    } catch (error: any) {
        showErrorToast(error?.response?.data?.errors[0]?.message, 2000);
        console.error('Error fetching profile:', error);
        throw error;
    }
};

export const updateProfilePhoto = async (token: string, photoUri: string) => {
    try {
        const formData = new FormData();
        formData.append('user_photo', {
            uri: photoUri,
            type: 'image/jpeg',
            name: 'profile-photo.jpg',
        });

        const response = await axios.put(baseURL + '/api/update-profile-photo', formData, {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        showSuccessToast(response?.data?.message, 2000);
        store.dispatch(
            setUserInfo({
                userId: response?.data?.data?.user_id,
                email: response?.data?.data?.email,
                role: response?.data?.data?.user?.role || "patient",
            }),
        );
        return response.data;
    } catch (error: any) {
        console.error('Error updating profile photo:', error);
        showErrorToast(error?.response?.data?.errors[0]?.message, 2000);
        throw error;
    }
};


export const updateUserProfile = async (token: string, userData: any) => {
    try {
        const response = await axios.put(
            'https://technlogics.co/api/update-profile',
            userData,
            {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Accept': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error: any) {
        console.log("🚀 ~ updateUserProfile ~ error.response.data:", error.response.data)
        throw error;
    }
};

export const deleteUserAccount = async (token: string) => {
    try {
        const response = await axios.delete(
            'https://technlogics.co/api/delete-user',
            {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Accept': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

