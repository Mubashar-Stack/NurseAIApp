// GlobalVoiceInput.tsx
import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Modal, Animated, Easing, Platform, PermissionsAndroid, ActivityIndicator } from 'react-native';
import { Text } from '@app/blueprints';
import { useColor } from '@src/context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFetchBlob from 'rn-fetch-blob';
// Create an instance of AudioRecorderPlayer
const audioRecorderPlayer = new AudioRecorderPlayer();

interface GlobalVoiceInputProps {
    onTextReceived: (text: string) => void;
    isListening: boolean;
    stopListening: () => void;
}

const GlobalVoiceInput: React.FC<GlobalVoiceInputProps> = ({ onTextReceived, isListening, stopListening }) => {
    const [partialResults, setPartialResults] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const { color } = useColor();
    const slideAnim = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;
    const recordingPath = useRef('');
    const processingTextAnim = useRef(new Animated.Value(0)).current;

    // Request microphone permission
    const requestMicrophonePermission = async () => {
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

    // Start recording audio
    const startRecording = async () => {
        try {
            const hasPermission = await requestMicrophonePermission();
            if (!hasPermission) {
                setErrorMessage("Microphone access is required for speech recognition.");
                stopListening();
                return;
            }

            setPartialResults(["Listening..."]);

            // Create recording path
            const audioPath = Platform.OS === 'ios'
                ? 'speech_recording.m4a'
                : `${RNFetchBlob.fs.dirs.CacheDir}/speech_recording.mp3`;

            recordingPath.current = audioPath;

            // Fade in animation for better UX
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();

            // Start recording
            await audioRecorderPlayer.startRecorder(audioPath);
            setIsRecording(true);

            // Update partial results to show recording status
            setPartialResults(["Speak now..."]);

        } catch (error) {
            console.error('Error starting recording:', error);
            setErrorMessage("Failed to start recording. Please try again.");
            stopListening();
        }
    };

    // Stop recording and send audio for transcription
    const stopRecording = async () => {
        if (!isRecording) return;

        try {
            // Stop recording
            await audioRecorderPlayer.stopRecorder();
            setIsRecording(false);
            setIsProcessing(true);
            setPartialResults(["Processing your speech..."]);

            // Animate processing text
            startProcessingTextAnimation();

            // Send the file to the API for transcription
            await sendAudioForTranscription(recordingPath.current);
        } catch (error) {
            console.error('Error stopping recording:', error);
            setErrorMessage("Failed to process recording. Please try again.");
            stopListening();
        }
    };

    // Send audio file to API for transcription
    const sendAudioForTranscription = async (filePath: string) => {
        try {
            // Create form data
            const formData = new FormData();
            formData.append('file', {
                uri: Platform.OS === 'android' ? `file://${filePath}` : filePath,
                type: 'audio/mp3',
                name: 'audio_recording.mp3',
            } as any);

            // Make API request
            const response = await fetch('https://technlogics.co/api/voice-to-text', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Parse the response
            const responseData = await response.json();

            if (responseData.status) {
                // Handle successful transcription
                const transcribedText = responseData.data.text.trim();
                setIsProcessing(false);

                // Show success animation
                setPartialResults([`"${transcribedText}"`]);

                // Animate success feedback
                Animated.sequence([
                    Animated.timing(opacityAnim, {
                        toValue: 0.7,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                    Animated.timing(opacityAnim, {
                        toValue: 1,
                        duration: 300,
                        useNativeDriver: true,
                    })
                ]).start();

                // Pass text to parent
                onTextReceived(transcribedText);

                // Close modal after delay to show success state
                setTimeout(() => {
                    stopListening();
                    // Clear text after additional delay
                    setTimeout(() => {
                        onTextReceived('');
                    }, 1000);
                }, 1000);
            } else {
                // Handle API error
                console.error('Transcription API error:', responseData);
                setIsProcessing(false);
                setErrorMessage("Speech recognition failed. Please try again.");
                setTimeout(() => stopListening(), 1500);
            }
        } catch (error) {
            console.error('Error sending audio for transcription:', error);
            setIsProcessing(false);
            setErrorMessage("Failed to connect to speech recognition service.");
            setTimeout(() => stopListening(), 1500);
        }
    };

    // Animated dots for processing state
    const startProcessingTextAnimation = () => {
        Animated.loop(
            Animated.timing(processingTextAnim, {
                toValue: 3,
                duration: 1500,
                useNativeDriver: false,
            })
        ).start();
    };

    const getProcessingDots = () => {
        const dotsCount: any = processingTextAnim.interpolate({
            inputRange: [0, 1, 2, 3],
            outputRange: [0, 1, 2, 3],
            extrapolate: 'clamp',
        });

        return dotsCount.__getValue ? ".".repeat(Math.floor(dotsCount.__getValue())) : "";
    };

    useEffect(() => {
        if (isListening && !isRecording) {
            startRecording();

            // Animate the modal
            Animated.timing(slideAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
                easing: Easing.out(Easing.cubic),
            }).start();

            // Start pulse animation
            startPulseAnimation();
        } else if (!isListening && isRecording) {
            stopRecording();
        } else if (!isListening) {
            // Hide the modal with animation
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
                easing: Easing.in(Easing.cubic),
            }).start();
        }

        // Cleanup function
        return () => {
            if (isRecording) {
                audioRecorderPlayer.stopRecorder().catch(console.error);
            }
        };
    }, [isListening]);

    // Stop recording when component unmounts
    useEffect(() => {
        return () => {
            if (isRecording) {
                audioRecorderPlayer.stopRecorder().catch(console.error);
            }
        };
    }, []);

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

    const handleStopPress = () => {
        if (isRecording) {
            stopRecording();
        } else if (isProcessing) {
            // setIsProcessing(false);
            // stopListening();
        } else {
            stopListening();
        }
    };

    // Determine which icon to show based on state
    const renderActionIcon = () => {
        if (isProcessing) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={color.primaryColor} />
                </View>
            );
        }

        return (
            <Animated.View style={[
                styles.iconContainer,
                isRecording ? { transform: [{ scale: pulseAnim }] } : {}
            ]}>
                <Ionicons
                    name={isRecording ? "mic" : "mic-off"}
                    size={38}
                    color={color.primaryColor}
                />
            </Animated.View>
        );
    };

    // Determine status text based on state
    const getStatusText = () => {
        if (isProcessing) {
            return "Processing";
        } else if (isRecording) {
            return "Listening...";
        }
        return "Initializing...";
    };

    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={isListening}
            onRequestClose={handleStopPress}
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
                            }],
                            opacity: opacityAnim
                        }
                    ]}
                >
                    {renderActionIcon()}

                    <Text preset="h2" color={color.textColor} style={styles.listeningText}>
                        {getStatusText()}
                        {isProcessing && getProcessingDots()}
                    </Text>

                    <View style={styles.resultContainer}>
                        <Text preset="h4" color={isProcessing ? color.primaryColor : color.textColor} style={styles.partialResult}>
                            {partialResults.join(' ')}
                        </Text>
                    </View>

                    {errorMessage && (
                        //@ts-ignore
                        <Text preset="p" color="red" style={styles.errorText}>
                            {errorMessage}
                        </Text>
                    )}

                    <TouchableOpacity
                        onPress={handleStopPress}
                        style={[
                            styles.stopButton,
                            isProcessing && styles.cancelButton
                        ]}
                    >
                        <Ionicons
                            name={isProcessing ? "close-circle" : "stop-circle"}
                            color={isProcessing ? "#ff6b6b" : color.primaryColor}
                            size={48}
                        />
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
        height: 240,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    iconContainer: {
        marginBottom: 10,
        padding: 15,
        borderRadius: 40,
        backgroundColor: 'rgba(200, 200, 200, 0.2)',
    },
    loadingContainer: {
        marginBottom: 10,
        padding: 10,
        borderRadius: 40,
        backgroundColor: 'rgba(200, 200, 200, 0.2)',
        height: 68,
        width: 68,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listeningText: {
        marginBottom: 3,
        fontWeight: '600',
    },
    resultContainer: {
        minHeight: 60,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 2,
        marginVertical: 0,
        borderRadius: 10,
    },
    partialResult: {
        textAlign: 'center',
        marginHorizontal: 20,
    },
    stopButton: {
        marginTop: 0,
        transform: [{ scale: 1.1 }],
    },
    cancelButton: {
        transform: [{ scale: 1.1 }],
    },
    errorText: {
        marginTop: 5,
        marginBottom: 5,
        textAlign: 'center',
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        padding: 5,
        borderRadius: 8,
        width: '100%',
    }
});

export default GlobalVoiceInput;