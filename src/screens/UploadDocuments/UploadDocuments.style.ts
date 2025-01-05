import { StyleSheet } from 'react-native';
import { Palette } from '@src/utils';
import { scaleHeight } from '@src/utils';

export const UploadDocumentsStyles = ({ textColor, backgroundColor, primaryColor }: Palette) =>
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
            backgroundColor: backgroundColor,
        },
        headerTitle: {
            fontSize: 24,
            fontWeight: '600',
            marginLeft: 30,
            color: textColor,
        },
        content: {
            flex: 1,
            padding: 16,
        },
        sectionTitle: {
            fontSize: 16,
            fontWeight: '500',
            color: textColor,
            marginBottom: 8,
        },
        uploadBox: {
            borderWidth: 1,
            borderColor: '#CCCCCC',
            borderStyle: 'dashed',
            borderRadius: 8,
            height: scaleHeight(130),
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: scaleHeight(20),
            backgroundColor: '#E6E6E6',
            padding: 16,
        },
        uploadBoxSuccess: {
            borderColor: '#4CAF50',
            borderStyle: 'solid',
        },
        uploadText: {
            fontSize: 14,
            textAlign: 'center',
            marginTop: 8,
            color: textColor,
        },
        description: {
            fontSize: 14,
            lineHeight: 20,
            color: '#666666',
            marginTop: 16,
        },
        saveButton: {
            backgroundColor: primaryColor,
            padding: 16,
            borderRadius: 8,
            alignItems: 'center',
            marginTop: 'auto',
            marginBottom: 16,
        },
        saveButtonDisabled: {
            backgroundColor: '#999999',
        },
        buttonText: {
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight: '500',
        },
        actionSheetItem: {
            padding: 16,
            flexDirection: 'row',
            alignItems: 'center',
        },
        actionSheetText: {
            fontSize: 16,
            marginLeft: 12,
            color: textColor,
        },
    });

