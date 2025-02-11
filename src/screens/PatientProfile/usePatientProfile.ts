import { useCallback, useEffect, useState } from 'react';
import { useAppContext } from '@src/context';
import { PatientProfileStyles } from './PatientProfile.style';
import { Screen } from '../../navigation/appNavigation.type';
import { useSelector } from 'react-redux';
import { fetchUserProfile } from '../../api/profile';
import { Alert } from 'react-native';
import store from '../../redux/store';
import { StorageKeys } from '@src/constants/storageKeys';
import { setToken, setUserInfo } from '../../redux/slices/auth';
import { storage, useColor } from '@src/context';


const usePatientProfile = () => {
  const { color, navigation } = useAppContext();
  const token = useSelector((state: any) => state.auth.isToken);
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  const [profilePhoto, setProfilePhoto] = useState<any>(null);

  const loadProfile = useCallback(async () => {
    try {
      const response = await fetchUserProfile(token);
      if (response.status && response.data) {
        const { name, email, mobile_no, userPhoto, gender, mrn } = response.data;
        const [firstName, lastName] = name.split(' ');
        setProfileData({
          firstName: firstName || '',
          lastName: lastName || '',
          name,
          email,
          phone: mobile_no,
          gender: gender,
          mrn
        });
        setProfilePhoto(userPhoto);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load profile data');
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const handleMenuItemPress = useCallback((screen: Screen) => {
    //@ts-ignore
    navigation.navigate(screen);
  }, [navigation]);

  const handleLogout = useCallback(() => {
    store.dispatch(setUserInfo({ userId: null, email: null, role: null }));
    storage.deleteStorage(StorageKeys.USER_ID);
    storage.deleteStorage(StorageKeys.USER_TOKEN);
    store.dispatch(setToken(null));
    navigation.reset({
      index: 0,
      routes: [{ name: Screen.LOGIN }],
    });
  }, []);

  return {
    profilePhoto,
    profileData,
    color,
    navigation,
    styles: PatientProfileStyles(color),
    handleMenuItemPress,
    handleLogout,
  };
};

export default usePatientProfile;