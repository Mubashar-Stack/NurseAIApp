import React from 'react';
import { View, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { Text } from '@app/blueprints';
import { BaseLayout } from '@src/components';
import { Formik } from 'formik';
import Feather from 'react-native-vector-icons/Feather';
import { RouteProp, useRoute } from '@react-navigation/native';
import useVerificationCode from './useVerificationCode';
import { useSelector } from 'react-redux';

type RootStackParamList = {
  VerificationCode: { fromPage: string };
};

type OtpVerification = RouteProp<RootStackParamList, 'VerificationCode'>;

const CELL_COUNT = 6;

const VerificationCode = () => {
  const { params } = useRoute<OtpVerification>();
  const {
    styles,
    navigation,
    handleSubmit,
    initialValues,
    fieldValidation,
    isLoading,
    handleSendOTP,
  } = useVerificationCode(params.fromPage);

  const userInfo = useSelector((state: any) => state.auth.userInfo);

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
            <Text style={styles.headerTitle}>Verification Code</Text>
          </View>

          <View style={styles.content}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Formik
                initialValues={initialValues}
                validationSchema={fieldValidation}
                onSubmit={handleSubmit}
              >
                {({ handleChange, handleSubmit, values, errors, touched }) => {
                  const ref = useBlurOnFulfill({ value: values.otp, cellCount: CELL_COUNT });
                  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
                    value: values.otp,
                    setValue: handleChange('otp'),
                  });

                  return (
                    <View style={{ alignItems: 'center' }}>
                      <Text style={styles.title}>
                        OTP sent to you by Email to {userInfo.email}
                      </Text>

                      <CodeField
                        ref={ref}
                        {...props}
                        value={values.otp}
                        onChangeText={handleChange('otp')}
                        cellCount={CELL_COUNT}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={({ index, symbol, isFocused }) => (
                          <View
                            key={index}
                            style={[
                              styles.otpInput,
                              isFocused && styles.otpInputFocused,
                            ]}
                          >
                            <Text style={{ fontSize: 24, textAlign: 'center', marginTop: 5 }}>
                              {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                          </View>
                        )}
                      />

                      {touched.otp && errors.otp && (
                        <Text style={styles.errorText}>{errors.otp}</Text>
                      )}

                      <TouchableOpacity
                        style={[
                          styles.verifyButton,
                          isLoading && styles.verifyButtonDisabled,
                        ]}
                        onPress={() => handleSubmit()}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <ActivityIndicator color="#FFFFFF" />
                        ) : (
                          <Text style={styles.buttonText}>Verify</Text>
                        )}
                      </TouchableOpacity>

                      <View style={styles.resendContainer}>
                        <Text style={styles.resendText}>
                          Didn't receive an OTP?
                        </Text>
                        <TouchableOpacity
                          style={styles.resendButton}
                          onPress={handleSendOTP}
                        >
                          <Text style={styles.resendButtonText}>
                            {'Resend now'}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                }}
              </Formik>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </BaseLayout>
  );
};

export default VerificationCode;

