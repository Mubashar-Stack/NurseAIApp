import { StyleSheet } from 'react-native';
import { Palette } from '@src/utils';

export const AccountSettingsStyles = (color: Palette) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.backgroundColor,
        },
        contentContainer: {
            flex: 1,
            padding: 16,
        },
        avatarContainer: {
            alignItems: 'center',
            marginVertical: 24,
        },
        avatar: {
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: color.Tertiary,
            overflow: 'hidden',
        },
        editText: {
            marginTop: 12,
            color: color.textColor,
            fontSize: 16,
        },
        inputContainer: {
            marginBottom: 16,
        },
        input: {
            backgroundColor: color.Tertiary,
            borderRadius: 8,
            padding: 12,
            color: color.textColor,
            marginTop: 8,
        },
        saveButton: {
            backgroundColor: '#000',
            borderRadius: 8,
            padding: 16,
            alignItems: 'center',
            marginTop: 24,
        },
        saveButtonText: {
            color: 'white',
            fontSize: 16,
            fontWeight: '600',
        },
        deleteButton: {
            alignItems: 'center',
            marginTop: 16,
            padding: 16,
        },
        deleteButtonText: {
            color: color.textColor,
            fontSize: 16,
        },
        nameContainer: {
            flexDirection: 'row',
            gap: 16,
        },
        halfWidth: {
            flex: 1,
        },
        centerContent: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        disabledButton: {
            opacity: 0.7,
        },

    });