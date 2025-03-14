import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Image,
    ActivityIndicator
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/FontAwesome6';
import axios from 'axios';
import { Images } from '@src/assets';
import { useVoiceInput } from '@src/context/VoiceInputContext';
import { useAppContext } from '@src/context';
import mainStyle from '@src/constants/MainStyles';
import Feather from 'react-native-vector-icons/Feather';
import { BaseLayout } from '@src/components';
import Clipboard from '@react-native-clipboard/clipboard';
import { showErrorToast, showSuccessToast } from '@src/utils';
import { Screen } from '../../navigation/appNavigation.type';
import Markdown from "react-native-markdown-display"



interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

const ChatScreen = () => {
    const { color, navigation }: any = useAppContext();
    const { voiceInputText, isListening, startVoiceInput, stopVoiceInput } = useVoiceInput();
    const design = mainStyle(color);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const flatListRef = useRef<FlatList>(null);
    const emailRef = useRef<TextInput>(null);

    useEffect(() => {
        if (voiceInputText) {
            setInputText(voiceInputText);
            setTimeout(() => {
                sendMessage()
            }, 200);
        }
    }, [voiceInputText]);

    const handleVoiceInput = async () => {
        if (isListening) {
            await stopVoiceInput();
        } else {
            await startVoiceInput();
        }
    };

    // Add initial welcome message
    useEffect(() => {
        setMessages([
            {
                id: '1',
                text: 'Hello! I\'m your medical assistant. How can I help you today?',
                sender: 'bot',
                timestamp: new Date()
            }
        ]);
    }, []);

    const sendMessage = async () => {
        if (inputText.trim() === '') return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputText,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prevMessages => [...prevMessages, userMessage]);
        setInputText('');
        setIsLoading(true);

        try {
            const response = await axios.post(
                'https://technlogics.co/api/openai-query',
                {
                    query: inputText
                },
                {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Token b9b28943d8e92fa4e77c8fa26da4bfdef0d48f78',
                        'Test': 'yes',
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data && response.data.status && response.data.data) {
                const botMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    text: response.data.data,
                    sender: 'bot',
                    timestamp: new Date()
                };

                setMessages(prevMessages => [...prevMessages, botMessage]);
            } else {
                // Handle error in response
                const errorMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    text: "I'm sorry, I couldn't process your request. Please try again.",
                    sender: 'bot',
                    timestamp: new Date()
                };

                setMessages(prevMessages => [...prevMessages, errorMessage]);
            }
        } catch (error) {
            console.error('Error sending message:', error);

            // Add error message
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: "I'm sorry, there was an error connecting to the service. Please try again later.",
                sender: 'bot',
                timestamp: new Date()
            };

            setMessages(prevMessages => [...prevMessages, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = (message: any) => {
        try {
            Clipboard.setString(message);
            showSuccessToast('Message copied to clipboard', 2000);
        } catch (error) {
            showErrorToast('Failed to copy message', 2000);
        }
    };

    const markdownStyles: any = {
        body: {
            color: "#333",
            fontSize: 14,
            lineHeight: 20,
        },
        heading1: {
            fontSize: 20,
            fontWeight: "bold",
            marginTop: 8,
            marginBottom: 4,
            color: "#002B49",
        },
        heading2: {
            fontSize: 18,
            fontWeight: "bold",
            marginTop: 8,
            marginBottom: 4,
            color: "#002B49",
        },
        heading3: {
            fontSize: 16,
            fontWeight: "bold",
            marginTop: 8,
            marginBottom: 4,
            color: "#002B49",
        },
        list_item: {
            marginBottom: 4,
        },
        bullet_list: {
            marginVertical: 8,
        },
        ordered_list: {
            marginVertical: 8,
        },
        code_block: {
            backgroundColor: "#F5F5F5",
            padding: 8,
            borderRadius: 4,
            fontFamily: "monospace",
            fontSize: 12,
        },
        code_inline: {
            backgroundColor: "#F5F5F5",
            padding: 2,
            borderRadius: 2,
            fontFamily: "monospace",
            fontSize: 12,
        },
        blockquote: {
            borderLeftWidth: 4,
            borderLeftColor: "#002B49",
            paddingLeft: 8,
            marginVertical: 8,
            fontStyle: "italic",
        },
        link: {
            color: "#0066CC",
            textDecorationLine: "underline",
        },
        strong: {
            fontWeight: "bold",
        },
        em: {
            fontStyle: "italic",
        },
    }

    const renderMessageItem = ({ item }: { item: Message }) => {
        const isUser = item.sender === 'user';

        return (
            <View style={[styles.messageContainer, isUser ? styles.userMessageContainer : styles.botMessageContainer]}>
                {!isUser && (
                    <View style={styles.avatarContainer}>
                        <Image
                            source={Images.NURSE_IMAGE}
                            style={styles.avatar}
                            defaultSource={Images.NURSE_IMAGE}
                        />
                    </View>
                )}
                <View style={[styles.messageBubble, isUser ? styles.userBubble : styles.botBubble]}>
                    {isUser ? <Text style={[styles.messageText, isUser ? styles.userMessageText : styles.botMessageText]}>
                        {item?.text}
                    </Text> :
                        <Markdown style={markdownStyles}>{item.text}</Markdown>}
                    <View style={styles.messageActions}>
                        <TouchableOpacity style={styles.actionButton} onPress={() => copyToClipboard(item.text)}>
                            <Feather name="copy" size={16} color={"#002B49"} />
                            <Text style={{ color: "#002B49", fontSize: 8 }}>Copy</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate(Screen.DETAIL_RESPONSE_SCREEN, { message: item.text })}>
                            <SimpleLineIcons name="share-from-square" size={16} color={"#002B49"} />
                            <Text style={{ color: "#002B49", fontSize: 8 }}>Ask AI</Text>
                        </TouchableOpacity>

                    </View>
                </View>
                {isUser && (
                    <View style={styles.avatarContainer}>
                        <Image
                            source={Images.NURSE_IMAGE}
                            style={styles.avatar}
                            defaultSource={Images.NURSE_IMAGE}
                        />
                    </View>
                )}
            </View>
        );
    };

    return (
        <BaseLayout>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign name="close" size={24} color="#FFF" />
                </TouchableOpacity>
            </View>

            {/* Chat Messages */}
            <FlatList
                ref={flatListRef}
                data={messages}
                renderItem={renderMessageItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.messagesContainer}
                onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
            />

            {/* Loading indicator */}
            {isLoading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color="#002B49" />
                    <Text style={styles.loadingText}>Thinking...</Text>
                </View>
            )}

            {/* Input Area */}
            <View style={styles.inputContainer}>
                <View style={{ ...design.textView, width: '85%', height: 60 }}>
                    <TextInput
                        ref={emailRef}
                        contextMenuHidden={true}
                        selectTextOnFocus={true}
                        style={{ ...design.inputText, textAlign: 'left', width: '70%' }}
                        keyboardType="email-address"
                        placeholder="Type your message here"
                        placeholderTextColor={color?.textColor}
                        editable={true}
                        value={inputText}
                        onChangeText={setInputText}
                        blurOnSubmit={false}
                        underlineColorAndroid="transparent"
                        multiline
                    // onFocus={() => setActiveField('email')}
                    />
                    <TouchableOpacity onPress={() => handleVoiceInput()}>
                        <Ionicons name={isListening ? "mic" : "mic-outline"} color={color.textColor} size={24} />
                    </TouchableOpacity>

                </View>
                <View style={styles.inputActions}>
                    <TouchableOpacity
                        style={[styles.sendButton, inputText.trim() === '' ? styles.sendButtonDisabled : null]}
                        onPress={sendMessage}
                        disabled={inputText.trim() === ''}
                    >
                        <Ionicons name="send" size={24} color="#FFF" />
                    </TouchableOpacity>
                </View>
            </View>
        </BaseLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#002B49',
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerIcon: {
        width: 32,
        height: 32,
        tintColor: '#FFF',
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 8,
    },
    closeButton: {
        padding: 4,
    },
    messagesContainer: {
        paddingHorizontal: 0,
        paddingVertical: 8,
    },
    messageContainer: {
        flexDirection: 'row',
        marginVertical: 8,
        alignItems: 'flex-start',
    },
    userMessageContainer: {
        justifyContent: 'flex-end',
    },
    botMessageContainer: {
        justifyContent: 'flex-start',
    },
    avatarContainer: {
        marginHorizontal: 8,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    messageBubble: {
        maxWidth: '80%',
        padding: 8,
        borderRadius: 16,
        marginBottom: 4,
    },
    userBubble: {
        backgroundColor: '#002B49',
        borderTopRightRadius: 4,
    },
    botBubble: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 4,
    },
    messageText: {
        fontSize: 14,
        lineHeight: 20,
    },
    userMessageText: {
        color: '#fff',
    },
    botMessageText: {
        color: '#333',
    },
    messageActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 8,
    },
    actionButton: {
        padding: 4,
        marginHorizontal: 2,
    },
    likeDislikeContainer: {
        flexDirection: 'row',
        marginLeft: 8,
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    loadingText: {
        marginLeft: 8,
        color: '#002B49',
        fontSize: 14,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        marginBottom: 15
    },
    input: {
        flex: 1,
        backgroundColor: '#F8F9FA',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        maxHeight: 100,
    },
    inputActions: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8,
        marginTop: 15
    },
    inputButton: {
        padding: 8,
    },
    sendButton: {
        backgroundColor: '#002B49',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    sendButtonDisabled: {
        backgroundColor: '#B3B3B3',
    },
});

export default ChatScreen;