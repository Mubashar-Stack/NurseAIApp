import { BaseLayout } from '@src/components';
import Header from '@src/components/Header/Header';
import mainStyle from '@src/constants/MainStyles';
import { useAppContext, useColor } from '@src/context';
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '@app/blueprints';
import { scaleHeight } from '@src/utils';
//@ts-ignore
import Feather from 'react-native-vector-icons/Feather';
import { Screen } from '../../navigation/appNavigation.type';

const UploadDocuments = () => {
  const { color } = useColor();
  const design = mainStyle(color);
  const { navigation } = useAppContext();

  return (
    <BaseLayout>
      <View style={design.mainView} >
        <Header onPress={() => navigation.goBack()} title='Complete you account' />
        <View style={design.subView}>
          <View style={{ flex: 1 }}>
            <Text preset='h2'>Professional Practice License</Text>
            <TouchableOpacity style={styles.uploadBox} >
              <Feather name="upload" color={color.primaryColor} size={24} />
              <Text preset='h5'>Upload your professional practice license</Text>
            </TouchableOpacity>

            <Text preset='h2'>Work Experience</Text>
            <TouchableOpacity style={styles.uploadBox} >
              <Feather name="upload" color={color.primaryColor} size={24} />
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