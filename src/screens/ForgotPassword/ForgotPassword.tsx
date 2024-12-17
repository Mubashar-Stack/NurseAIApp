import React from 'react';
import { View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Text } from '@app/blueprints';
import { BaseLayout } from '@src/components';
import { Formik } from 'formik';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useForgotPassword from './useForgotPassword';

const ForgotPassword = () => {
  const {
    styles,
    navigation,
    initialValues,
    fieldValidation,
    handleSubmit,
    isLoading,
  } = useForgotPassword();

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
            <Text style={styles.headerTitle}>Forgotten Password</Text>
          </View>

          <View style={styles.content}>
            <Formik
              initialValues={initialValues}
              validationSchema={fieldValidation}
              onSubmit={handleSubmit}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={{ flex: 1 }}>
                  <Text style={styles.inputLabel}>Email</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      // keyboardType="number-pad"
                      placeholder="Enter your email"
                      placeholderTextColor="#999999"
                      value={values.phoneNumber}
                      onChangeText={handleChange('phoneNumber')}
                      onBlur={handleBlur('phoneNumber')}
                      editable={!isLoading}
                    />
                    <TouchableOpacity disabled={isLoading}>
                      <Ionicons name="mic-outline" color="#000000" size={24} />
                    </TouchableOpacity>
                  </View>
                  {touched.phoneNumber && errors.phoneNumber && (
                    <Text style={styles.errorText}>{errors.phoneNumber}</Text>
                  )}

                  <TouchableOpacity
                    style={[
                      styles.confirmButton,
                      isLoading && styles.confirmButtonDisabled,
                    ]}
                    onPress={() => handleSubmit()}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <ActivityIndicator color="#FFFFFF" />
                    ) : (
                      <Text style={styles.buttonText}>Confirm</Text>
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

export default ForgotPassword;

