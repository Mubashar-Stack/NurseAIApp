import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Platform, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, TextInput } from 'react-native';
//@ts-ignore
import Feather from 'react-native-vector-icons/Feather';
import mainStyle from '@src/constants/MainStyles';
import { useAppContext } from '@src/context';
import Header from '@src/components/Header/Header';
import { specialCharacters } from '@src/services/Env';
import { Screen } from '../../navigation/appNavigation.type';

const SignUp = () => {
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
          <Header onPress={() => navigation.goBack()} title='Sign Up' />
        </View>
        <View style={mainStyle.subView}>
          <ScrollView showsVerticalScrollIndicator={false} >

            <View style={{ flex: 1 }}>
              <View style={{ marginBottom: 16 }}>
                <Text style={mainStyle.textField}>Name</Text>
                <View style={mainStyle.textView}>
                  <TextInput contextMenuHidden={true} selectTextOnFocus={true} style={{ ...mainStyle.inputText }} keyboardType="number-pad" placeholder='Enter your name'
                    placeholderTextColor='grey' editable={true} value={name} maxLength={10} onChangeText={val => { setName(val) }}
                    blurOnSubmit={false} underlineColorAndroid="transparent" />
                </View>
              </View>
              <View style={{ marginBottom: 16 }}>
                <Text style={mainStyle.textField}>Mobile Number</Text>
                <View style={mainStyle.textView}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {/* <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 14, color: '#000000', }}>+966</Text> */}
                    <TextInput contextMenuHidden={true} selectTextOnFocus={true} style={{ ...mainStyle.inputText, textAlign: 'left', width: '90%' }} keyboardType="number-pad" placeholder='Enter your phone number'
                      placeholderTextColor='grey' maxLength={9} editable={true} value={phoneNumber}
                      onChangeText={val => { setPhoneNumber(val) }}
                      blurOnSubmit={false} underlineColorAndroid="transparent" />
                  </View>
                </View>
              </View>
              <View style={{ marginBottom: 16, }}>
                <Text style={{ ...mainStyle.textField, }}>Email</Text>
                <View style={{ ...mainStyle.textView }}>
                  <TextInput
                    selectTextOnFocus={false} // Prevents text selection
                    contextMenuHidden={true} style={{ ...mainStyle.inputText }}
                    keyboardType="email-address"
                    placeholder="Enter your email"
                    placeholderTextColor='grey'
                    editable={true}
                    value={email} maxLength={10} onChangeText={val => { setEmail(val) }}
                    blurOnSubmit={false} underlineColorAndroid="transparent" />
                </View>
              </View>
              <View style={{ marginBottom: 16 }}>
                <Text style={mainStyle.textField}>Password</Text>
                <View style={{ ...mainStyle.textView, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <TextInput contextMenuHidden={true} selectTextOnFocus={true} style={{ ...mainStyle.inputText, width: '90%' }} keyboardType='numbers-and-punctuation'
                    placeholder='Enter your password' secureTextEntry={enable} placeholderTextColor='grey' editable={true} value={password}
                    onChangeText={val => { setPassword(val), setPasswordPateren(true) }} blurOnSubmit={false} underlineColorAndroid="transparent" />
                  {enable == false ? (
                    <TouchableOpacity onPress={() => { setEnable(true) }}>
                      <Feather name="eye" color={'#000000'} size={20} />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => { setEnable(false) }}>
                      <Feather name="eye-off" color={'#000000'} size={20} />
                    </TouchableOpacity>
                  )}
                </View>
                {(passwordPateren && (password == '' || (!/[a-z]/.test(password)) || (!/[A-Z]/.test(password)) ||
                  (!/[0-9]/.test(password)) || (!specialCharacters.test(password)) || !(password.length >= 8))
                ) ? (
                  <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      {password.length >= 8 && <Feather name="check-circle" color="green" size={14} />}
                      <Text style={{ ...mainStyle.errorText, color: password.length >= 8 ? 'green' : 'red', marginLeft: password.length >= 8 ? 10 : 0 }}>Password must be minimum 8 character long.</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      {/[0-9]/.test(password) && <Feather name="check-circle" color="green" size={14} />}
                      <Text style={{ ...mainStyle.errorText, color: /[0-9]/.test(password) ? 'green' : 'red', marginLeft: /[0-9]/.test(password) ? 10 : 0 }}>Password must include at least one number.</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      {/[a-z]/.test(password) && <Feather name="check-circle" color="green" size={14} />}
                      <Text style={{ ...mainStyle.errorText, color: /[a-z]/.test(password) ? 'green' : 'red', marginLeft: /[a-z]/.test(password) ? 10 : 0 }}>Password must include at least one lowercase letter.</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      {/[A-Z]/.test(password) && <Feather name="check-circle" color="green" size={14} />}
                      <Text style={{ ...mainStyle.errorText, color: /[A-Z]/.test(password) ? 'green' : 'red', marginLeft: /[A-Z]/.test(password) ? 10 : 0 }}>Password must include at least one uppercase letter.</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      {specialCharacters.test(password) && <Feather name="check-circle" color="green" size={14} />}
                      <Text style={{ ...mainStyle.errorText, color: specialCharacters.test(password) ? 'green' : 'red', marginLeft: specialCharacters.test(password) ? 10 : 0 }}>Password must include at least one special character.</Text>
                    </View>
                  </View>

                ) : null}
              </View>
              <TouchableOpacity style={{ ...mainStyle.footerBtn, marginTop: 30 }} onPress={() => navigation.navigate(Screen.UPLOAD_ID)}>
                <Text style={mainStyle.footerBtnTxt}>Continue</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
export default SignUp;
