import { StyleSheet } from 'react-native';
import { Palette } from '@src/utils';
import { scaleHeight, scaleWidth } from '@src/utils';

export const AddTaskStyles = ({ textColor, backgroundColor, Tertiary }: Palette) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: backgroundColor,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 16,
            backgroundColor: backgroundColor,
        },
        headerLeft: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        backButton: {
            padding: 8,
        },
        shiftInfo: {
            marginLeft: scaleWidth(10),
            flexDirection: 'row',
            alignItems: 'center',
        },
        shiftDetails: {
            marginLeft: scaleWidth(10),
        },
        completeTaskButton: {
            backgroundColor: '#000000',
            borderRadius: 10,
            paddingHorizontal: 16,
            paddingVertical: 8,
        },
        completeTaskText: {
            color: '#FFFFFF',
            fontSize: 12,
            fontWeight: '600',
        },
        content: {
            flex: 1,
            padding: 16,
            backgroundColor: backgroundColor,
        },
        title: {
            fontSize: 24,
            fontWeight: '600',
            color: textColor,
            marginBottom: 24,
        },
        inputContainer: {
            marginBottom: 16,
        },
        label: {
            fontSize: 16,
            fontWeight: '500',
            color: textColor,
            marginBottom: 8,
        },
        inputWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: Tertiary,
            borderRadius: 12,
            paddingHorizontal: 16,
            height: 48,
        },
        input: {
            flex: 1,
            color: textColor,
            fontSize: 16,
            paddingVertical: 8,
        },
        textArea: {
            height: 120,
            paddingTop: 12,
            textAlignVertical: 'top',
        },
        micButton: {
            padding: 8,
        },
        rowContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 16,
        },
        halfWidth: {
            width: '48%',
        },
        errorText: {
            color: '#FF0000',
            fontSize: 12,
            marginTop: 4,
        },
        addButton: {
            backgroundColor: '#000000',
            borderRadius: 12,
            padding: 16,
            alignItems: 'center',
            marginTop: 24,
        },
        addButtonDisabled: {
            opacity: 0.5,
        },
        addButtonText: {
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight: '600',
        },
        dropdown: {
            backgroundColor: '#F5F5F5',
            borderRadius: 12,
            paddingHorizontal: 16,
            height: 48,
            justifyContent: 'center',
        },
        dropdownText: {
            fontSize: 16,
            color: textColor,
        },
        placeholderText: {
            color: '#999999',
        },
    });

