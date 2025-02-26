import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Modal, Animated, Easing } from 'react-native';
import Voice from '@react-native-voice/voice';
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
    const { color } = useColor();
    const slideAnim = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Voice.onSpeechPartialResults = (e) => setPartialResults(e.value ?? []);
        Voice.onSpeechResults = (e: any) => {
            if (e.value) {
                onTextReceived(e.value[0]);
                stopListening();
            }
        };
        Voice.onSpeechError = (e: any) => {
            console.error('Speech recognition error:', e);
            stopListening();
            Voice.destroy().then(Voice.removeAllListeners).catch(e => console.error(e));
        };

        return () => {
            Voice.destroy().then(Voice.removeAllListeners).catch(e => console.error(e));
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

