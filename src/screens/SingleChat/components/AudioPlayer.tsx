import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@app/blueprints';
import Feather from 'react-native-vector-icons/Feather';
import { formatDuration } from '@src/utils';

interface AudioPlayerProps {
    duration: number;
    currentTime: number;
    isPlaying: boolean;
    onPlay: () => void;
    onDelete: () => void;
    onSend: () => void;
    styles: any;
}

const AudioPlayer = ({
    duration,
    currentTime,
    isPlaying,
    onPlay,
    onDelete,
    onSend,
    styles,
}: AudioPlayerProps) => {
    const progress = (currentTime / duration) * 100;

    return (
        <View style={styles.audioPlayerContainer}>
            <TouchableOpacity onPress={onPlay} style={styles.playButton}>
                <Feather name={isPlaying ? 'pause' : 'play'} size={20} color="#FFFFFF" />
            </TouchableOpacity>

            <View style={styles.audioProgress}>
                <View style={[styles.audioProgressFill, { width: `${progress}%` }]} />
            </View>

            <Text style={styles.audioDuration}>{formatDuration(currentTime)}</Text>

            <View style={styles.audioActions}>
                <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
                    <Feather name="trash-2" size={20} color="#FF0000" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onSend} style={styles.sendAudioButton}>
                    <Feather name="send" size={20} color="#FFFFFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AudioPlayer;

