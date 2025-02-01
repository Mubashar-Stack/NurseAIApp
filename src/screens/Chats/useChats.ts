import { useAppContext } from '@src/context';
import { ChatsStyles } from './Chats.style';
import { useState, useEffect, useCallback } from 'react';
import { Screen } from '../../navigation/appNavigation.type';
import { fetchChats, ChatRoom } from '../../api/chat';
import { showErrorToast } from '@src/utils';
import { useSelector } from 'react-redux';
import { useVoiceInput } from '@src/context/VoiceInputContext';

const useChats = () => {
  const { color, navigation } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [chats, setChats] = useState<ChatRoom[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const token = useSelector((state: any) => state.auth.isToken);
  const { voiceInputText, isListening, startVoiceInput, stopVoiceInput } = useVoiceInput();
  const [activeField, setActiveField] = useState<'search' | null>(null);

  const loadChats = useCallback(async () => {
    try {
      const response = await fetchChats(token);
      if (response.status) {
        setChats(response.data.map(item => item.chatroom));
      } else {
        throw new Error(response.message);
      }
    } catch (error: any) {
      console.error('Error fetching chats:', error);
      showErrorToast(error?.message || 'Failed to load chats', 2000);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, [token]);

  useEffect(() => {
    loadChats();
  }, [loadChats]);

  useEffect(() => {
    if (voiceInputText && activeField === 'search') {
      setSearchQuery(voiceInputText);
      setActiveField(null);
    }
  }, [voiceInputText, activeField]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const handleVoiceSearch = async () => {
    if (isListening) {
      await stopVoiceInput();
    } else {
      setActiveField('search');
      await startVoiceInput();
    }
  };

  const filteredChats = chats.filter(chat =>
    chat.other_user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openChat = (chatroom: any) => {
    console.log("🚀 ~ openChat ~ chatroom:", chatroom)
    //@ts-ignore
    navigation.navigate(Screen.SINGLE_CHAT, { chatroom });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadChats();
  };

  return {
    navigation,
    styles: ChatsStyles(color),
    chats: filteredChats,
    searchQuery,
    openChat,
    handleSearch,
    isLoading,
    refreshing,
    handleRefresh,
    handleVoiceSearch,
    isListening,
    activeField,
  };
};

export default useChats;

