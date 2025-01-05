import { StyleSheet } from 'react-native';
import { Palette } from '@src/utils';

export const ResetPasswordStyles = ({ textColor, backgroundColor, Tertiary }: Palette) =>
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
            backgroundColor: Tertiary,
            borderRadius: 8,
            paddingHorizontal: 16,
            height: 48,
            marginBottom: 16,
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
            marginTop: -12,
            marginBottom: 16,
        },
        submitButton: {
            backgroundColor: '#002A65',
            padding: 16,
            borderRadius: 8,
            alignItems: 'center',
            marginTop: 16,
        },
        submitButtonDisabled: {
            backgroundColor: '#999999',
        },
        buttonText: {
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight: '500',
        },
    });

