import React from 'react';
import { IndicatorView } from '@app/blueprints';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { LocalizationProvider, ThemeProvider } from './context';
import { AppNavigation, navigationRef } from './navigation/AppNavigation';
import store, { persistor } from './redux/store'; // Ensure named import matches export
import { loader, toastConfig } from './utils';
import Toast from 'react-native-toast-message';
import { createConfig, GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';

const gluestackUIConfig = createConfig({
  ...config,
  fonts: {
    heading: 'Poppins',
    body: 'Poppins',
    mono: 'Poppins',
  },
});
export const MainApp: React.FC = () => (
  <Provider store={store}>
    <ThemeProvider>
      <LocalizationProvider>
        <GluestackUIProvider config={gluestackUIConfig}>
          <NavigationContainer ref={navigationRef}>
            <PersistGate loading={<IndicatorView isLoading={true} />} persistor={persistor}>
              <AppNavigation />
              <IndicatorView isLoading={false} ref={loader} />
            </PersistGate>
            <Toast config={toastConfig} />
          </NavigationContainer>
        </GluestackUIProvider>
      </LocalizationProvider>
    </ThemeProvider>
  </Provider>
);
