import React from 'react';
import { Keyboard, ScrollView, StyleSheet, KeyboardAvoidingView, TextInput, Platform, TouchableWithoutFeedback, View, TouchableOpacity } from 'react-native';
import { BaseLayout } from '@src/components';
//@ts-ignore
import Feather from 'react-native-vector-icons/Feather';
//@ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';
//@ts-ignore
import AntDesign from 'react-native-vector-icons/AntDesign';
//@ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppContext, useColor } from '@src/context';
import mainStyle from '@src/constants/MainStyles';
import Header from '@src/components/Header/Header';
import { Formik } from 'formik';
import { Screen } from '../../navigation/appNavigation.type'
import { Text } from '@app/blueprints';
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
                      <Text preset="h2">Email</Text>
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
                      <Text preset="h2">Password</Text>
                      <View style={design.textView} >
                        <TextInput
                          ref={passwordRef}  // Reference from useLogin hook
                          contextMenuHidden={true}
                          style={design.inputText}
                          placeholder="Enter your password"
                          placeholderTextColor={color?.textColor}
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
                      <Text preset='h2' textAlign='right' >Forgot Password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[design.footerBtn, disabled && { opacity: 0.5 }]} // Disable button when submitting
                      //@ts-ignore
                      onPress={handleSubmit}
                      disabled={disabled}
                    >
                      <Text style={design.footerBtnTxt}>Log in</Text>
                    </TouchableOpacity>

                    <View style={styles.divider}>
                      <View style={design.dividerLine} />
                      <Text preset='h2'>Or continue with</Text>
                      <View style={design.dividerLine} />
                    </View>

                    <View style={styles.socialButtons}>
                      <TouchableOpacity style={styles.socialButton}>
                        <MaterialCommunityIcons size={24} name="google" color={color.textColor} />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.socialButton}>
                        <AntDesign size={24} name="apple-o" color={color.textColor} />
                      </TouchableOpacity>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                      <Text preset="h3">Don't have an account? </Text>
                      <TouchableOpacity onPress={() => navigation.navigate(Screen.SIGNUP)}>
                        <Text preset="h2" >Sign up</Text>
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
const styles = StyleSheet.create({
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
});
export default React.memo(LoginScreen);