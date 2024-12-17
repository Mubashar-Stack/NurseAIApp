import React from 'react';
import { View, TouchableOpacity, Platform, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Image, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { BaseLayout } from '@src/components';
import { Text } from '@app/blueprints';
import useUploadID from './useUploadID';
import Feather from 'react-native-vector-icons/Feather';

const UploadIDScreen = () => {
  const { styles, handleUploadPress, imageUri, uploadDocument, isUploading, navigation } = useUploadID();

  return (
    <BaseLayout style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons name="arrow-back-ios-new" size={24} color="#000000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Upload ID</Text>
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>Identity Document</Text>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleUploadPress}
              style={styles.uploadArea}
            >
              {imageUri ? (
                <Image
                  source={{ uri: imageUri }}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="cover"
                />
              ) : (
                <View style={{ alignItems: 'center' }}>
                  <Feather name="upload" size={32} color="#666666" />
                  <Text style={styles.uploadText}>Upload your ID to get Verified</Text>
                </View>
              )}
            </TouchableOpacity>

            <Text style={styles.description}>
              Please upload a clear and legible photo of your government issued ID.
              Ensure that all information is visible and that the document is valid
              for verification.
            </Text>

            <TouchableOpacity
              style={[styles.continueButton, isUploading && styles.disabledButton]}
              onPress={uploadDocument}
              disabled={isUploading}
            >
              {isUploading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>Continue</Text>
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </BaseLayout>
  );
};

export default React.memo(UploadIDScreen);

