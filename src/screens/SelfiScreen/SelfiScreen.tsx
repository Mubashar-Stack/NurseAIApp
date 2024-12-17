import React from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Text } from '@app/blueprints';
import { BaseLayout } from '@src/components';
import Feather from 'react-native-vector-icons/Feather';
import useSelfi from './useSelfi';
import { Screen } from '../../navigation/appNavigation.type';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const SelfiScreen = () => {
  const { styles, navigation, cameraRef, takePicture, isUploading } = useSelfi();

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
        </View>

        <View style={styles.captureButtonContainer}>
          <TouchableOpacity
            style={styles.captureButton}
            onPress={takePicture}
            disabled={isUploading}
          >
            {isUploading ? (
              <ActivityIndicator color="#000000" style={{ marginTop: 18 }} />
            ) : (
              <View style={styles.captureButtonInner} />
            )}
          </TouchableOpacity>
        </View>

        <Text style={styles.description}>
          Please upload a clear selfie, ensuring your full face is well-lit and
          unobstructed for accurate identity verification
        </Text>

        <TouchableOpacity
          style={[
            styles.continueButton,
            isUploading && styles.continueButtonDisabled
          ]}
          onPress={() => navigation.navigate(Screen.UPLOAD_DOCUMENTS)}
          disabled={isUploading}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </BaseLayout>
  );
};

export default React.memo(SelfiScreen);

