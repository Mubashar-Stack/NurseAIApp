import React, { useRef } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Image, RefreshControl, ActivityIndicator } from 'react-native';
import { Text } from '@app/blueprints';
import useChats from './useChats';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { formatMessageTime } from '@src/utils';
import { BaseLayout } from '@src/components';

const ChatsScreen = () => {
  const {
    styles,
    chats,
    searchQuery,
    openChat,
    handleSearch,
    isLoading,
    refreshing,
    handleRefresh,
    handleVoiceSearch,
    isListening,
    activeField,
  } = useChats();

  const searchInputRef = useRef<TextInput>(null);

  const renderChatItem = ({ item: chat }: any) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => openChat(chat)}
    >
      {chat.other_user.user_photo ? (
        <Image
          source={{ uri: chat.other_user.user_photo }}
          style={styles.avatar}
          defaultSource={require('@src/assets/images/placeholder.webp')}
        />
      ) : (
        <View style={styles.avatar} />
      )}
      <View style={styles.chatInfo}>
        <View style={styles.chatHeader}>
          <Text style={styles.userName}>{chat.other_user.name}</Text>
          <Text style={styles.timestamp}>
            {formatMessageTime(chat.latest_message.created_at)}
          </Text>
        </View>
        <Text style={styles.messagePreview} numberOfLines={1}>
          {chat.latest_message.content}
        </Text>
      </View>
      {chat.unread_count > 0 && (
        <View style={styles.unreadContainer}>
          <Text style={styles.unreadCount}>{chat.unread_count}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <BaseLayout>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#8E8E93" />
            <TextInput
              ref={searchInputRef}
              style={styles.searchInput}
              placeholder="Search"
              value={searchQuery}
              onChangeText={handleSearch}
              placeholderTextColor="#8E8E93"
              onFocus={() => activeField === 'search'}
            />
            <TouchableOpacity onPress={handleVoiceSearch}>
              <Ionicons
                name={isListening && activeField === 'search' ? "mic" : "mic-outline"}
                color="#8E8E93"
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>

        {isLoading ? (
          <View style={[styles.container, styles.centerContent]}>
            <ActivityIndicator size="large" color="#002A65" />
          </View>
        ) : (
          <FlatList
            data={chats}
            renderItem={renderChatItem}
            keyExtractor={(item) => item.id.toString()}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }
          />
        )}
      </View>
    </BaseLayout>
  );
};

export default React.memo(ChatsScreen);

