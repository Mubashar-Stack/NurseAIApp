import Header from '@src/components/Header/Header';
import mainStyle from '@src/constants/MainStyles';
import { useAppContext } from '@src/context';
import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Screen } from '../../navigation/appNavigation.type';

const ForgotPassword = () => {
	const [mobileNumber, setMobileNumber] = useState('');
	const { navigation } = useAppContext();

	return (
		<View style={mainStyle.mainView}>
			<View style={mainStyle.headerView}>
				<Header onPress={() => navigation.goBack()} title={'Forgotten Password'} />
			</View>
			<View style={mainStyle.subView}>
				<ScrollView>
					<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
						<View style={{ marginBottom: 16, }}>
							<Text style={mainStyle.textField}>Mobile Number</Text>
							<View style={mainStyle.textView}>
								<TextInput contextMenuHidden={true} selectTextOnFocus={true} style={{ ...mainStyle.inputText }} keyboardType='number-pad' placeholder='Enter your number'
									placeholderTextColor='grey' editable={true} value={mobileNumber} maxLength={10} onChangeText={val => { setMobileNumber(val) }}
									blurOnSubmit={false} underlineColorAndroid="transparent" />
							</View>
						</View>
						<TouchableOpacity style={mainStyle.footerBtn} onPress={() => { navigation.navigate(Screen.VERIFICATION_CODE) }}>
							<Text style={mainStyle.footerBtnTxt}>Confirm</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
		</View>
	);
};

export default ForgotPassword;