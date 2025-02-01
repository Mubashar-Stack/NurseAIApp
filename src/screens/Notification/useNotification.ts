import { useState, useEffect, useCallback } from 'react';
import { useAppContext } from '@src/context';
import mainStyle from '@src/constants/MainStyles';
import axios from 'axios';
import { useSelector } from 'react-redux';

interface NotificationSettings {
    app_updates: boolean;
    booking_updates: boolean;
    patient_health: boolean;
    receive_reviews: boolean;
    messages: boolean;
    notify_on_email: boolean;
    notify_on_sms: boolean;
    notify_on_app: boolean;
}

const useNotification = () => {
    const { color, navigation } = useAppContext();
    const [isLoading, setIsLoading] = useState(true);
    const [settings, setSettings] = useState<NotificationSettings>({
        app_updates: false,
        booking_updates: false,
        patient_health: false,
        receive_reviews: false,
        messages: false,
        notify_on_email: false,
        notify_on_sms: false,
        notify_on_app: false,
    });

    const token = useSelector((state: any) => state.auth?.isToken);

    const fetchSettings = useCallback(async () => {
        try {
            const response = await axios.get('https://technlogics.co/api/notification-settings', {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Token ${token}`
                }
            });

            if (response.data?.status) {
                setSettings(response?.data?.data);
            }
        } catch (error: any) {
            console.error('Error fetching notification settings:', error.response.data);
            // showErrorToast(error?.message || 'Failed to load notification settings');
        } finally {
            setIsLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchSettings();
    }, [fetchSettings]);

    const updateSettings = async (newSettings: NotificationSettings) => {
        setIsLoading(true);
        try {
            const response = await axios.put(
                'https://technlogics.co/api/notification-settings',
                newSettings,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data.status) {
                setSettings(response.data.data);
                navigation.goBack();
            }
        } catch (error: any) {
            console.error('Error updating notification settings:', error);
            // showErrorToast(error?.message || 'Failed to update notification settings');
        } finally {
            setIsLoading(false);
        }
    };

    const toggleSetting = (key: keyof NotificationSettings) => {
        setSettings(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const saveChanges = async () => {
        await updateSettings(settings);
    };

    return {
        design: mainStyle(color),
        color,
        navigation,
        settings,
        toggleSetting,
        saveChanges,
        isLoading
    };
};

export default useNotification;

