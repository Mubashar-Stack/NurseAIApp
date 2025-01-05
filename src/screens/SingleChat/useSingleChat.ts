import { useAppContext } from '@src/context';
import { SingleChatStyles } from './SingleChat.style';
import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchChatMessages, ChatMessage, sendMessage, deleteMessage, markAsUnread } from '../../api/chat';
import { showErrorToast, showSuccessToast } from '@src/utils';
import { useSelector } from 'react-redux';
import { PermissionsAndroid, Platform } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import axios from 'axios';
// import { uploadFile } from '../../api/upload';

const audioRecorderPlayer = new AudioRecorderPlayer();

const useSingleChat = (chatroom: any) => {
  const { color, navigation } = useAppContext();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAttachmentSheet, setShowAttachmentSheet] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [audioFile, setAudioFile] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackDuration, setPlaybackDuration] = useState(0);
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);
  const [selectedMessage, setSelectedMessage] = useState<ChatMessage | null>(null);
  const [showMessageOptions, setShowMessageOptions] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const scrollViewRef = useRef(null);
  const userId = useSelector((state: any) => state.auth.userInfo?.userId);
  const token = useSelector((state: any) => state.auth.isToken);

  const loadMessages = useCallback(async () => {
    try {
      const response = await fetchChatMessages(token, chatroom.id);
      if (response.results.status) {
        setMessages(response.results.data.reverse());
      }
    } catch (error: any) {
      console.error('Error fetching messages:', error);
      showErrorToast(error?.message || 'Failed to load messages', 2000);
    } finally {
      setIsLoading(false);
    }
  }, [chatroom.id]);

  useEffect(() => {
    loadMessages();
    markAllMessagesAsRead();
  }, [loadMessages]);


  const handleSend = async () => {
    if (message.trim() || audioFile) {
      try {
        let response;
        if (audioFile) {
          // const uploadResponse = await uploadFile(token, audioFile, 'audio');
          // response = await sendMessage(token, {
          //   receiver_id: chatroom.other_user.id,
          //   content: uploadResponse.url,
          //   message_type: 'audio',
          // });
          setAudioFile(null);
        } else {
          response = await sendMessage(token, {
            receiver_id: chatroom.other_user.id,
            content: message.trim(),
            message_type: 'text',
          });
        }
        if (response.status) {
          setMessage('');
          await loadMessages();
        }
      } catch (error: any) {
        console.error('Error sending message:', error);
        showErrorToast(error?.message || 'Failed to send message', 2000);
      }
    }
  };

  const handleAttachment = () => {
    setShowAttachmentSheet(true);
  };

  const handleImagePicker = async (type: 'camera' | 'gallery') => {
    setShowAttachmentSheet(false);
    // Implement image picking logic here
    // After picking the image:
    // try {
    //   const uploadResponse = await uploadFile(token, imagePath, 'image', (progress) => {
    //     setUploadProgress({ ...uploadProgress, [imagePath]: progress });
    //   });
    //   await sendMessage(token, {
    //     receiver_id: chatroom.other_user.id,
    //     content: uploadResponse.url,
    //     message_type: 'image',
    //   });
    //   await loadMessages();
    // } catch (error: any) {
    //   console.error('Error uploading image:', error);
    //   showErrorToast(error?.message || 'Failed to upload image', 2000);
    // }
  };

  const startRecording = async () => {
    if (Platform.OS === 'android') {
      try {
        //@ts-ignore
        const grants = await PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,]);

        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('Permissions granted');
        } else {
          console.log('All required permissions not granted');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }

    const result = await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener((e) => {
      setRecordingDuration(e.currentPosition);
    });
    console.log(result);
    setIsRecording(true);
  };

  const stopRecording = async () => {
    if (!isRecording) return;
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setIsRecording(false);
    setAudioFile(result);
    setPlaybackDuration(recordingDuration);
    setRecordingDuration(0);
  };

  const playAudio = async () => {
    if (!audioFile) return;
    if (isPlaying) {
      await audioRecorderPlayer.pausePlayer();
    } else {
      await audioRecorderPlayer.startPlayer(audioFile);
      audioRecorderPlayer.addPlayBackListener((e) => {
        setCurrentPlaybackTime(e.currentPosition);
        if (e.currentPosition === e.duration) {
          audioRecorderPlayer.stopPlayer();
          setIsPlaying(false);
        }
      });
    }
    setIsPlaying(!isPlaying);
  };

  const deleteAudio = () => {
    setAudioFile(null);
    setPlaybackDuration(0);
    setCurrentPlaybackTime(0);
  };

  const sendAudio = async () => {
    if (!audioFile) return;
    try {
      // const uploadResponse = await uploadFile(token, audioFile, 'audio', (progress) => {
      //   setUploadProgress({ ...uploadProgress, [audioFile]: progress });
      // });
      // await sendMessage(token, {
      //   receiver_id: chatroom.other_user.id,
      //   content: uploadResponse.url,
      //   message_type: 'audio',
      // });
      deleteAudio();
      await loadMessages();
    } catch (error: any) {
      console.error('Error uploading audio:', error);
      showErrorToast(error?.message || 'Failed to upload audio', 2000);
    }
  };

  const handleVoiceMessage = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleLongPress = (message: ChatMessage) => {
    setSelectedMessage(message);
    setShowMessageOptions(true);
  };

  const handleDeleteMessage = async () => {
    if (selectedMessage) {
      try {
        await deleteMessage(token, selectedMessage.id);
        await loadMessages();
        showSuccessToast('Message deleted', 2000);
      } catch (error: any) {
        console.error('Error deleting message:', error);
        showErrorToast(error?.message || 'Failed to delete message', 2000);
      }
    }
    setShowMessageOptions(false);
  };

  const handleMarkAsUnread = async () => {
    if (selectedMessage) {
      try {
        await markAsUnread(token, selectedMessage.id);
        showSuccessToast('Message marked as unread', 2000);
      } catch (error: any) {
        console.error('Error marking message as unread:', error);
        showErrorToast(error?.message || 'Failed to mark message as unread', 2000);
      }
    }
    setShowMessageOptions(false);
  };

  const isUserMessage = (senderId: number) => {
    return senderId === userId;
  };

  const markAllMessagesAsRead = useCallback(async () => {
    try {
      await axios.post(`https://technlogics.co/api/mark-all-read/${chatroom.id}`, null, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      console.log('All messages marked as read');
    } catch (error: any) {
      console.error('Error marking messages as read:', error);
    }
  }, [token]);

  return {
    color,
    navigation,
    styles: SingleChatStyles(color),
    messages,
    message,
    setMessage,
    handleSend,
    handleAttachment,
    handleVoiceMessage,
    isLoading,
    scrollViewRef,
    isUserMessage,
    otherUser: chatroom.other_user,
    showAttachmentSheet,
    setShowAttachmentSheet,
    handleImagePicker,
    isRecording,
    recordingDuration,
    audioFile,
    playAudio,
    isPlaying,
    playbackDuration,
    currentPlaybackTime,
    deleteAudio,
    sendAudio,
    handleLongPress,
    showMessageOptions,
    setShowMessageOptions,
    handleDeleteMessage,
    handleMarkAsUnread,
    uploadProgress,
  };
};

export default useSingleChat;

