import React from "react"
import { useState, useCallback, useRef, useEffect } from "react"
import { View, Modal, TouchableOpacity, StyleSheet, Dimensions, Platform, Text } from "react-native"
import YoutubePlayer, { type YoutubeIframeRef } from "react-native-youtube-iframe"
import { X } from "lucide-react-native"
import WebView from "react-native-webview"

interface YouTubePlayerModalProps {
    isVisible: boolean
    onClose: () => void
    videoId: string
}

const YouTubePlayerModal: React.FC<YouTubePlayerModalProps> = ({ isVisible, onClose, videoId }) => {
    const [playing, setPlaying] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const playerRef = useRef<YoutubeIframeRef>(null)

    // Reset states when modal opens
    useEffect(() => {
        if (isVisible) {
            setError(null)
            setLoading(false)
            setPlaying(true)
        }
    }, [isVisible])

    const onStateChange = useCallback((state: string) => {
        if (state === "ended") {
            setPlaying(false)
        }
        if (state === "error") {
            setError("This video is unavailable")
        }
        if (state === "playing") {
            setLoading(false)
        }
    }, [])



    const VideoPlayer = (
        <YoutubePlayer
            ref={playerRef}
            height={300}
            width={Dimensions.get("window").width}
            play={playing}
            videoId={videoId}
            onChangeState={onStateChange}
            onError={() => setError("This video is unavailable")}
        />
    )

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={isVisible}
            onRequestClose={onClose}
            supportedOrientations={['portrait', 'landscape']}
        >
            <View style={styles.container}>
                <TouchableOpacity
                    style={[
                        styles.closeButton,
                        Platform.OS === 'android' && { top: 20 }
                    ]}
                    onPress={onClose}
                >
                    <X size={24} color="#fff" />
                </TouchableOpacity>

                {error ? (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{error}</Text>
                        <TouchableOpacity
                            style={styles.retryButton}
                            onPress={() => {
                                setError(null)
                                setLoading(true)
                                setPlaying(true)
                            }}
                        >
                            <Text style={styles.retryText}>Retry</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    VideoPlayer
                )}

                {loading && !error && (
                    <View style={styles.loadingContainer}>
                        <Text style={styles.loadingText}>Loading video...</Text>
                    </View>
                )}
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
    },
    closeButton: {
        position: "absolute",
        top: 40,
        right: 20,
        zIndex: 1,
        padding: 10,
    },
    webview: {
        width: Dimensions.get("window").width,
        height: Platform.OS === 'android' ? Dimensions.get("window").height : 300,
        backgroundColor: '#000',
    },
    errorContainer: {
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    retryButton: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    retryText: {
        color: '#000',
        fontSize: 14,
    },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    loadingText: {
        color: '#fff',
        fontSize: 16,
    },
})

export default YouTubePlayerModal