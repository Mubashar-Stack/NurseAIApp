import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Modal, Animated, Easing, Platform, PermissionsAndroid } from 'react-native';
import Voice, { SpeechResultsEvent, SpeechErrorEvent } from '@react-native-voice/voice';
import { Text } from '@app/blueprints';
import { useColor } from '@src/context';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface GlobalVoiceInputProps {
    onTextReceived: (text: string) => void;
    isListening: boolean;
    stopListening: () => void;
}

const GlobalVoiceInput: React.FC<GlobalVoiceInputProps> = ({ onTextReceived, isListening, stopListening }) => {
    const [partialResults, setPartialResults] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { color } = useColor();
    const slideAnim = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;


    // Comprehensive error handling and permission check
    const requestSpeechRecognitionPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    //@ts-ignore
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                    {
                        title: "Microphone Permission",
                        message: "App needs access to your microphone for speech recognition.",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                    }
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.error("Permission request error:", err);
                return false;
            }
        }
        return true; // For iOS, permissions are handled differently
    };

    useEffect(() => {
        // Verbose error handling and logging
        const onSpeechError = async (e: SpeechErrorEvent) => {
            const errorDetails = e.error ? JSON.stringify(e.error) : 'Unknown error';
            console.error('Detailed Speech Recognition Error:', errorDetails);

            // Specific error handling
            if (e.error?.code === '5') {
                // Client-side error often relates to permissions or device setup
                const hasPermission = await requestSpeechRecognitionPermission();

                if (!hasPermission) {
                    setErrorMessage("Microphone access is required for speech recognition.");
                } else {
                    setErrorMessage("An unexpected error occurred. Please try again.");
                }
            } else {
                setErrorMessage("Speech recognition failed. Please check your device settings.");
            }

            // Cleanup and stop listening
            stopListening();

            try {
                await Voice.destroy();
                Voice.removeAllListeners();
            } catch (destroyError) {
                console.error('Error destroying voice recognition:', destroyError);
            }
        };

        // Setup listeners
        Voice.onSpeechError = onSpeechError;

        const onSpeechPartialResults = (e: SpeechResultsEvent) => {
            setPartialResults(e.value ?? []);
            // Clear any previous error messages
            setErrorMessage(null);
        };

        const onSpeechResults = (e: SpeechResultsEvent) => {
            if (e.value && e.value.length > 0) {
                const recognizedText: any = e.value[0];
                onTextReceived(recognizedText);
                stopListening();

                setTimeout(() => {
                    onTextReceived('');
                }, 1500);
            }
        };

        Voice.onSpeechPartialResults = onSpeechPartialResults;
        Voice.onSpeechResults = onSpeechResults;

        // Cleanup
        return () => {
            Voice.destroy().catch(console.error);
            Voice.removeAllListeners();
        };
    }, [onTextReceived, stopListening]);

    useEffect(() => {
        if (isListening) {
            setPartialResults([]);
            Animated.timing(slideAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
                easing: Easing.out(Easing.cubic),
            }).start();
            startPulseAnimation();
        } else {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
                easing: Easing.in(Easing.cubic),
            }).start();
        }
    }, [isListening]);

    const startPulseAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.2,
                    duration: 1000,
                    useNativeDriver: true,
                    easing: Easing.inOut(Easing.sin),
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                    easing: Easing.inOut(Easing.sin),
                }),
            ])
        ).start();
    };

    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={isListening}
            onRequestClose={stopListening}
        >
            <View style={styles.modalOverlay}>
                <Animated.View
                    style={[
                        styles.modalContent,
                        { backgroundColor: color.backgroundColor },
                        {
                            transform: [{
                                translateY: slideAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [300, 0]
                                })
                            }]
                        }
                    ]}
                >
                    <Animated.View style={[styles.iconContainer, { transform: [{ scale: pulseAnim }] }]}>
                        <Ionicons name="mic" size={38} color={color.primaryColor} />
                    </Animated.View>
                    <Text preset="h2" color={color.textColor} style={styles.listeningText}>
                        Listening...
                    </Text>
                    <Text preset="h4" color={color.textColor} style={styles.partialResult}>
                        {partialResults.join(' ')}
                    </Text>
                    <TouchableOpacity onPress={stopListening} style={styles.stopButton}>
                        <Ionicons name="stop-circle" color={color.primaryColor} size={48} />
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
        height: 210,
    },
    iconContainer: {
        marginBottom: 10,
    },
    listeningText: {
        marginBottom: 5,
    },
    partialResult: {
        marginTop: 1,
        marginBottom: 5,
        textAlign: 'center',
        height: 50,
    },
    stopButton: {
        marginTop: 1,
    },
});

export default GlobalVoiceInput;

