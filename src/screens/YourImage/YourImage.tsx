import React from 'react';
import { View, TouchableOpacity, Platform, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useAppContext, useColor } from '@src/context';
import Header from '@src/components/Header/Header';
import mainStyle from '@src/constants/MainStyles';
import { BaseLayout } from '@src/components';
import { Text } from '@app/blueprints';

const YourImage = () => {
 const { color } = useColor();
 const design = mainStyle(color);
 const { navigation } = useAppContext();

 return (
  <BaseLayout>
   <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <KeyboardAvoidingView style={design.mainView} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
     <Header onPress={() => navigation.goBack()} title='Upload ID' />
     <View style={design.subView}>
      <View style={{ flex: 1 }}>
       <Text preset='h3'>Identity Document</Text>
       <TouchableOpacity activeOpacity={1} style={{ marginBottom: 16 }}>
        <View style={{ ...design.textView, justifyContent: 'center', alignItems: 'center', borderRadius: 0, height: 300 }}>
         <View style={{ alignItems: 'center' }}>
          <Feather name="upload" color={color.primaryColor} size={30} />
          <Text preset='h4'>Upload your ID to get Verified</Text>
         </View>
        </View>
       </TouchableOpacity>
       <Text preset='h4'>Please upload a clear and legible photo of your government-issued ID. Ensure that all information is visible and that the document is valid for verification.</Text>
       <TouchableOpacity style={{ ...design.footerBtn, marginTop: 30 }} onPress={() => { }}>
        <Text style={design.footerBtnTxt}>Continue</Text>
       </TouchableOpacity>
      </View>
     </View>
    </KeyboardAvoidingView>
   </TouchableWithoutFeedback>
  </BaseLayout>
 );
};
export default YourImage;