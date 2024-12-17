import { StyleSheet } from 'react-native';
import { Palette } from '@src/utils';
import { scaleHeight, scaleWidth } from '@src/utils';

export const CompleteTaskStyles = ({ textColor, backgroundColor }: Palette) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: backgroundColor,
        },
        mainView: {
            flex: 1,
            backgroundColor: backgroundColor,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 16,
            backgroundColor: backgroundColor,
            // borderBottomWidth: 1,
            // borderBottomColor: '#E0E0E0',
        },
        headerLeft: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        headerTitle: {
            fontSize: 20,
            fontWeight: '600',
            color: textColor,
            marginLeft: 16,
        },
        clearButton: {
            paddingVertical: 8,
            paddingHorizontal: 16,
        },
        clearButtonText: {
            color: textColor,
            fontSize: 14,
        },
        content: {
            flex: 1,
            paddingBottom: scaleHeight(40),
        },
        taskItem: {
            flexDirection: 'row',
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: '#E0E0E0',
            alignItems: 'flex-start',
        },
        avatar: {
            width: 60,
            height: 60,
            borderRadius: 8,
            backgroundColor: '#E0E0E0',
            marginRight: 16,
        },
        taskDetails: {
            flex: 1,
        },
        patientName: {
            fontSize: 16,
            fontWeight: '600',
            color: textColor,
            marginBottom: 4,
        },
        medication: {
            fontSize: 14,
            color: '#666666',
            marginBottom: 4,
            lineHeight: 20,
        },
        date: {
            fontSize: 14,
            color: '#666666',
        },
        loadingContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        emptyContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 24,
        },
        emptyIcon: {
            marginBottom: 16,
        },
        emptyText: {
            fontSize: 16,
            color: '#666666',
            textAlign: 'center',
        }
    });

