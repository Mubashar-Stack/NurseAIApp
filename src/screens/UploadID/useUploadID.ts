import { useState } from 'react';
import { useAppContext } from '@src/context';
import { UploadIDStyles } from './UploadID.style';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import store from '../../redux/store';
import { showSuccessToast, showErrorToast } from '@src/utils';
import { Screen } from '../../navigation/appNavigation.type';
import { useSelector } from 'react-redux';

const useUploadID = () => {
  const { color, navigation } = useAppContext();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const token = useSelector((state: any) => state.auth.isToken);

  const handleUploadPress = () => {
    ImagePicker.launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    }, (response) => {
      if (response.assets && response.assets[0]?.uri) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const uploadDocument = async () => {
    if (!imageUri) {
      showErrorToast('Please select an image first', 2000);
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append('document_file', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'id_document.jpg',
    });
    formData.append('name', 'ID Card');
    formData.append('document_type', 'id_document');

    try {
      const response = await axios.post('https://technlogics.co/api/upload-document', formData, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("🚀 ~ uploadDocument ~ response:", response.data);
      showSuccessToast('Document uploaded successfully', 2000);
      navigation.navigate(Screen.SELFI_SCREEN);
    } catch (error: any) {
      console.error("🚀 ~ uploadDocument ~ error:", error.response);
      showErrorToast(error?.response?.data?.message || 'Failed to upload document', 2000);
    } finally {
      setIsUploading(false);
    }
  };

  return {
    navigation,
    styles: UploadIDStyles(color),
    imageUri,
    handleUploadPress,
    uploadDocument,
    isUploading,
  };
};

export default useUploadID;

