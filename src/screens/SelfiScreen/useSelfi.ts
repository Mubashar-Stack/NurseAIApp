import { useRef, useState } from 'react';
import { useAppContext } from '@src/context';
import { SelfiScreenStyles } from './SelfiScreen.style';
import { RNCamera } from 'react-native-camera';
import axios from 'axios';
import { showSuccessToast, showErrorToast } from '@src/utils';
import { Screen } from '../../navigation/appNavigation.type';
import { useSelector } from 'react-redux';

const useSelfi = () => {
    const { color, navigation } = useAppContext();
    const cameraRef = useRef<RNCamera | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const token = useSelector((state: any) => state.auth.isToken);

    const takePicture = async () => {
        if (cameraRef.current && !isUploading) {
            try {
                const options = {
                    quality: 0.8,
                    base64: true,
                    skipProcessing: true,
                };

                const data = await cameraRef.current.takePictureAsync(options);
                setCapturedImage(data.uri);
            } catch (error) {
                console.error('Failed to take picture:', error);
                showErrorToast('Failed to capture photo', 2000);
            }
        }
    };

    const retakePicture = () => {
        setCapturedImage(null);
    };

    const uploadPhoto = async () => {
        if (!capturedImage) {
            showErrorToast('Please capture a photo first', 2000);
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append('user_photo', {
            uri: capturedImage,
            type: 'image/jpeg',
            name: 'selfie.jpg',
        });

        try {
            const response = await axios.put(
                'https://technlogics.co/api/update-profile-photo',
                formData,
                {
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            console.log("🚀 ~ uploadPhoto ~ response:", response.data);
            showSuccessToast('Photo uploaded successfully', 2000);
            navigation.navigate(Screen.UPLOAD_DOCUMENTS);
        } catch (error: any) {
            console.error("🚀 ~ uploadPhoto ~ error:", error);
            showErrorToast(error?.response?.data?.message || 'Failed to upload photo', 2000);
        } finally {
            setIsUploading(false);
        }
    };

    return {
        navigation,
        styles: SelfiScreenStyles(color),
        cameraRef,
        takePicture,
        isUploading,
        capturedImage,
        retakePicture,
        uploadPhoto,
    };
};

export default useSelfi;

