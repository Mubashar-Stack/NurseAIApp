import React, { useState } from 'react'
import { View, Modal, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import { Text } from '@app/blueprints'
import { X, Send } from 'lucide-react-native'
import { sendMessage } from '../../api/chat'
import { useSelector } from 'react-redux'

interface ChatModalProps {
    isVisible: boolean
    onClose: () => void
    receiverId: number
}

export default function ChatModal({ isVisible, onClose, receiverId }: ChatModalProps) {
    const [message, setMessage] = useState('')
    const [isSending, setIsSending] = useState(false)
    const token = useSelector((state: any) => {
        return state.auth.isToken
    })

    const handleSendMessage = async () => {
        if (!message.trim()) return

        setIsSending(true)
        try {
            await sendMessage(token, {
                receiver_id: receiverId,
                content: message,
                message_type: 'text'
            })

            setMessage('')
            onClose();
        } catch (error) {
            console.error('Error sending message:', error)
        } finally {
            setIsSending(false)
        }
    }

    return (
        <Modal
            visible={isVisible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Chat</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <X size={24} color="#666" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.chatContainer}>
                        <View style={styles.emptyStateContainer}>
                            <Text style={styles.emptyStateText}>No messages yet</Text>
                            <Text style={styles.emptyStateSubtext}>
                                Start a conversation by sending a message below
                            </Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
                    >
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Type your message..."
                                placeholderTextColor="#666"
                                value={message}
                                onChangeText={setMessage}
                                multiline
                                maxLength={500}
                                numberOfLines={4}
                            />
                            <TouchableOpacity
                                style={[
                                    styles.sendButton,
                                    (!message.trim() || isSending) && styles.sendButtonDisabled
                                ]}
                                onPress={handleSendMessage}
                                disabled={!message.trim() || isSending}
                            >
                                <Send
                                    size={24}
                                    color={!message.trim() || isSending ? '#666' : '#002B49'}
                                />
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 16,
        width: '90%',
        maxWidth: 400,
        maxHeight: '80%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000',
    },
    closeButton: {
        padding: 4,
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        width: '100%',
    },
    chatContainer: {
        padding: 16,
        minHeight: 200,
        maxHeight: 400,
    },
    emptyStateContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    emptyStateText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#666',
        marginBottom: 8,
    },
    emptyStateSubtext: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    inputContainer: {
        width: '93%',
        marginTop: 10,
        flexDirection: 'row',
        alignSelf: 'center',
        borderRadius: 16,
        backgroundColor: '#E6E6E6',
        paddingHorizontal: 10,
        margin: 10,
        height: 52,
        alignItems: 'center', justifyContent: 'space-between'
    },
    input: {
        fontSize: 14,
        fontWeight: '400',
        width: '86%',
    },
    sendButton: {
        // backgroundColor: '#002B49',
        width: 45,
        height: 45,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 30
    },
    sendButtonDisabled: {
        backgroundColor: '#E5E7EB',
    },
})

