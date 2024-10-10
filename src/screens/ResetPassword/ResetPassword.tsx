import Header from '@src/components/Header/Header';
import { useAppContext, useColor } from '@src/context';
import React, { useState } from 'react';
import { View, ScrollView, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { BaseLayout } from '@src/components';
import mainStyle from '@src/constants/MainStyles';
import { Formik } from 'formik';
import { Text } from '@app/blueprints';
import useResetPassword from './useResetPassword';

const ResetPassword = () => {
  const { color } = useColor();
  const design = mainStyle(color);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(true);
  const { navigation } = useAppContext();
  const { initialValues, fieldValidation, handleSubmit } = useResetPassword();
  return (
    <BaseLayout>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={design.mainView} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <Header onPress={() => navigation.goBack()} title='Reset Password' />
          <View style={design.subView}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Formik
                initialValues={initialValues}
                validationSchema={fieldValidation}
                onSubmit={handleSubmit}
              >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ marginBottom: 16 }}>
                      <Text preset='h2'>New Password</Text>
                      <View style={design.textView}>
                        <TextInput
                          style={design.inputText}
                          placeholder="Enter new password"
                          placeholderTextColor={color?.textColor}
                          secureTextEntry={passwordVisible}
                          editable={true}
                          value={values.password}
                          onChangeText={handleChange('password')}
                          onBlur={handleBlur('password')}
                          blurOnSubmit={false}
                          underlineColorAndroid="transparent"
                        />
                        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                          <Feather name={passwordVisible ? "eye-off" : "eye"} color='#000000' size={20} />
                        </TouchableOpacity>
                      </View>
                      {touched.password && errors.password && (
                        <Text style={design.errorText}>{errors.password}</Text>
                      )}
                    </View>
                    <View style={{ marginBottom: 16 }}>
                      <Text preset='h2'>Confirm new password</Text>
                      <View style={design.textView}>
                        <TextInput
                          style={design.inputText}
                          placeholder="Enter confirm new password"
                          placeholderTextColor={color?.textColor}
                          secureTextEntry={confirmPasswordVisible}
                          editable={true}
                          value={values.confirmPassword}
                          onChangeText={handleChange('confirmPassword')}
                          onBlur={handleBlur('confirmPassword')}
                          blurOnSubmit={false}
                          underlineColorAndroid="transparent"
                        />
                        <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                          <Feather name={confirmPasswordVisible ? "eye-off" : "eye"} color='#000000' size={20} />
                        </TouchableOpacity>
                      </View>
                      {touched.confirmPassword && errors.confirmPassword && (
                        <Text style={design.errorText}>{errors.confirmPassword}</Text>
                      )}
                    </View>
                    <TouchableOpacity style={design.footerBtn}
                      //@ts-ignore
                      onPress={handleSubmit}>
                      <Text style={design.footerBtnTxt}>Submit</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </BaseLayout>
  );
};
export default ResetPassword;