import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { storage } from '../context/storage';
import { StorageKeys } from '../constants/storageKeys';
import { NavigationService } from '../navigation/AppNavigation';

interface NotificationAuthStatus {
    status: boolean;
    token?: string;
    error?: string;
}

export class NotificationService {
    private static unsubscribeListeners?: () => void;

    static async requestUserPermission(): Promise<NotificationAuthStatus> {
        try {
            let authStatus;

            if (Platform.OS === 'android') {
                authStatus = await PermissionsAndroid.request(
                    // @ts-ignore
                    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
                );
            } else {
                authStatus = await messaging().requestPermission();
            }

            const enabled =
                authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL;

            if (enabled) {
                console.log('Authorization status:', authStatus);
                const token = await this.getFcmToken();
                return { status: true, token };
            }

            return { status: false };
        } catch (error) {
            console.error('Permission request error:', error);
            return {
                status: false,
                error: error instanceof Error ? error.message : 'Unknown error occurred'
            };
        }
    }

    private static createNotificationChannel() {
        if (Platform.OS === 'android') {
            PushNotification.createChannel(
                {
                    channelId: 'nurseproai',
                    channelName: 'nurseproai channel',
                    channelDescription: 'A channel to categorise your notifications',
                    soundName: 'default',
                    importance: 4,
                    vibrate: true,
                },
                created => console.log(`createChannel returned '${created}'`)
            );
        }
    }

    // Changed to public and added type safety
    static handleNotificationNavigation(notificationData: any): void {
        const { screen, params } = notificationData;

        if (screen) {
            NavigationService.navigate(screen, params);
        }
    }

    static async initialize() {
        // Create notification channel
        this.createNotificationChannel();

        // Configure push notifications
        PushNotification.configure({
            onRegister: async (token) => {
                console.log('TOKEN:', token);
                await this.getFcmToken();
            },

            onNotification: (notification) => {
                console.log('NOTIFICATION:', notification);

                // Handle notification click
                if (notification.userInteraction) {
                    this.handleNotificationNavigation(notification.data);
                }

                // Required on iOS
                notification.finish(PushNotificationIOS.FetchResult.NoData);
            },

            onRegistrationError: (err) => {
                console.error('Notification registration error:', err);
            },

            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },

            popInitialNotification: true,
            requestPermissions: true,
        });

        // Setup message handlers
        this.unsubscribeListeners = await this.setupNotificationListeners();
    }

    static async getInitialNotification() {
        try {
            const initialNotification = await messaging().getInitialNotification();
            return initialNotification;
        } catch (error) {
            console.error('Error getting initial notification:', error);
            return null;
        }
    }

    static cleanup(): void {
        if (this.unsubscribeListeners) {
            this.unsubscribeListeners();
            this.unsubscribeListeners = undefined;
        }
    }

    static async getFcmToken(): Promise<string | undefined> {
        try {
            let fcmToken = storage.getData(StorageKeys.FCM_TOKEN);

            if (!fcmToken) {
                fcmToken = await messaging().getToken();
                if (fcmToken) {
                    console.log('New FCM token:', fcmToken);
                    storage.setData(StorageKeys.FCM_TOKEN, fcmToken);
                }
            }

            return fcmToken;
        } catch (error) {
            console.error('FCM token error:', error);
            throw error;
        }
    }

    static async setupNotificationListeners(): Promise<() => void> {
        // Handle token refresh
        const tokenRefreshUnsubscribe = messaging().onTokenRefresh(async token => {
            console.log('FCM Token refreshed:', token);
            storage.setData(StorageKeys.FCM_TOKEN, token);
        });

        // Handle background messages
        messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log('Message handled in the background:', remoteMessage);
            this.handleNotificationNavigation(remoteMessage.data);
        });

        // Handle foreground messages
        const messageUnsubscribe = messaging().onMessage(async remoteMessage => {
            console.log('Received foreground message:', remoteMessage);
            // You can show a local notification here if needed
            PushNotification.localNotification({
                channelId: 'nurseproai',
                title: remoteMessage.notification?.title,
                message: remoteMessage.notification?.body || '',
                // data: remoteMessage.data,
            });
        });

        return () => {
            tokenRefreshUnsubscribe();
            messageUnsubscribe();
        };
    }

    static clearToken(): void {
        storage.deleteStorage(StorageKeys.FCM_TOKEN);
    }
}