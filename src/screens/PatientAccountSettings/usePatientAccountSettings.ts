import { useCallback, useState, useEffect } from 'react';
import { storage, useAppContext } from '@src/context';
import { PatientAccountSettingsStyles } from './PatientAccountSettings.style';
import * as yup from 'yup';
import * as ImagePicker from 'react-native-image-picker';
import { fetchUserProfile, updateProfilePhoto, updateUserProfile, deleteUserAccount } from '../../api/profile';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import store from '../../redux/store';
import { StorageKeys } from '@src/constants/storageKeys';
import { setToken, setUserInfo } from '../../redux/slices/auth';
import { Screen } from '../../navigation/appNavigation.type';

const usePatientAccountSettings = () => {
  const { color, navigation } = useAppContext();
  const token = useSelector((state: any) => state.auth.isToken);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fieldValidation = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.string().required('Phone number is required'),
  });

  const loadProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetchUserProfile(token);
      if (response.status && response.data) {
        const { name, email, mobile_no, user_photo, gender } = response.data;
        const [firstName, lastName] = name.split(' ');
        setProfileData({
          firstName: firstName || '',
          lastName: lastName || '',
          email,
          phone: mobile_no,
          gender: gender
        });
        setProfilePhoto(user_photo);
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

  const handleImagePicker = useCallback(async () => {
    const options: any = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    try {
      const response = await ImagePicker.launchImageLibrary(options);
      if (response.didCancel) return;
      if (response.errorCode) {
        throw new Error(response.errorMessage);
      }

      const photo = response.assets?.[0];
      if (photo?.uri) {
        setIsLoading(true);
        const updateResponse = await updateProfilePhoto(token, photo.uri);
        if (updateResponse.status) {
          setProfilePhoto(updateResponse.data.user_photo);
          Alert.alert('Success', 'Profile photo updated successfully');
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile photo');
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const handleSave = useCallback(async (values: any) => {
    try {
      setIsLoading(true);
      const updatedData = {
        name: `${values.firstName} ${values.lastName}`,
        mobile_no: values.phone,
        email: values.email,
        gender: profileData.gender || '',
        address: profileData.address || '',
      };
      console.log("🚀 ~ handleSave ~ updatedData:", updatedData)
      const response = await updateUserProfile(token, updatedData);
      console.log("🚀 ~ handleSave ~ response:", response)
      if (response.status) {
        Alert.alert('Success', 'Profile updated successfully');
        loadProfile(); // Reload the profile data
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  }, [token, profileData, loadProfile]);

  const handleDeletePress = useCallback(() => {
    setShowDeleteModal(true);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await deleteUserAccount(token);
      if (response.status) {
        setShowDeleteModal(false);
        store.dispatch(setUserInfo({ userId: null, email: null, role: null }));
        storage.deleteStorage(StorageKeys.USER_ID);
        storage.deleteStorage(StorageKeys.USER_TOKEN);
        store.dispatch(setToken(null));
        navigation.navigate(Screen.LOGIN);
        Alert.alert('Success', 'Your account has been deleted');
      } else {
        throw new Error('Failed to delete account');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to delete account');
    } finally {
      setIsLoading(false);
    }
  }, [token, navigation, dispatch]);

  return {
    navigation,
    styles: PatientAccountSettingsStyles(color),
    isLoading,
    profileData,
    profilePhoto,
    fieldValidation,
    handleSave,
    handleImagePicker,
    color,
    showDeleteModal,
    setShowDeleteModal,
    handleDeletePress,
    handleDeleteConfirm,
  };
};

export default usePatientAccountSettings;

