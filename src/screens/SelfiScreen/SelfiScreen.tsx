import React from 'react';
import { View, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Text } from '@app/blueprints';
import { BaseLayout } from '@src/components';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import useSelfi from './useSelfi';
import { Screen } from '../../navigation/appNavigation.type';

const SelfiScreen = () => {
  const {
    styles,
    navigation,
    cameraRef,
    takePicture,
    isUploading,
    capturedImage,
    retakePicture,
    uploadPhoto,
  } = useSelfi();

  return (
    <BaseLayout style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios-new" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Image</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Take a picture</Text>

        <View style={styles.cameraContainer}>
          {capturedImage ? (
            <View style={styles.capturedImageContainer}>
              <Image source={{ uri: capturedImage }} style={styles.capturedImage} />
              <TouchableOpacity
                style={styles.retakeButton}
                onPress={retakePicture}
              >
                <MaterialIcons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          ) : (
            <RNCamera
              ref={cameraRef}
              style={styles.camera}
              type={RNCamera.Constants.Type.front}
              captureAudio={false}
            >
              <View style={styles.gridContainer}>
                {[...Array(9)].map((_, index) => (
                  <View key={index} style={styles.gridItem} />
                ))}
              </View>
            </RNCamera>
          )}
        </View>

        <View style={styles.captureButtonContainer}>
          <TouchableOpacity
            style={styles.captureButton}
            onPress={capturedImage ? uploadPhoto : takePicture}
            disabled={isUploading}
          >

            <View style={styles.captureButtonInner} />

          </TouchableOpacity>
        </View>

        <Text style={styles.description}>
          Please upload a clear selfie, ensuring your full face is well-lit
          unobstructed for accurate identity verification
        </Text>

        <TouchableOpacity
          style={[
            styles.continueButton,
            (!capturedImage || isUploading) && styles.continueButtonDisabled
          ]}
          onPress={uploadPhoto}
          disabled={!capturedImage || isUploading}
        >
          {isUploading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Continue</Text>
          )}
        </TouchableOpacity>
      </View>
    </BaseLayout>
  );
};

export default React.memo(SelfiScreen);

