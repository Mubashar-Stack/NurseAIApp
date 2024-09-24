import Header from '@src/components/Header/Header';
import mainStyle from '@src/constants/MainStyles';
import { useAppContext } from '@src/context';
import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Screen } from '../../navigation/appNavigation.type';
//@ts-ignore
import Feather from 'react-native-vector-icons/Feather';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [enable, setEnable] = useState(true);
  const { navigation } = useAppContext();

  return (
    <View style={mainStyle.mainView}>
      <View style={mainStyle.headerView}>
        <Header onPress={() => navigation.goBack()} title={'Reset Password'} />
      </View>
      <View style={mainStyle.subView}>
        <ScrollView>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ marginBottom: 16, }}>
              <Text style={{ ...mainStyle.textField }}>New Password</Text>
              <View style={{ ...mainStyle.textView, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <TextInput selectTextOnFocus={false} // Prevents text selection
                  contextMenuHidden={true} style={{
                    ...mainStyle.inputText,
                    width: '90%'
                  }}
                  placeholder="Enter new password" placeholderTextColor='grey' editable={true}
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
            <View style={{ marginBottom: 16, }}>
              <Text style={{ ...mainStyle.textField }}>Confim new password</Text>
              <View style={{ ...mainStyle.textView, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <TextInput selectTextOnFocus={false} // Prevents text selection
                  contextMenuHidden={true} style={{
                    ...mainStyle.inputText,
                    width: '90%'
                  }}
                  placeholder="Enter confirm new password" placeholderTextColor='grey' editable={true}
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
            <TouchableOpacity style={mainStyle.footerBtn} onPress={() => { navigation.navigate(Screen.LOGIN) }}>
              <Text style={mainStyle.footerBtnTxt}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ResetPassword;