import { StyleSheet } from 'react-native';
import { Palette } from '@src/utils';
import { scaledSize } from '@src/utils';

export const VerificationCodeStyles = ({ textColor, backgroundColor, primaryColor }: Palette) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: backgroundColor,
        },
        header: {
            paddingHorizontal: 16,
            paddingVertical: 12,
            flexDirection: 'row',
            alignItems: 'center',
        },
        headerTitle: {
            fontSize: 16,
            fontWeight: '500',
            marginLeft: 32,
            color: textColor,
        },
        content: {
            flex: 1,
            padding: 16,
        },
        title: {
            fontSize: 20,
            fontWeight: '600',
            textAlign: 'center',
            marginBottom: scaledSize(30),
            color: textColor,
        },
        otpContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: scaledSize(30),
        },
        otpInput: {
            width: scaledSize(50),
            height: scaledSize(50),
            borderBottomWidth: 2,
            borderColor: '#CCC',
            // borderRadius: 8,
            marginHorizontal: 4,
            textAlign: 'center',
            fontSize: 24,
            color: '#002A65',
        },
        otpInputFocused: {
            borderColor: '#002A65',
        },
        errorText: {
            color: '#FF0000',
            fontSize: 14,
            marginTop: 8,
            textAlign: 'center',
        },
        verifyButton: {
            backgroundColor: primaryColor,
            padding: 16,
            borderRadius: 8,
            alignItems: 'center',
            marginVertical: scaledSize(30),
            width: '100%',
        },
        verifyButtonDisabled: {
            backgroundColor: '#999999',
        },
        buttonText: {
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight: '500',
        },
        resendContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        resendText: {
            fontSize: 16,
            color: textColor,
        },
        resendButton: {
            marginLeft: 4,
        },
        resendButtonText: {
            fontSize: 16,
            color: primaryColor,
            fontWeight: '600',
        },
    });

