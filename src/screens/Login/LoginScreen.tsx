import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Platform, TextInput } from 'react-native';
import mainStyle from '@src/constants/MainStyles';
import { useAppContext } from '@src/context';
//@ts-ignore
import Feather from 'react-native-vector-icons/Feather';
import { Screen } from '../../navigation/appNavigation.type';
import Header from '@src/components/Header/Header';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enable, setEnable] = useState(true);
  const { navigation } = useAppContext();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={{ ...mainStyle.mainView, }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={mainStyle.headerView}>
          <Header onPress={() => navigation.goBack()} title='Log in' />
        </View>
        <View style={mainStyle.subView}>
          <ScrollView >
            <View style={{ flex: 1 }}>
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
              <View style={{ marginBottom: 16, }}>
                <Text style={{ ...mainStyle.textField }}>Password</Text>
                <View style={{ ...mainStyle.textView, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <TextInput selectTextOnFocus={false} // Prevents text selection
                    contextMenuHidden={true} style={{
                      ...mainStyle.inputText,
                      width: '90%'
                    }}
                    placeholder="Enter password" placeholderTextColor='grey' editable={true}
                    value={password} onChangeText={val => { setPassword(val) }} blurOnSubmit={false}
                    underlineColorAndroid="transparent" secureTextEntry={enable} />
                  {enable == false ? (
                    <TouchableOpacity onPress={() => { setEnable(true) }}>
                      <Feather name="eye" color='#000000' size={20} />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => { setEnable(false) }}>
                      <Feather name="eye-off" color='#000000' size={20} />
                    </TouchableOpacity>
                  )}
                </View>

              </View>
              <View style={{ ...styles.remembermeView, justifyContent: 'flex-end' }}>

                <TouchableOpacity style={{ borderBottomWidth: 1 }} onPress={() => { navigation.navigate(Screen.FORGOT_PASSWORD) }} >
                  <Text style={{ ...mainStyle.textField }}>Forget password?</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={{ ...mainStyle.footerBtn, marginTop: 30 }} onPress={() => { }}>
                <Text style={{ ...mainStyle.footerBtnTxt }}>Sign in</Text>
              </TouchableOpacity>

              <View style={{ ...styles.DontHaveView, flexDirection: 'row' }}>
                <Text style={{ ...styles.DontHaveText, }}>Don't have an account? </Text>
                <TouchableOpacity style={{ borderBottomWidth: 1 }} onPress={() => { navigation.navigate(Screen.SIGNUP) }} >
                  <Text style={styles.DontHaveText}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  remembermeView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  checkBoxView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  DontHaveView: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  DontHaveText: {
    fontFamily: Platform.OS == 'ios' ? 'GEDinarOne-Medium' : 'Montserrat-Medium',
    fontSize: 16,
    color: '#000000',

  },
});
export default LogIn;