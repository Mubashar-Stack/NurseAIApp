import React from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import { Text } from '@app/blueprints';
import Feather from 'react-native-vector-icons/Feather';
import { formatDuration } from '@src/utils';

interface VoiceRecorderProps {
    isRecording: boolean;
    duration: number;
    onStop: () => void;
    styles: any;
}

const VoiceRecorder = ({ isRecording, duration, onStop, styles }: VoiceRecorderProps) => {
    const waveformBars = Array.from({ length: 30 }, (_, i) => i);
    const animations = waveformBars.map(() => React.useRef(new Animated.Value(0)).current);

    React.useEffect(() => {
        if (isRecording) {
            animations.forEach((anim, i) => {
                Animated.loop(
                    Animated.sequence([
                        Animated.timing(anim, {
                            toValue: Math.random(),
                            duration: 500 + Math.random() * 500,
                            useNativeDriver: false, // Changed to false to support height animation
                        }),
                        Animated.timing(anim, {
                            toValue: 0,
                            duration: 500 + Math.random() * 500,
                            useNativeDriver: false, // Changed to false to support height animation
                        }),
                    ])
                ).start();
            });
        } else {
            animations.forEach(anim => {
                anim.setValue(0);
            });
        }
    }, [isRecording]);

    return (
        <View style={styles.recordingContainer}>
            <Animated.View style={[styles.recordingIndicator, { opacity: animations[0] }]} />
            <View style={styles.waveformContainer}>
                {waveformBars.map((_, i) => (
                    <Animated.View
                        key={i}
                        style={[
                            styles.waveformBar,
                            {
                                height: animations[i].interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [10, 30],
                                }),
                            },
                        ]}
                    />
                ))}
            </View>
            <Text style={styles.recordingDuration}>{formatDuration(duration)}</Text>
            <TouchableOpacity onPress={onStop} style={styles.stopRecordingButton}>
                <Feather name="square" size={24} color="#FFFFFF" />
            </TouchableOpacity>
        </View>
    );
};

export default VoiceRecorder;