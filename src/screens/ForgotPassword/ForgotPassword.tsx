import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Text } from '@app/blueprints';
import { BaseLayout } from '@src/components';
import { Formik } from 'formik';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useForgotPassword from './useForgotPassword';
import { useVoiceInput } from '@src/context/VoiceInputContext';
import { useColor } from '@src/context';

const ForgotPassword = () => {
  const {
    styles,
    navigation,
    initialValues,
    fieldValidation,
    handleSubmit,
    isLoading,
  } = useForgotPassword();
  const { color } = useColor();
  const [activeField, setActiveField] = useState<'phoneNumber' | null>(null);

  const { voiceInputText, isListening, startVoiceInput, stopVoiceInput } = useVoiceInput();
  const emailRef = useRef<TextInput>(null);
  const formikRef = useRef<any>(null);

  useEffect(() => {
    if (voiceInputText && activeField && formikRef.current) {
      formikRef.current.setFieldValue(activeField, voiceInputText);
      setActiveField(null);
    }
  }, [voiceInputText, activeField]);

  const handleVoiceInput = async (field: any) => {
    if (isListening) {
      await stopVoiceInput();
    } else {
      setActiveField(field);
      await startVoiceInput();
    }
  };

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
              innerRef={formikRef}
              initialValues={initialValues}
              validationSchema={fieldValidation}
              onSubmit={handleSubmit}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={{ flex: 1 }}>
                  <Text style={styles.inputLabel}>Email</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      ref={emailRef}
                      contextMenuHidden={true}
                      selectTextOnFocus={true}
                      style={styles.input}
                      // keyboardType="number-pad"
                      placeholder="Enter your email"
                      placeholderTextColor="#999999"
                      value={values.phoneNumber}
                      onChangeText={handleChange('phoneNumber')}
                      onBlur={handleBlur('phoneNumber')}
                      editable={!isLoading}
                      onFocus={() => setActiveField('phoneNumber')}
                    />
                    <TouchableOpacity onPress={() => handleVoiceInput('phoneNumber')}>
                      <Ionicons name={isListening && activeField === 'phoneNumber' ? "mic" : "mic-outline"} color={color.textColor} size={24} />
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

