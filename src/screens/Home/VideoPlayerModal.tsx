import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Video from 'react-native-video';
import { X } from 'lucide-react-native';

interface VideoPlayerModalProps {
    isVisible: boolean;
    onClose: () => void;
    videoUrl: string;
}

const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ isVisible, onClose, videoUrl }) => {
    const [paused, setPaused] = useState(false);

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <X size={24} color="#fff" />
                </TouchableOpacity>
                <Video
                    source={{ uri: videoUrl }}
                    style={styles.video}
                    controls={true}
                    paused={paused}
                    resizeMode="contain"
                    onError={(error) => console.error('Video Error:', error)}
                />
                {/* <TouchableOpacity style={styles.playPauseButton} onPress={() => setPaused(!paused)}>
                    {paused ? (
                        <View style={styles.playIcon} />
                    ) : (
                        <View style={styles.pauseIcon}>
                            <View style={styles.pauseBar} />
                            <View style={styles.pauseBar} />
                        </View>
                    )}
                </TouchableOpacity> */}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    video: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 1,
    },
    playPauseButton: {
        position: 'absolute',
        bottom: 40,
        alignSelf: 'center',
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    playIcon: {
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderTopWidth: 15,
        borderBottomWidth: 15,
        borderLeftWidth: 25,
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: '#fff',
    },
    pauseIcon: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
    },
    pauseBar: {
        width: 6,
        height: 30,
        backgroundColor: '#fff',
        marginHorizontal: 4,
    },
});

export default VideoPlayerModal;

