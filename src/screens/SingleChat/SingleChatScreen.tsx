import React from 'react';
import { View, ScrollView, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Text } from '@app/blueprints';
import useSingleChat from './useSingleChat';
import Feather from 'react-native-vector-icons/Feather';
import { useRoute } from '@react-navigation/native';
import Modal from 'react-native-modal';
import VoiceRecorder from './components/VoiceRecorder';
import AudioPlayer from './components/AudioPlayer';

const SingleChatScreen = () => {
  const route: any = useRoute();
  const chatroom = route.params?.chatroom;

  const {
    styles,
    navigation,
    messages,
    message,
    setMessage,
    handleSend,
    handleAttachment,
    handleVoiceMessage,
    isLoading,
    scrollViewRef,
    isUserMessage,
    otherUser,
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
  }: any = useSingleChat(chatroom);

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={24} color="#000000" />
        </TouchableOpacity>

        <View style={styles.userInfo}>
          {otherUser?.user_photo ? (
            <Image
              source={{ uri: otherUser.user_photo }}
              style={styles.avatar}
              defaultSource={require('@src/assets/images/placeholder.webp')}
            />
          ) : (
            <View style={styles.avatar} />
          )}
          <Text style={styles.userName}>{otherUser?.name}</Text>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity>
            <Feather name="phone" size={20} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="video" size={20} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="search" size={20} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.chatContainer}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((msg: any) => (
          <TouchableOpacity
            key={msg.id}
            onLongPress={() => handleLongPress(msg)}
            style={[
              styles.messageWrapper,
              isUserMessage(msg.sender.id) ? styles.userMessage : styles.receiverMessage,
            ]}
          >
            {msg.message_type === 'text' ? (
              <View
                style={[
                  styles.messageBubble,
                  isUserMessage(msg.sender.id) ? styles.userBubble : styles.receiverBubble,
                ]}
              >
                <Text
                  style={isUserMessage(msg.sender.id) ? styles.userText : styles.receiverText}
                >
                  {msg.content}
                </Text>
              </View>
            ) : msg.message_type === 'image' ? (
              <View style={styles.attachmentBubble}>
                <Image source={{ uri: msg.content }} style={styles.attachmentImage} />
                {uploadProgress[msg.content] !== undefined && uploadProgress[msg.content] < 100 && (
                  <View style={styles.uploadProgressContainer}>
                    <ActivityIndicator size="small" color="#FFFFFF" />
                    <Text style={styles.uploadProgressText}>{`${uploadProgress[msg.content]}%`}</Text>
                  </View>
                )}
              </View>
            ) : msg.message_type === 'audio' ? (
              <TouchableOpacity onPress={() => playAudio(msg.content)} style={styles.audioBubble}>
                <Feather name="play" size={24} color="#FFFFFF" />
                <Text style={styles.audioText}>Voice Message</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.attachmentBubble}>
                <Text style={styles.attachmentText}>
                  {msg.document ? 'Document' : 'Unsupported attachment'}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        {isRecording ? (
          <VoiceRecorder
            isRecording={isRecording}
            duration={recordingDuration}
            onStop={handleVoiceMessage}
            styles={styles}
          />
        ) : audioFile ? (
          <AudioPlayer
            duration={playbackDuration}
            currentTime={currentPlaybackTime}
            isPlaying={isPlaying}
            onPlay={playAudio}
            onDelete={deleteAudio}
            onSend={sendAudio}
            styles={styles}
          />
        ) : (
          <View style={styles.inputWrapper}>
            <TouchableOpacity>
              <Feather name="smile" size={24} color="#8E8E93" />
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder="Type message here"
              placeholderTextColor="#8E8E93"
              value={message}
              onChangeText={setMessage}
              multiline
            />

            <View style={styles.inputActions}>
              {message.trim() ? (
                <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
                  <Feather name="send" size={24} color="#FFFFFF" />
                </TouchableOpacity>
              ) : (
                <>
                  <TouchableOpacity onPress={handleAttachment}>
                    <Feather name="paperclip" size={24} color="#8E8E93" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleVoiceMessage}>
                    <Feather name="mic" size={24} color="#000000" />
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        )}
      </View>

      <Modal
        isVisible={showAttachmentSheet}
        onBackdropPress={() => setShowAttachmentSheet(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.modalItem} onPress={() => handleImagePicker('camera')}>
            <Feather name="camera" size={20} color="#000000" />
            <Text style={styles.modalItemText}>Take Picture</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalItem} onPress={() => handleImagePicker('gallery')}>
            <Feather name="image" size={20} color="#000000" />
            <Text style={styles.modalItemText}>Upload from gallery</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        isVisible={showMessageOptions}
        onBackdropPress={() => setShowMessageOptions(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.modalItem} onPress={handleDeleteMessage}>
            <Feather name="trash-2" size={20} color="#FF0000" />
            <Text style={styles.modalItemText}>Delete Message</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalItem} onPress={handleMarkAsUnread}>
            <Feather name="eye-off" size={20} color="#000000" />
            <Text style={styles.modalItemText}>Mark as Unread</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default React.memo(SingleChatScreen);

