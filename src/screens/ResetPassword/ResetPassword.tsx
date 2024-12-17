import React from 'react';
import { View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Text } from '@app/blueprints';
import { BaseLayout } from '@src/components';
import { Formik } from 'formik';
import Feather from 'react-native-vector-icons/Feather';
import useResetPassword from './useResetPassword';

const ResetPassword = () => {
  const {
    styles,
    navigation,
    initialValues,
    fieldValidation,
    handleSubmit,
    isLoading,
    passwordVisible,
    setPasswordVisible,
    confirmPasswordVisible,
    setConfirmPasswordVisible,
  } = useResetPassword();

  return (
    <BaseLayout style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather name="arrow-left" size={24} color="#000000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Reset Password</Text>
          </View>

          <View style={styles.content}>
            <Formik
              initialValues={initialValues}
              validationSchema={fieldValidation}
              onSubmit={handleSubmit}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View>
                  <Text style={styles.inputLabel}>New password</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter new password"
                      placeholderTextColor="#999999"
                      secureTextEntry={!passwordVisible}
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      editable={!isLoading}
                    />
                    <TouchableOpacity
                      onPress={() => setPasswordVisible(!passwordVisible)}
                      disabled={isLoading}
                    >
                      <Feather
                        name={passwordVisible ? "eye" : "eye-off"}
                        color="#000000"
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}

                  <Text style={styles.inputLabel}>Confirm new password</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter confirm new password"
                      placeholderTextColor="#999999"
                      secureTextEntry={!confirmPasswordVisible}
                      value={values.confirmPassword}
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      editable={!isLoading}
                    />
                    <TouchableOpacity
                      onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                      disabled={isLoading}
                    >
                      <Feather
                        name={confirmPasswordVisible ? "eye" : "eye-off"}
                        color="#000000"
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.confirmPassword && errors.confirmPassword && (
                    <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                  )}

                  <TouchableOpacity
                    style={[
                      styles.submitButton,
                      isLoading && styles.submitButtonDisabled,
                    ]}
                    onPress={() => handleSubmit()}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <ActivityIndicator color="#FFFFFF" />
                    ) : (
                      <Text style={styles.buttonText}>Submit</Text>
                    )}
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </BaseLayout>
  );
};

export default ResetPassword;

