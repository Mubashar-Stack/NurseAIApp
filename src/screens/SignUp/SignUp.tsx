import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Platform, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, TextInput } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons'
import mainStyle from '@src/constants/MainStyles';
import { useAppContext, useColor } from '@src/context';
import Header from '@src/components/Header/Header';
import { BaseLayout } from '@src/components';
import { Formik } from 'formik';
import { Text } from '@app/blueprints';
import useSignUp from './useSignUp';
import DropdownPicker from '@src/components/Dropdown/DropdownPicker';

const SignUp = () => {
  const { color } = useColor();
  const design = mainStyle(color);
  const { navigation } = useAppContext();
  const { initialValues, fieldValidation, handleSubmit } = useSignUp();
  const [passwordVisible, setPasswordVisible] = useState(true);
  const roleOptions = [
    { label: 'Nurse', value: 'nurse' },
    { label: 'Patient', value: 'patient' },
  ];

  const specialityOptions = [
    { label: 'Pediatrics', value: 'Pediatrics' },
    { label: 'Geriatrics', value: 'Geriatrics' },
    { label: 'Critical Care', value: 'Critical Care' },
    { label: 'Surgical Nursing', value: 'Surgical Nursing' },
    { label: 'Oncology Nursing', value: 'Oncology Nursing' },
  ];
  return (
    <BaseLayout>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={design.mainView} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <Header onPress={() => navigation.goBack()} title='Sign Up' />
          <View style={design.subView}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Formik
                initialValues={initialValues}
                validationSchema={fieldValidation}
                onSubmit={handleSubmit} >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
                  <View style={{ flex: 1 }}>
                    <View style={{ marginBottom: 16 }}>
                      <Text preset="h2">Name</Text>
                      <View style={design.textView}>
                        <TextInput
                          style={design.inputText}
                          placeholder="Enter your name"
                          placeholderTextColor={color?.textColor}
                          editable={true}
                          value={values.name}
                          onChangeText={handleChange('name')}
                          onBlur={handleBlur('name')}
                          blurOnSubmit={false}
                          underlineColorAndroid="transparent"
                        />
                        <TouchableOpacity>
                          <Ionicons name="mic-outline" color={color.textColor} size={24} />
                        </TouchableOpacity>
                      </View>
                      {touched.name && errors.name && (
                        <Text style={design.errorText}>{errors.name}</Text>
                      )}
                    </View>
                    <View style={{ marginBottom: 16 }}>
                      <Text preset="h2">Mobile Number</Text>
                      <View style={design.textView}>
                        <TextInput
                          style={{ ...design.inputText, textAlign: 'left', width: '90%' }}
                          keyboardType="number-pad"
                          placeholder="Enter your phone number"
                          placeholderTextColor={color?.textColor}
                          editable={true}
                          value={values.phoneNumber}
                          onChangeText={handleChange('phoneNumber')}
                          onBlur={handleBlur('phoneNumber')}
                          blurOnSubmit={false}
                          underlineColorAndroid="transparent"
                        />
                        <TouchableOpacity>
                          <Ionicons name="mic-outline" color={color.textColor} size={24} />
                        </TouchableOpacity>
                      </View>
                      {touched.phoneNumber && errors.phoneNumber && (
                        <Text style={design.errorText}>{errors.phoneNumber}</Text>
                      )}
                    </View>

                    {/* Email Input */}
                    <View style={{ marginBottom: 16 }}>
                      <Text preset="h2">Email</Text>
                      <View style={design.textView}>
                        <TextInput
                          style={design.inputText}
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
                          <Ionicons name="mic-outline" color={color.textColor} size={24} />
                        </TouchableOpacity>
                      </View>
                      {touched.email && errors.email && (
                        <Text style={design.errorText}>{errors.email}</Text>
                      )}
                    </View>
                    <View style={{ marginBottom: 16 }}>
                      <Text preset="h2">Password</Text>
                      <View style={{ ...design.textView, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <TextInput
                          style={{ ...design.inputText, width: '90%' }}
                          placeholder="Enter your password"
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
                          <Feather name={passwordVisible ? "eye-off" : "eye"} color={color.textColor} size={20} />
                        </TouchableOpacity>
                      </View>
                      {touched.password && errors.password && (
                        <Text style={design.errorText}>{errors.password}</Text>
                      )}
                    </View>
                    {/* Role Dropdown */}
                    <View style={{ marginBottom: 16 }}>

                      <DropdownPicker
                        label="Role"
                        options={roleOptions}
                        selectedValue={values.role}
                        onValueChange={(itemValue) => setFieldValue('role', itemValue)}
                      />
                      {touched.role && errors.role && (
                        <Text style={design.errorText}>{errors.role}</Text>
                      )}
                    </View>

                    {/* Speciality Dropdown (visible only for nurses) */}
                    {values.role === 'nurse' && (
                      <View style={{ marginBottom: 16 }}>
                        <DropdownPicker
                          label="Specialty"
                          options={specialityOptions}
                          selectedValue={values.speciality}
                          onValueChange={(itemValue) => setFieldValue('speciality', itemValue)}
                        />
                        {touched.speciality && errors.speciality && (
                          <Text style={design.errorText}>{errors.speciality}</Text>
                        )}
                      </View>
                    )}
                    <TouchableOpacity style={{ ...design.footerBtn, marginTop: 30 }}
                      //@ts-ignore
                      onPress={handleSubmit}
                    >
                      <Text style={design.footerBtnTxt}>Continue</Text>
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
export default SignUp;