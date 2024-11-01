import { BaseLayout } from '@src/components';
import Header from '@src/components/Header/Header';
import mainStyle from '@src/constants/MainStyles';
import { useAppContext, useColor } from '@src/context';
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Platform, PermissionsAndroid, Alert } from 'react-native';
import { Text } from '@app/blueprints';
import { scaleHeight } from '@src/utils';
import Feather from 'react-native-vector-icons/Feather';
import { Screen } from '../../navigation/appNavigation.type';
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicatorWrapper,
  ActionsheetDragIndicator,
  ActionsheetItem,
  ActionsheetItemText,
} from '@gluestack-ui/themed';
import * as ImagePicker from 'react-native-image-picker';
import { uploadDocument } from '../../api/auth';

const UploadDocuments = () => {
  const { color } = useColor();
  const design = mainStyle(color);
  const { navigation } = useAppContext();
  const [showActionsheet, setShowActionsheet] = useState(false)
  const handleClose = () => setShowActionsheet(false);

  const imageOption = [
    { value: 'camera', title: 'Take Picture' },
    { value: 'gallery', title: 'Upload from gallery' }
  ];

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

  const uploadWorkDocument = async (type: any) => {
    const options: any = {
      mediaType: 'photo',
      includeBase64: false,
    };

    if (type === 'camera') {
      const hasPermission = await requestCameraPermission();
      if (!hasPermission) {
        Alert.alert('Permission Denied', 'Camera access is required to take photos.');
        return;
      }
      ImagePicker.launchCamera(options, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
          Alert.alert('Error', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          uploadProfilePic(response.assets[0]);
        }
      });
    } else if (type === 'gallery') {
      ImagePicker.launchImageLibrary(options, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
          Alert.alert('Error', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          uploadProfilePic(response.assets[0]);
        }
      });
    }
    setShowActionsheet(false)
  };

  const uploadProfilePic = async (image: any) => {
    console.log("🚀 ~ uploadProfilePic ~ image:", image)
    let formData = new FormData();
    formData.append('file', {
      uri: image?.uri,
      type: image?.type || 'image/jpeg',
      name: image?.fileName || `photo_${Date.now()}.jpg`,
    });
    formData.append('name', 'ID Card');
    formData.append('document_type', 'experience_certificate')
    uploadDocument(formData)
  }

  return (
    <BaseLayout>
      <View style={design.mainView} >
        <Header onPress={() => navigation.goBack()} title='Complete you account' />
        <View style={design.subView}>
          <View style={{ flex: 1 }}>
            <Text preset='h2'>Professional Practice License</Text>
            <TouchableOpacity style={styles.uploadBox} >
              <Feather name="upload" color={color.textColor} size={24} />
              <Text preset='h5'>Upload your professional practice license</Text>
            </TouchableOpacity>

            <Text preset='h2'>Work Experience</Text>
            <TouchableOpacity onPress={() => { setShowActionsheet(true) }} style={styles.uploadBox} >
              <Feather name="upload" color={color.textColor} size={24} />
              <Text preset='h5'>Upload your work experience certificates</Text>
            </TouchableOpacity>

            <Text preset='h5'>
              Please upload a clear selfie, ensuring your full face is well-lit and
              unobstructed for accurate identity verification
            </Text>
          </View>
          <TouchableOpacity style={design.footerBtn} onPress={() => {
            //@ts-ignore
            navigation.navigate(Screen.VERIFICATION_CODE, { fromPage: 'document' })
          }}>
            <Text style={design.footerBtnTxt}>Save</Text>
          </TouchableOpacity>
        </View>
        <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
          <ActionsheetBackdrop />
          <ActionsheetContent>
            <ActionsheetDragIndicatorWrapper>
              <ActionsheetDragIndicator />
            </ActionsheetDragIndicatorWrapper>
            {imageOption.map((item, index) => (
              <ActionsheetItem
                onPress={() => uploadWorkDocument(item.value)}
                key={index}>
                <ActionsheetItemText>{item.title}</ActionsheetItemText>
              </ActionsheetItem>
            ))}
          </ActionsheetContent>
        </Actionsheet>
      </View>

    </BaseLayout>
  );
}

const styles = StyleSheet.create({
  uploadBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'dashed',
    borderRadius: 8,
    height: scaleHeight(100),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: scaleHeight(20),
  },
});

export default UploadDocuments;