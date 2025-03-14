
import React from "react"
import { useState, useEffect, useRef } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native"
import { useVoiceInput } from "@src/context/VoiceInputContext"
import axios from "axios"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Clipboard from "@react-native-clipboard/clipboard"
import { showSuccessToast, showErrorToast } from "@src/utils"
import Markdown from "react-native-markdown-display"

interface ConversationItem {
    id: string
    question: string
    response: string
    timestamp: string
    responseTime: number // in milliseconds
}

interface ConversationManagerProps {
    initialQuestion?: string
    maxRounds?: number
}

const ConversationManager: React.FC<ConversationManagerProps> = ({ initialQuestion = "", maxRounds = 500000000 }) => {
    const [conversation, setConversation] = useState<ConversationItem[]>([])
    const [currentRound, setCurrentRound] = useState(0)
    const [isProcessing, setIsProcessing] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { voiceInputText, isListening, startVoiceInput, stopVoiceInput } = useVoiceInput()
    const scrollViewRef = useRef<ScrollView>(null)

    // Process initial question on component mount
    useEffect(() => {
        if (initialQuestion) {
            processQuestion(initialQuestion)
        }
    }, [initialQuestion])

    // Handle voice input when it changes
    useEffect(() => {
        if (voiceInputText && !isProcessing && currentRound < maxRounds) {
            processQuestion(voiceInputText)
        }
    }, [voiceInputText])

    // Process a question (either from parameters or voice input)
    const processQuestion = async (question: string) => {
        if (isProcessing || currentRound >= maxRounds) return

        setIsProcessing(true)
        setError(null)

        const startTime = Date.now()
        const timestamp = new Date().toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        })

        try {
            const response = await axios.post(
                "https://technlogics.co/api/openai-query",
                { query: question },
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: "Token b9b28943d8e92fa4e77c8fa26da4bfdef0d48f78",
                        Test: "yes",
                        "Content-Type": "application/json",
                    },
                },
            )

            const endTime = Date.now()
            const responseTime = endTime - startTime

            if (response.data && response.data.status && response.data.data) {
                const newItem: ConversationItem = {
                    id: Date.now().toString(),
                    question,
                    response: response.data.data,
                    timestamp,
                    responseTime,
                }

                setConversation((prev) => [...prev, newItem])
                setCurrentRound((prev) => prev + 1)
            } else {
                setError("Failed to get a valid response from the API")
            }
        } catch (error) {
            console.error("Error processing question:", error)
            setError("An error occurred while processing your question")
        } finally {
            setIsProcessing(false)

            setTimeout(() => {
                if (scrollViewRef.current) {
                    scrollViewRef.current.scrollToEnd({ animated: true });
                }
            }, 300); // 
        }
    }

    // Start a new voice input round
    const handleNextQuestion = () => {
        if (currentRound < maxRounds && !isProcessing && !isListening) {
            startVoiceInput()
        }
    }

    // Copy text to clipboard
    const copyToClipboard = (text: string) => {
        try {
            Clipboard.setString(text)
            showSuccessToast("Text copied to clipboard", 2000)
        } catch (error) {
            showErrorToast("Failed to copy text", 2000)
        }
    }

    // Format response time in seconds
    const formatResponseTime = (ms: number) => {
        return `${(ms / 1000).toFixed(2)}s`
    }

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

    return (
        <View style={styles.container}>
            <ScrollView ref={scrollViewRef} style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                {conversation.map((item) => (
                    <View key={item.id} style={styles.messageWrapper}>
                        <View style={styles.messageContainer}>
                            <View style={styles.messageHeader}>
                                <Text style={styles.questionText}>**{item.question}**</Text>
                                <Text style={styles.timestamp}>{item.timestamp}</Text>
                            </View>
                            <View style={styles.responseContainer}>
                                <Markdown style={markdownStyles}>{item.response}</Markdown>
                            </View>
                            <View style={styles.messageFooter}>
                                <Text style={styles.responseTime}>Response time: {formatResponseTime(item.responseTime)}</Text>
                                <View style={styles.messageActions}>
                                    <TouchableOpacity onPress={() => copyToClipboard(item.response)}>
                                        <MaterialIcons name="content-copy" size={20} color="#666" />
                                    </TouchableOpacity>
                                    {/* <TouchableOpacity>
                                        <MaterialIcons name="thumb-up-off-alt" size={20} color="#666" />
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <MaterialIcons name="thumb-down-off-alt" size={20} color="#666" />
                                    </TouchableOpacity> */}
                                </View>
                            </View>
                        </View>
                    </View>
                ))}

                {isProcessing && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#002B49" />
                        <Text style={styles.loadingText}>Processing your question...</Text>
                    </View>
                )}

                {error && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                )}
            </ScrollView>

            {!isProcessing && (
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion} disabled={isListening}>
                        <MaterialIcons name={isListening ? "mic" : "mic-none"} size={24} color="#FFF" />
                        <Text style={styles.nextButtonText}>{isListening ? "Listening..." : "Ask Next Question"}</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* {(

                <View style={styles.bottomNav}>
                    {isProcessing ? <ActivityIndicator size="large" color="#002B49" /> : <TouchableOpacity style={styles.bottomNavItem} onPress={handleNextQuestion} disabled={isListening}>
                        <MaterialIcons name={isListening ? "mic" : "mic-none"} size={24} color="#666" />
                        <Text style={styles.bottomNavText}>Lets Explore</Text>
                    </TouchableOpacity>}

                </View>
            )} */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F9FA",
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    messageWrapper: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    messageContainer: {
        backgroundColor: "#FFF",
        borderRadius: 12,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.08,
        shadowRadius: 2,
        elevation: 1,
    },
    messageHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 12,
    },
    questionText: {
        flex: 1,
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
        lineHeight: 20,
        marginRight: 8,
    },
    responseContainer: {
        marginTop: 8,
    },
    messageText: {
        flex: 1,
        fontSize: 14,
        color: "#333",
        lineHeight: 20,
        marginRight: 8,
    },
    timestamp: {
        fontSize: 12,
        color: "#666",
        marginLeft: 8,
    },
    responseText: {
        fontSize: 14,
        color: "#333",
        lineHeight: 20,
    },
    messageFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 16,
    },
    responseTime: {
        fontSize: 12,
        color: "#666",
    },
    messageActions: {
        flexDirection: "row",
        gap: 24,
    },
    loadingContainer: {
        padding: 20,
        alignItems: "center",
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: "#002B49",
    },
    errorContainer: {
        padding: 16,
        backgroundColor: "#FFEBEE",
        borderRadius: 8,
        margin: 16,
    },
    errorText: {
        color: "#D32F2F",
        fontSize: 14,
    },
    footer: {
        padding: 16,
        backgroundColor: "#FFF",
        borderTopWidth: 1,
        borderTopColor: "#E5E7EB",
        alignItems: "center",
    },
    nextButton: {
        backgroundColor: "#002B49",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginBottom: 8,
    },
    nextButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "500",
        marginLeft: 8,
    },
    roundCounter: {
        fontSize: 14,
        color: "#666",
    },
    completedContainer: {
        padding: 16,
        backgroundColor: "#E8F5E9",
        alignItems: "center",
    },
    completedText: {
        fontSize: 16,
        color: "#2E7D32",
    },
    bottomNav: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 16,
        backgroundColor: "#FFF",
        borderTopWidth: 1,
        borderTopColor: "#E5E7EB",
    },
    bottomNavItem: {
        alignItems: "center",
    },
    bottomNavText: {
        fontSize: 12,
        color: "#666",
        marginTop: 4,
    },
})

export default ConversationManager

