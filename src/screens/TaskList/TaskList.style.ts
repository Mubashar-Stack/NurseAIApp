import { StyleSheet } from 'react-native';
import { Palette } from '@src/utils';
import { scaleHeight, scaleWidth } from '@src/utils';

export const TaskListStyles = ({ textColor, backgroundColor, primaryColor }: Palette) =>
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
            borderBottomWidth: 1,
            borderBottomColor: '#E0E0E0',
        },
        headerLeft: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        backButton: {
            // padding: 8,
        },
        shiftInfo: {
            marginLeft: scaleWidth(5),
            flexDirection: 'row',
            alignItems: 'center',
        },
        shiftDetails: {
            marginLeft: scaleWidth(5),
        },
        completeTaskButton: {
            backgroundColor: '#BE0B31',
            borderRadius: 10,
            paddingHorizontal: 16,
            paddingVertical: 8,
        },
        completeTaskButtonText: {
            color: '#FFFFFF',
            fontSize: 12,
            fontWeight: '600',
        },
        content: {
            flex: 1,
            padding: 16,
        },
        titleContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
        },
        title: {
            fontSize: 24,
            fontWeight: '600',
            color: textColor,
        },
        taskList: {
            flex: 1,
        },
        taskItem: {
            flexDirection: 'row',
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: '#E0E0E0',
        },
        avatar: {
            width: 70,
            height: 70,
            borderRadius: 50,
            backgroundColor: '#E0E0E0',
            marginRight: 16,
            objectFit: 'cover',
        },
        taskDetails: {
            flex: 1,
            marginTop: 10
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
            lineHeight: 20,
        },
        bottomNav: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: 16,
            borderTopWidth: 1,
            borderTopColor: '#E0E0E0',
            backgroundColor: backgroundColor,
        },
        bottomNavItem: {
            alignItems: 'center',
        },
        bottomNavText: {
            fontSize: 12,
            marginTop: 4,
            color: textColor,
        },
        loadingContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        noTasksContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 32,
        },
        noTasksText: {
            fontSize: 18,
            color: '#666666',
            marginTop: 16,
        },
    });

