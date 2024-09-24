import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell, MaskSymbol, isLastFilledCell } from 'react-native-confirmation-code-field';
import Header from '@src/components/Header/Header';
import mainStyle from '@src/constants/MainStyles';
import { useAppContext } from '@src/context';
import { Screen } from '../../navigation/appNavigation.type';

const VerificationCode = () => {
  const CELL_COUNT = 4;
  const { navigation } = useAppContext();
  const [value, setValue] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(59);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });

  const renderCell = ({ index, symbol, isFocused }: any) => {
    let textChild = null;
    if (symbol) {
      textChild = (
        <MaskSymbol
          maskSymbol="*"
          isLastFilledCell={isLastFilledCell({ index, value })}>
          {symbol}
        </MaskSymbol>
      );
    } else if (isFocused) {
      textChild = <Cursor />;

    }
    return (
      <View style={{ ...mainStyle.textView, width: '16%', margin: 4, borderRadius: 16, justifyContent: 'center', alignItems: 'center' }}>
        <Text key={index} style={{ ...mainStyle.textField, fontFamily: 'Montserrat-Medium', color: '#000000' }} onLayout={getCellOnLayoutHandler(index)}>{textChild}</Text>
      </View>
    );
  };

  useEffect(() => {
    if (secondsLeft <= 0) {
      return;
    }

    const intervalId = setInterval(() => {
      setSecondsLeft(secondsLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [secondsLeft]);

  return (
    <View style={mainStyle.mainView}>
      <View style={mainStyle.headerView}>
        <Header onPress={() => navigation.goBack()} title='Verification Code' />
      </View>
      <View style={mainStyle.subView}>
        <View style={{ flex: 1, width: '100%', alignSelf: 'center', marginTop: 10 }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
              <View style={{ flex: 1, marginTop: 30, alignItems: 'center' }}>
                <Text style={{ ...mainStyle.textField, paddingHorizontal: 20, textAlign: 'center', marginVertical: 10 }}>Enter the OTP sent you by the SMS to 123456778</Text>
                <CodeField ref={ref} {...props} value={value} onChangeText={setValue} cellCount={CELL_COUNT} keyboardType="number-pad" textContentType="oneTimeCode" renderCell={renderCell} />

                <TouchableOpacity style={{ ...mainStyle.footerBtn, marginTop: 50 }} onPress={() => { navigation.navigate(Screen.RESET_PASSWORD) }}>
                  <Text style={mainStyle.footerBtnTxt}>Verify</Text>
                </TouchableOpacity>
                <View style={{ ...styles.DontHaveView, flexDirection: 'row' }}>
                  <Text style={{ ...styles.DontHaveText, }}>Don't receive an OTP? </Text>
                  <TouchableOpacity style={{ borderBottomWidth: 1 }} onPress={() => { }} >
                    <Text style={styles.DontHaveText}>Resend now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  remembermeView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  checkBoxView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  DontHaveView: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  DontHaveText: {
    fontSize: 16,
    color: '#000000',

  },
});
export default VerificationCode;