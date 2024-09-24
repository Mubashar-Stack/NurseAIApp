import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Platform, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, TextInput } from 'react-native';
//@ts-ignore
import Feather from 'react-native-vector-icons/Feather';
import mainStyle from '@src/constants/MainStyles';
import { useAppContext } from '@src/context';
import Header from '@src/components/Header/Header';
import { specialCharacters } from '@src/services/Env';
import { Screen } from '../../navigation/appNavigation.type';

const UploadId = () => {
 const [name, setName] = useState<string>('');
 const [email, setEmail] = useState('');
 const [phoneNumber, setPhoneNumber] = useState('');
 const [password, setPassword] = useState('');
 const [enable, setEnable] = useState(true);
 const [passwordPateren, setPasswordPateren] = useState<boolean>(false);
 const { navigation } = useAppContext();

 return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
   <KeyboardAvoidingView style={mainStyle.mainView} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
    <View style={mainStyle.headerView}>
     <Header onPress={() => navigation.goBack()} title='Upload ID' />
    </View>
    <View style={mainStyle.subView}>
     <ScrollView showsVerticalScrollIndicator={false} >

      <View style={{ flex: 1 }}>
       <Text style={mainStyle.textField}>Identity Document</Text>
       <View style={{ marginBottom: 16 }}>
        <View style={{ ...mainStyle.textView, justifyContent: 'center', alignItems: 'center', borderRadius: 0, height: 300 }}>
         <Text style={{ ...mainStyle.inputText, textAlign: 'center' }}>Upload your ID to get Verified</Text>
        </View>
       </View>

       <Text style={{ ...mainStyle.inputText, textAlign: 'justify' }}>Please upload a clear and legible photo of your government-issued ID. Ensure that all information is visible and that the document is valid for verification.</Text>
       <TouchableOpacity style={{ ...mainStyle.footerBtn, marginTop: 30 }} onPress={() => { }}>
        <Text style={mainStyle.footerBtnTxt}>Continue</Text>
       </TouchableOpacity>
      </View>
     </ScrollView>
    </View>
   </KeyboardAvoidingView>
  </TouchableWithoutFeedback>
 );
};
export default UploadId;
