import React from 'react';
import { BaseLayout } from '@src/components';
import mainStyle from '@src/constants/MainStyles';
import { Text } from '@app/blueprints';
import { useAppContext, useColor } from '@src/context';
import { Formik } from 'formik'; import Header from '@src/components/Header/Header';
import { View, ScrollView, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import useForgotPassword from './useForgotPassword';
//@ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';

const ForgotPassword = () => {
  const { color } = useColor();
  const design = mainStyle(color);
  const { navigation } = useAppContext();
  const { initialValues, fieldValidation, handleSubmit } = useForgotPassword();

  return (
    <BaseLayout>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={design.mainView} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <Header onPress={() => navigation.goBack()} title='Forgot Password' />
          <View style={design.subView}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Formik
                initialValues={initialValues}
                validationSchema={fieldValidation}
                onSubmit={handleSubmit} >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                  <View style={{ flex: 1 }}>
                    <View style={{ marginBottom: 16 }}>
                      <Text preset="h3">Mobile Number</Text>
                      <View style={design.textView}>
                        <TextInput
                          style={{ ...design.inputText, textAlign: 'left', width: '90%' }}
                          keyboardType="number-pad"
                          placeholder="Enter your phone number"
                          placeholderTextColor="grey"
                          editable={true}
                          value={values.phoneNumber}
                          onChangeText={handleChange('phoneNumber')}
                          onBlur={handleBlur('phoneNumber')}
                          blurOnSubmit={false}
                          underlineColorAndroid="transparent"
                        />
                        <TouchableOpacity>
                          <Ionicons name="mic-outline" color={color.primaryColor} size={24} />
                        </TouchableOpacity>
                      </View>
                      {touched.phoneNumber && errors.phoneNumber && (
                        <Text style={design.errorText}>{errors.phoneNumber}</Text>
                      )}
                    </View>
                    <TouchableOpacity style={{ ...design.footerBtn, marginTop: 30 }}
                      //@ts-ignore
                      onPress={handleSubmit}
                    >
                      <Text style={design.footerBtnTxt}>Confirm</Text>
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
export default ForgotPassword;