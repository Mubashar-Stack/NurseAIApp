import React, { useState, useEffect, useRef } from 'react';
import { Keyboard, ScrollView, StyleSheet, KeyboardAvoidingView, TextInput, Platform, TouchableWithoutFeedback, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { BaseLayout } from '@src/components';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppContext, useColor } from '@src/context';
import mainStyle from '@src/constants/MainStyles';
import Header from '@src/components/Header/Header';
import { Formik } from 'formik';
import { Screen } from '../../navigation/appNavigation.type'
import { Text } from '@app/blueprints';
import useLogin from './useLogin';
import { useVoiceInput } from '@src/context/VoiceInputContext';

const LoginScreen = () => {
  const { color } = useColor();
  const design = mainStyle(color);
  const { navigation } = useAppContext();
  const { disabled, loading, fieldValidation, initialValues, handleSubmit, passwordRef } = useLogin();
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [activeField, setActiveField] = useState<'email' | null>(null);
  const { voiceInputText, isListening, startVoiceInput, stopVoiceInput } = useVoiceInput();
  const emailRef = useRef<TextInput>(null);
  const formikRef = useRef<any>(null);

  useEffect(() => {
    if (voiceInputText && activeField && formikRef.current) {
      formikRef.current.setFieldValue(activeField, voiceInputText);
      setActiveField(null);
    }
  }, [voiceInputText, activeField]);

  const handleVoiceInput = async (field: 'email') => {
    if (isListening) {
      await stopVoiceInput();
    } else {
      setActiveField(field);
      await startVoiceInput();
    }
  };

  return (
    <BaseLayout>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={design.mainView} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <Header onPress={() => navigation.goBack()} title="Log In" />
          <View style={design.subView}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Formik
                innerRef={formikRef}
                initialValues={initialValues}
                validationSchema={fieldValidation}
                onSubmit={handleSubmit}
              >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                  <View style={{ flex: 1 }}>
                    <View style={{ marginBottom: 16 }}>
                      <Text preset="h2">Email</Text>
                      <View style={design.textView}>
                        <TextInput
                          ref={emailRef}
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
                        // onFocus={() => setActiveField('email')}
                        />
                        <TouchableOpacity onPress={() => handleVoiceInput('email')}>
                          <Ionicons name={isListening && activeField === 'email' ? "mic" : "mic-outline"} color={color.textColor} size={24} />
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
                          ref={passwordRef}
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
                          secureTextEntry={passwordVisible}
                        />
                        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                          <Feather name={passwordVisible ? "eye-off" : "eye"} color={color.textColor} size={20} />
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
                      style={[design.footerBtn, disabled && { opacity: 0.5 }]}
                      //@ts-ignore
                      onPress={handleSubmit}
                      disabled={disabled}
                    >
                      {loading ? <ActivityIndicator size="small" color="#FFF" /> : <Text style={design.footerBtnTxt}>Log in</Text>}
                    </TouchableOpacity>

                    <View style={styles.divider}>
                      <View style={design.dividerLine} />
                      <Text preset='h2'>Or continue with</Text>
                      <View style={design.dividerLine} />
                    </View>

                    <View style={styles.socialButtons}>
                      <TouchableOpacity style={[styles.socialButton, { backgroundColor: color.backgroundColor }]}>
                        <AntDesign size={24} name="apple-o" color={color.textColor} />
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.socialButton, { backgroundColor: color.backgroundColor }]}>
                        <MaterialCommunityIcons size={24} name="google" color={color.textColor} />
                      </TouchableOpacity>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                      <Text preset="h2">Don't have an account? </Text>
                      <TouchableOpacity onPress={() => navigation.navigate(Screen.SIGNUP)}>
                        <Text preset="h3" color={color.primaryColor}>Sign up</Text>
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
    marginBottom: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: -5,
  },
});

export default React.memo(LoginScreen);

