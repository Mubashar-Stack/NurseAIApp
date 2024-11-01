import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from 'react-native';
import { Formik } from 'formik';
import { useAppContext, useColor } from '@src/context';
import mainStyle from '@src/constants/MainStyles';
import useAccountSetting from './useAccountSetting';
import { BaseLayout } from '@src/components';
import Header from '@src/components/Header/Header';
import { Text } from '@app/blueprints';
import DropdownPicker from '@src/components/Dropdown/DropdownPicker';

const AccountSettings = () => {
  const { color } = useColor();
  const design = mainStyle(color);
  const { navigation } = useAppContext();
  const { disabled, fieldValidation, initialValues, handleSubmit, deleteAccount } = useAccountSetting();

  return (
    <BaseLayout>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={design.mainView} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <Header onPress={() => navigation.goBack()} title="Account Settings" />
          <View style={design.subView}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatar} />
                <Text preset='h2'>Edit your Account</Text>
              </View>
              <Formik
                initialValues={initialValues}
                validationSchema={fieldValidation}
                onSubmit={handleSubmit}
              >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
                  <View style={{ flex: 1 }}>
                    <View style={styles.inputRow}>
                      <View style={{ width: '48%' }}>
                        <View style={design.textView}>
                          <TextInput
                            style={design.inputText}
                            placeholder="First name"
                            placeholderTextColor={color?.textColor}
                            onChangeText={handleChange('firstName')}
                            onBlur={handleBlur('firstName')}
                            value={values.firstName}
                          />
                        </View>
                        {touched.firstName && errors.firstName && (
                          <Text style={design.errorText}>{errors.firstName}</Text>
                        )}
                      </View>
                      <View style={{ width: '48%' }}>
                        <View style={design.textView}>
                          <TextInput
                            style={design.inputText}
                            placeholder="Last name"
                            placeholderTextColor={color?.textColor}
                            onChangeText={handleChange('lastName')}
                            onBlur={handleBlur('lastName')}
                            value={values.lastName}
                          />
                        </View>
                        {touched.lastName && errors.lastName && (
                          <Text style={design.errorText}>{errors.lastName}</Text>
                        )}
                      </View>
                    </View>
                    <View style={{ marginBottom: 16 }}>
                      <DropdownPicker
                        label="Issue"
                        options={[
                          { label: "Kidney issue", value: "Kidney issue" },
                          { label: "Stomach issue", value: "Stomach issue" },
                          { label: "Liver issue", value: "Liver issue" }
                        ]}
                        selectedValue={values.specialty}
                        onValueChange={(itemValue) => setFieldValue('specialty', itemValue)}
                      />
                      {touched.specialty && errors.specialty && (
                        <Text style={design.errorText}>{errors.specialty}</Text>
                      )}
                    </View>
                    <View style={{ marginBottom: 16 }}>
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
                      </View>
                      {touched.email && errors.email ? (
                        <Text style={design.errorText}>{errors.email}</Text>
                      ) : null}
                    </View>
                    <View style={{ marginBottom: 16 }}>
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
                      </View>
                      {touched.phoneNumber && errors.phoneNumber && (
                        <Text style={design.errorText}>{errors.phoneNumber}</Text>
                      )}
                    </View>
                    <TouchableOpacity disabled={disabled}
                      style={[design.footerBtn, disabled && { opacity: 0.5 }]}
                      //@ts-ignore
                      onPress={handleSubmit}
                    >
                      <Text style={design.footerBtnTxt}>Save</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
              <TouchableOpacity onPress={() => deleteAccount()}>
                <Text preset='h2' style={{ textAlign: 'center', }}>Delete your Account</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </BaseLayout>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E0E0E0',
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16
  },
});
export default AccountSettings