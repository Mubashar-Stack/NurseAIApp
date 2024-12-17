import { useCallback } from 'react';
import { useAppContext } from '@src/context';
import { PatientProfileStyles } from './PatientProfile.style';
import { Screen } from '../../navigation/appNavigation.type';

const usePatientProfile = () => {
  const { color, navigation } = useAppContext();

  const handleMenuItemPress = useCallback((screen: Screen) => {
    //@ts-ignore
    navigation.navigate(screen);
  }, [navigation]);

  const handleLogout = useCallback(() => {
    // Add logout logic here
    console.log('Logging out...');
  }, []);

  return {
    color,
    navigation,
    styles: PatientProfileStyles(color),
    handleMenuItemPress,
    handleLogout,
  };
};

export default usePatientProfile;