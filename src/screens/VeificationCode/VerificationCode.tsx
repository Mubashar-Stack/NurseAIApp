import React from 'react';
import { View, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell, MaskSymbol, isLastFilledCell } from 'react-native-confirmation-code-field';
import Header from '@src/components/Header/Header';
import { useAppContext, useColor } from '@src/context';
import mainStyle from '@src/constants/MainStyles';
import { BaseLayout } from '@src/components';
import { Formik } from 'formik';
import { Text } from '../../../blueprints/Text/Text';
import useVerificationCode from './useVerificationCode';

const VerificationCode = () => {
  const CELL_COUNT = 4;
  const { color } = useColor();
  const design = mainStyle(color);
  const { navigation } = useAppContext();
  const { initialValues, fieldValidation, handleSubmit } = useVerificationCode();

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
                        <Text key={index} style={{ ...design.textField, fontFamily: 'Montserrat-Medium', color: '#000000' }} onLayout={getCellOnLayoutHandler(index)}>{textChild}</Text>
                      </View>
                    );
                  };

                  return (
                    <View style={{ flex: 1, marginTop: 30, alignItems: 'center' }}>
                      <Text style={{ ...design.textField, paddingHorizontal: 20, textAlign: 'center', marginVertical: 10 }}>
                        Enter the OTP sent to you by SMS
                      </Text>

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
                        <Text preset='h4'>Didn't receive an OTP? </Text>
                        <TouchableOpacity style={{ borderBottomWidth: 1 }} onPress={() => { }}>
                          <Text preset='h4'>Resend now</Text>
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