import React from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text } from '@app/blueprints';
import { BaseLayout } from '@src/components';
import Feather from 'react-native-vector-icons/Feather';
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicatorWrapper,
  ActionsheetDragIndicator,
  ActionsheetItem,
  ActionsheetItemText,
} from '@gluestack-ui/themed';
import useUploadDocuments from './useUploadDocuments';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const UploadDocuments = () => {
  const {
    styles,
    navigation,
    showActionsheet,
    setShowActionsheet,
    handleDocumentSelect,
    handleImagePicker,
    isUploading,
    documents,
    uploadAllDocuments,
  } = useUploadDocuments();

  return (
    <BaseLayout style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios-new" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Complete your account</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Professional Practice License</Text>
        <TouchableOpacity
          //@ts-ignore
          style={[styles.uploadBox, documents.professional_license.uri && styles.uploadBoxSuccess]}
          onPress={() => handleDocumentSelect('professional_license')}
          disabled={isUploading}
        >
          {documents.professional_license.uri ? (
            <Feather name="check-circle" size={24} color="#4CAF50" />
          ) : (
            <Feather name="upload" size={24} color="#000000" />
          )}
          <Text style={styles.uploadText}>
            {documents.professional_license.uri ? 'Document uploaded' : 'Upload your professional practice license'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Work Experience</Text>
        <TouchableOpacity
          //@ts-ignore
          style={[styles.uploadBox, documents.experience_certificate.uri && styles.uploadBoxSuccess]}
          onPress={() => handleDocumentSelect('experience_certificate')}
          disabled={isUploading}
        >
          {documents.experience_certificate.uri ? (
            <Feather name="check-circle" size={24} color="#4CAF50" />
          ) : (
            <Feather name="upload" size={24} color="#000000" />
          )}
          <Text style={styles.uploadText}>
            {documents.experience_certificate.uri ? 'Document uploaded' : 'Upload your work experience certificates'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.description}>
          Please upload clear and legible copies of your documents.
          Ensure all information is visible and valid for verification.
        </Text>

        <TouchableOpacity
          style={[styles.saveButton, isUploading && styles.saveButtonDisabled]}
          onPress={uploadAllDocuments}
          disabled={isUploading}
        >
          {isUploading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Save</Text>
          )}
        </TouchableOpacity>
      </View>

      <Actionsheet
        isOpen={showActionsheet}
        onClose={() => setShowActionsheet(false)}
      >
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <ActionsheetItem onPress={() => handleImagePicker('camera')}>
            <Feather name="camera" size={20} color="#000000" />
            <ActionsheetItemText>Take Picture</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={() => handleImagePicker('gallery')}>
            <Feather name="image" size={20} color="#000000" />
            <ActionsheetItemText>Upload from gallery</ActionsheetItemText>
          </ActionsheetItem>
        </ActionsheetContent>
      </Actionsheet>
    </BaseLayout>
  );
};

export default React.memo(UploadDocuments);

