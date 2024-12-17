import { StyleSheet } from 'react-native';
import { Palette } from '@src/utils';

export const SelfiScreenStyles = ({ textColor, backgroundColor }: Palette) =>
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
            fontSize: 24,
            fontWeight: '600',
            marginLeft: 32,
        },
        content: {
            flex: 1,
            padding: 16,
        },
        title: {
            fontSize: 16,
            fontWeight: '500',
            marginBottom: 20,
        },
        cameraContainer: {
            aspectRatio: 1,
            overflow: 'hidden',
            borderRadius: 8,
            backgroundColor: '#E5E5E5',
        },
        camera: {
            flex: 1,
        },
        gridContainer: {
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
        },
        gridItem: {
            width: '33.33%',
            height: '33.33%',
            borderWidth: 0.5,
            borderColor: 'rgba(255, 255, 255, 0.5)',
        },
        captureButtonContainer: {
            alignItems: 'center',
            marginTop: 24,
            marginBottom: 24,
        },
        captureButton: {
            width: 64,
            height: 64,
            borderRadius: 32,
            borderWidth: 2,
            borderColor: '#000000',
            backgroundColor: 'transparent',
        },
        captureButtonInner: {
            width: 56,
            height: 56,
            borderRadius: 28,
            backgroundColor: '#000000',
            margin: 2,
        },
        description: {
            fontSize: 13,
            lineHeight: 20,
            marginBottom: 32,
            textAlign: 'left',
            paddingHorizontal: 16,
        },
        continueButton: {
            backgroundColor: '#000000',
            padding: 16,
            borderRadius: 8,
            alignItems: 'center',
            marginTop: 'auto',
        },
        continueButtonDisabled: {
            backgroundColor: '#999999',
        },
        buttonText: {
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight: '500',
        }
    });

