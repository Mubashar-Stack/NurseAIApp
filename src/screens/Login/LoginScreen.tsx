import React from 'react';
import { Keyboard, ScrollView, KeyboardAvoidingView, TextInput, Platform, TouchableWithoutFeedback, View, TouchableOpacity } from 'react-native';
import { BaseLayout } from '@src/components';
//@ts-ignore
import Feather from 'react-native-vector-icons/Feather';
//@ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAppContext, useColor } from '@src/context';
import mainStyle from '@src/constants/MainStyles';
import Header from '@src/components/Header/Header';
import { Formik } from 'formik';
import { Screen } from '../../navigation/appNavigation.type'
import { Text } from '../../../blueprints/Text/Text';
import useLogin from './useLogin';  // Import the useLogin hook

const LoginScreen = () => {
  const { color } = useColor();
  const design = mainStyle(color);
  const { navigation } = useAppContext();
  const { disabled, fieldValidation, initialValues, handleSubmit, passwordRef } = useLogin();

  return (
    <BaseLayout>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={design.mainView} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <Header onPress={() => navigation.goBack()} title="Log In" />
          <View style={design.subView}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Formik
                initialValues={initialValues}
                validationSchema={fieldValidation}
                onSubmit={handleSubmit} // Use handleSubmit from the hook
              >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                  <View style={{ flex: 1 }}>
                    <View style={{ marginBottom: 16 }}>
                      <Text preset="h3">Email</Text>
                      <View style={design.textView}>
                        <TextInput
                          contextMenuHidden={true}
                          selectTextOnFocus={true}
                          style={{ ...design.inputText, textAlign: 'left' }}
                          keyboardType="email-address"
                          placeholder="Enter your email"
                          placeholderTextColor={color?.textColor}
                          editable={true}
                          value={values.email}
                          onChangeText={handleChange('email')}
                          onBlur={handleBlur('email')}
                          blurOnSubmit={false}
                          underlineColorAndroid="transparent"
                        />
                        <TouchableOpacity>
                          <Ionicons name="mic-outline" color={color.primaryColor} size={24} />
                        </TouchableOpacity>
                      </View>
                      {touched.email && errors.email ? (
                        <Text style={design.errorText}>{errors.email}</Text>
                      ) : null}
                    </View>
                    <View style={{ marginBottom: 16 }}>
                      <Text preset="h3">Password</Text>
                      <View style={design.textView} >
                        <TextInput
                          ref={passwordRef}  // Reference from useLogin hook
                          contextMenuHidden={true}
                          style={design.inputText}
                          placeholder="Enter your password"
                          editable={true}
                          value={values.password}
                          onChangeText={handleChange('password')}
                          onBlur={handleBlur('password')}
                          blurOnSubmit={false}
                          underlineColorAndroid="transparent"
                          secureTextEntry={true}
                        />
                        <TouchableOpacity>
                          <Feather name="eye-off" color={color.primaryColor} size={20} />
                        </TouchableOpacity>
                      </View>
                      {touched.password && errors.password ? (
                        <Text style={design.errorText}>{errors.password}</Text>
                      ) : null}
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate(Screen.FORGOT_PASSWORD)}>
                      <Text preset='h4' textAlign='right' >Forgot Password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[design.footerBtn, disabled && { opacity: 0.5 }]} // Disable button when submitting
                      //@ts-ignore
                      onPress={handleSubmit}
                      disabled={disabled}
                    >
                      <Text style={design.footerBtnTxt}>Log in</Text>
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                      <Text preset="h4">Don't have an account? </Text>
                      <TouchableOpacity onPress={() => navigation.navigate(Screen.SIGNUP)}>
                        <Text preset="h3">Sign up</Text>
                      </TouchableOpacity>
                    </View>
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
export default React.memo(LoginScreen);