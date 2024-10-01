import React, { useRef } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Text } from '@app/blueprints';
import { BaseLayout } from '@src/components';
import Header from '@src/components/Header/Header';
import { useAppContext, useColor } from '@src/context';
import mainStyle from '@src/constants/MainStyles';
import { scaleHeight, scaledSize } from '@src/utils';
import { Screen } from '../../navigation/appNavigation.type';

const SelfiScreen = () => {
  const { color } = useColor();
  const design = mainStyle(color);
  const { navigation } = useAppContext();
  const cameraRef = useRef(null);

  return (
    <BaseLayout>
      <View style={design.mainView}>
        <Header onPress={() => navigation.goBack()} title='Your Image' />
        <View style={design.subView}>
          <View style={{ flex: 1 }}>
            <Text preset='h2' style={{ marginBottom: scaleHeight(20) }}>Take a picture</Text>
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
            <View style={styles.cameraButtonContainer}>
              <TouchableOpacity style={styles.cameraButton}
              // onPress={takePicture} 
              />
            </View>
            <Text preset='h2' style={{ padding: scaledSize(20) }}>
              Please upload a clear selfie, ensuring your full face is well-lit and
              unobstructed for accurate identity verification
            </Text>
            <TouchableOpacity style={design.footerBtn} onPress={() => navigation.navigate(Screen.UPLOAD_DOCUMENTS)} >
              <Text style={design.footerBtnTxt}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </BaseLayout>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    aspectRatio: 1,
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
  },
  gridContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    width: '33.33%',
    height: '33.33%',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  cameraButtonContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  cameraButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: 'black',
  },
});

export default SelfiScreen;