import { useState } from 'react';
import { Platform, PermissionsAndroid, Alert } from 'react-native';
import { useAppContext } from '@src/context';
import { UploadDocumentsStyles } from './UploadDocuments.style';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import store from '../../redux/store';
import { showSuccessToast, showErrorToast } from '@src/utils';
import { Screen } from '../../navigation/appNavigation.type';
import { useSelector } from 'react-redux';

type DocumentType = 'professional_license' | 'experience_certificate';

interface DocumentState {
    uri: string | null;
    type: string | null;
    name: string | null;
}

const useUploadDocuments = () => {
    const { color, navigation } = useAppContext();
    const [showActionsheet, setShowActionsheet] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [selectedDocType, setSelectedDocType] = useState<DocumentType | null>(null);
    const [documents, setDocuments] = useState<Record<DocumentType, DocumentState>>({
        professional_license: { uri: null, type: null, name: null },
        experience_certificate: { uri: null, type: null, name: null },
    });
    const token = useSelector((state: any) => state.auth.isToken);


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

    const handleDocumentSelect = (type: DocumentType) => {
        setSelectedDocType(type);
        setShowActionsheet(true);
    };

    const uploadDocument = async (image: ImagePicker.Asset, documentType: DocumentType) => {
        setDocuments(prev => ({
            ...prev,
            [documentType]: {
                uri: image.uri,
                type: image.type || 'image/jpeg',
                name: image.fileName || `document_${Date.now()}.jpg`,
            },
        }));
        setShowActionsheet(false);
    };

    const handleImagePicker = async (source: 'camera' | 'gallery') => {
        if (!selectedDocType) return;

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
                    uploadDocument(response.assets[0], selectedDocType);
                }
            });
        } else {
            ImagePicker.launchImageLibrary(options, (response) => {
                if (response.assets && response.assets[0]) {
                    uploadDocument(response.assets[0], selectedDocType);
                }
            });
        }
    };

    const uploadAllDocuments = async () => {
        if (!documents.professional_license.uri || !documents.experience_certificate.uri) {
            showErrorToast('Please upload both required documents', 2000);
            return;
        }

        setIsUploading(true);

        try {
            const uploadPromises = Object.entries(documents).map(([docType, doc]) => {
                const formData = new FormData();
                formData.append('document_file', {
                    uri: doc.uri,
                    type: doc.type,
                    name: doc.name,
                });
                formData.append('name', 'ID Card');
                formData.append('document_type', docType);

                return axios.post(
                    'https://technlogics.co/api/upload-document',
                    formData,
                    {
                        headers: {
                            'Authorization': `Token ${token}`,
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
            });

            await Promise.all(uploadPromises);

            showSuccessToast('All documents uploaded successfully', 2000);
            //@ts-ignore
            navigation.navigate(Screen.VERIFICATION_CODE, { fromPage: 'document' });
        } catch (error: any) {
            console.error("🚀 ~ uploadAllDocuments ~ error:", error);
            showErrorToast(error?.response?.data?.message || 'Failed to upload documents', 2000);
        } finally {
            setIsUploading(false);
        }
    };

    return {
        navigation,
        styles: UploadDocumentsStyles(color),
        showActionsheet,
        setShowActionsheet,
        handleDocumentSelect,
        handleImagePicker,
        isUploading,
        documents,
        uploadAllDocuments,
    };
};

export default useUploadDocuments;

