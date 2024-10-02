import React from 'react';
import { View, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell, MaskSymbol, isLastFilledCell } from 'react-native-confirmation-code-field';
import Header from '@src/components/Header/Header';
import { useAppContext, useColor } from '@src/context';
import mainStyle from '@src/constants/MainStyles';
import { BaseLayout } from '@src/components';
import { Formik } from 'formik';
import { Text } from '@app/blueprints';
import useVerificationCode from './useVerificationCode';
import { scaledSize } from '@src/utils';
import { RouteProp, useRoute } from '@react-navigation/native';

type RootStackParamList = {
  VerificationCode: { fromPage: string };
};

type OtpVerification = RouteProp<RootStackParamList, 'VerificationCode'>;

const VerificationCode = () => {
  const CELL_COUNT = 4;
  const { color } = useColor();
  const design = mainStyle(color);
  const { navigation } = useAppContext();
  const { params } = useRoute<OtpVerification>(); // Use useRoute to access route params
  const { initialValues, fieldValidation, handleSubmit } = useVerificationCode(params.fromPage); // Pass the fromPage param

  return (
    <BaseLayout>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={design.mainView} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <Header onPress={() => navigation.goBack()} title='Verification Code' />
          <View style={design.subView}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Formik
                initialValues={initialValues}
                validationSchema={fieldValidation}
                onSubmit={handleSubmit} >
                {({ handleChange, handleSubmit, values, errors, touched }) => {
                  const ref = useBlurOnFulfill({ value: values.otp, cellCount: CELL_COUNT });
                  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value: values.otp, setValue: handleChange('otp') });

                  const renderCell = ({ index, symbol, isFocused }: any) => {
                    let textChild = null;
                    if (symbol) {
                      textChild = (
                        <MaskSymbol
                          maskSymbol="*"
                          isLastFilledCell={isLastFilledCell({ index, value: values.otp })}>
                          {symbol}
                        </MaskSymbol>
                      );
                    } else if (isFocused) {
                      textChild = <Cursor />;
                    }
                    return (
                      <View key={index} style={{ ...design.textView, width: '16%', margin: 4, borderRadius: 16, justifyContent: 'center', alignItems: 'center' }}>
                        <Text key={index} preset='h3' onLayout={getCellOnLayoutHandler(index)}>{textChild}</Text>
                      </View>
                    );
                  };

                  return (
                    <View style={{ flex: 1, marginTop: 30, alignItems: 'center' }}>
                      <Text preset='h2' style={{ padding: scaledSize(10), textAlign: 'center' }} >Enter the OTP sent to you by SMS 123456789</Text>
                      <CodeField
                        ref={ref}
                        {...props}
                        value={values.otp}
                        onChangeText={handleChange('otp')}
                        cellCount={CELL_COUNT}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={renderCell}
                      />
                      {touched.otp && errors.otp && (
                        <Text style={design.errorText}>{errors.otp}</Text>
                      )}
                      <TouchableOpacity style={{ ...design.footerBtn, marginTop: 50 }}
                        //@ts-ignore
                        onPress={handleSubmit}
                      >
                        <Text style={design.footerBtnTxt}>Verify</Text>
                      </TouchableOpacity>
                      <View style={{ flexDirection: 'row' }}>
                        <Text preset='h2'>Didn't receive an OTP? </Text>
                        <TouchableOpacity onPress={() => { }}>
                          <Text preset='h3'>Resend now</Text>
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