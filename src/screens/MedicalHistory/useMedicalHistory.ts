import { useState } from 'react';
import { Platform, PermissionsAndroid, Alert } from 'react-native';
import { useAppContext } from '@src/context';
import { MedicalHistoryStyles } from './MedicalHistory.style';
import * as ImagePicker from 'react-native-image-picker';
import { uploadMedicalDocument } from '../../api/medical';
import { showErrorToast, showSuccessToast } from '@src/utils';
import { useSelector } from 'react-redux';

interface DocumentState {
  uri: string | null;
  type: string | null;
  name: string | null;
}

const useMedicalHistory = () => {
  const { color, navigation } = useAppContext();
  const [healthDetails, setHealthDetails] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showActionsheet, setShowActionsheet] = useState(false);
  const [document, setDocument] = useState<DocumentState>({ uri: null, type: null, name: null });
  const token = useSelector((state: any) => {
    console.log("🚀 ~ useMedicalHistory ~ state:", state.auth)
    return state.auth.isToken
  })
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          //@ts-ignore
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to your camera to take photos.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const handleDocumentSelect = () => {
    setShowActionsheet(true);
  };

  const setDocumentFile = async (image: any) => {
    setDocument({
      uri: image.uri,
      type: image.type || 'image/jpeg',
      name: image.fileName || `document_${Date.now()}.jpg`,
    });
    setShowActionsheet(false);
  };

  const handleImagePicker = async (source: 'camera' | 'gallery') => {
    const options: ImagePicker.ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
    };

    if (source === 'camera') {
      const hasPermission = await requestCameraPermission();
      if (!hasPermission) {
        Alert.alert('Permission Denied', 'Camera access is required to take photos.');
        return;
      }

      ImagePicker.launchCamera(options, (response) => {
        if (response.assets && response.assets[0]) {
          setDocumentFile(response.assets[0]);
        }
      });
    } else {
      ImagePicker.launchImageLibrary(options, (response) => {
        if (response.assets && response.assets[0]) {
          setDocumentFile(response.assets[0]);
        }
      });
    }
  };

  const handleSave = async () => {
    if (!healthDetails.trim()) {
      showErrorToast('Please enter your health details', 2000);
      return;
    }

    if (!document.uri) {
      showErrorToast('Please upload a medical document', 2000);
      return;
    }

    setIsLoading(true);

    try {
      console.log("🚀 ~ handleSave ~ token, document, healthDetails:", token, document, healthDetails)
      await uploadMedicalDocument(token, document, healthDetails);

      showSuccessToast('Medical history and document saved successfully', 2000);
      navigation.goBack();
    } catch (error: any) {
      console.error('Error saving medical history:', error.response.data);
      showErrorToast(error?.message || 'Failed to save medical history', 2000);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    navigation,
    styles: MedicalHistoryStyles(color),
    healthDetails,
    setHealthDetails,
    handleDocumentSelect,
    handleImagePicker,
    handleSave,
    isLoading,
    showActionsheet,
    setShowActionsheet,
    document,
  };
};

export default useMedicalHistory;

