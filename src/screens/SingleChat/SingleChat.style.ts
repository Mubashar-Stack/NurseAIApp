import { StyleSheet } from 'react-native';
import { Palette } from '@src/utils';

export const SingleChatStyles = ({ textColor, backgroundColor, Tertiary }: Palette) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F9F9F9',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      backgroundColor: '#F9F9F9',
      borderBottomWidth: 1,
      borderBottomColor: '#F2F2F2',
    },
    backButton: {
      marginRight: 12,
    },
    userInfo: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: '#E1E1E1',
      marginRight: 12,
    },
    userName: {
      fontSize: 16,
      fontWeight: '600',
      color: textColor,
    },
    headerActions: {
      flexDirection: 'row',
      gap: 20,
    },
    chatContainer: {
      flex: 1,
      padding: 16,
      backgroundColor: '#F9F9F9',
    },
    messageWrapper: {
      marginBottom: 16,
      maxWidth: '75%',
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    userMessage: {
      alignSelf: 'flex-end',
    },
    receiverMessage: {
      alignSelf: 'flex-start',
    },
    messageBubble: {
      padding: 12,
      borderRadius: 20,
    },
    userBubble: {
      backgroundColor: '#000000',
      borderBottomRightRadius: 4,
    },
    receiverBubble: {
      backgroundColor: '#F2F2F2',
      borderBottomLeftRadius: 4,
    },
    userText: {
      color: '#FFFFFF',
      fontSize: 14,
    },
    receiverText: {
      color: textColor,
      fontSize: 14,
    },
    inputContainer: {
      padding: 8,
      backgroundColor: '#F9F9F9',
      borderTopWidth: 1,
      borderTopColor: '#F2F2F2',
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Tertiary,
      borderRadius: 10,
      paddingHorizontal: 16,
      paddingVertical: 2,
    },
    input: {
      flex: 1,
      marginHorizontal: 8,
      fontSize: 16,
      color: textColor,
      maxHeight: 100,
    },
    inputActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    sendButton: {
      backgroundColor: '#000000',
      borderRadius: 20,
      padding: 8,
    },
    attachmentBubble: {
      padding: 16,
      backgroundColor: '#666666',
      borderRadius: 20,
    },
    attachmentText: {
      color: '#FFFFFF',
      fontSize: 14,
    },
    messageTime: {
      fontSize: 12,
      color: '#8E8E93',
      marginTop: 4,
      alignSelf: 'flex-end',
    },
    modal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 22,
      justifyContent: 'center',
      alignItems: 'center',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    modalItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
    },
    modalItemText: {
      marginLeft: 10,
      fontSize: 16,
      color: '#000000',
    },
    recordingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#7C3AED',
      borderRadius: 24,
      padding: 12,
      margin: 8,
    },
    recordingIndicator: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: '#FF0000',
      marginRight: 8,
    },
    recordingWaveform: {
      flex: 1,
      height: 40,
      marginHorizontal: 12,
    },
    recordingDuration: {
      color: '#FFFFFF',
      fontSize: 16,
      marginHorizontal: 12,
    },
    stopRecordingButton: {
      padding: 8,
    },
    audioPlayerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#1F2937',
      borderRadius: 24,
      padding: 12,
      margin: 8,
    },
    audioProgress: {
      flex: 1,
      height: 4,
      backgroundColor: '#4B5563',
      borderRadius: 2,
      marginHorizontal: 12,
    },
    audioProgressFill: {
      height: '100%',
      backgroundColor: '#7C3AED',
      borderRadius: 2,
    },
    audioControls: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    playButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: '#7C3AED',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 8,
    },
    audioDuration: {
      color: '#FFFFFF',
      fontSize: 14,
      marginHorizontal: 8,
    },
    audioActions: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 12,
    },
    deleteButton: {
      padding: 8,
      marginRight: 8,
    },
    sendAudioButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: '#7C3AED',
      justifyContent: 'center',
      alignItems: 'center',
    },
    waveformContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 8,
    },
    waveformBar: {
      width: 3,
      backgroundColor: '#FFFFFF',
      marginHorizontal: 1,
    },
  });

