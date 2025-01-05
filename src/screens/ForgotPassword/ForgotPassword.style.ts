import { StyleSheet } from 'react-native';
import { Palette } from '@src/utils';

export const ForgotPasswordStyles = ({ textColor, backgroundColor, primaryColor }: Palette) =>
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
        inputLabel: {
            fontSize: 16,
            fontWeight: '600',
            marginBottom: 8,
            color: textColor,
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#E6E6E6',
            borderRadius: 8,
            paddingHorizontal: 16,
            height: 48,
        },
        input: {
            flex: 1,
            color: textColor,
            fontSize: 16,
            paddingRight: 8,
        },
        errorText: {
            color: '#FF0000',
            fontSize: 12,
            marginTop: 4,
        },
        confirmButton: {
            backgroundColor: primaryColor,
            padding: 12,
            borderRadius: 8,
            alignItems: 'center',
            marginTop: 30,
        },
        confirmButtonDisabled: {
            backgroundColor: '#999999',
        },
        buttonText: {
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight: '500',
        },
    });

