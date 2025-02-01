import React, { useEffect } from 'react';
import { IndicatorView } from '@app/blueprints';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { LocalizationProvider, ThemeProvider } from './context';
import { AppNavigation, navigationRef } from './navigation/AppNavigation';
import store, { persistor } from './redux/store';
import { loader, toastConfig } from './utils';
import Toast from 'react-native-toast-message';
import { createConfig, GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { VoiceInputProvider } from './context/VoiceInputContext';
import { NotificationService } from './utils/NotificationService';

const gluestackUIConfig = createConfig({
  ...config,
  fonts: {
    heading: 'Poppins',
    body: 'Poppins',
    mono: 'Poppins',
  },
});

const AppContent: React.FC = () => {
  useEffect(() => {
    const initializeNotifications = async () => {
      try {
        // Initialize the notification service first
        await NotificationService.initialize();

        // Then request permissions and setup listeners
        const permission = await NotificationService.requestUserPermission();
        if (permission.status) {
          await NotificationService.setupNotificationListeners();
          console.log('Notifications configured successfully');

          // Handle initial notification if app was launched from notification
          const initialNotification = await NotificationService.getInitialNotification();
          if (initialNotification) {
            NotificationService.handleNotificationNavigation(initialNotification.data);
          }
        } else {
          console.log('Notification permission denied:', permission.error);
        }
      } catch (error) {
        console.error('Error setting up notifications:', error);
      }
    };

    initializeNotifications();

    // Cleanup notification listeners when component unmounts
    return () => {
      NotificationService.cleanup();
    };
  }, []);

  return (
    <>
      <AppNavigation />
      <IndicatorView isLoading={false} ref={loader} />
    </>
  );
};

export const MainApp: React.FC = () => (
  <Provider store={store}>
    <ThemeProvider>
      <LocalizationProvider>
        <GluestackUIProvider config={gluestackUIConfig}>
          <NavigationContainer
            ref={navigationRef}
            onStateChange={(state) => {
              // Optional: Track screen views for analytics
              const currentRoute = state?.routes[state.routes.length - 1];
              if (currentRoute) {
                console.log('Current screen:', currentRoute.name);
              }
            }}
          >
            <PersistGate loading={<IndicatorView isLoading={true} />} persistor={persistor}>
              <VoiceInputProvider>
                <AppContent />
              </VoiceInputProvider>
            </PersistGate>
            <Toast config={toastConfig} />
          </NavigationContainer>
        </GluestackUIProvider>
      </LocalizationProvider>
    </ThemeProvider>
  </Provider>
);