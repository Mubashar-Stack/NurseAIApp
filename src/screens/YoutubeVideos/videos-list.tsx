import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, Image, TextInput, ActivityIndicator } from "react-native"
import { Text } from "@app/blueprints"
import { BaseLayout } from "@src/components"
import { Search, ArrowLeft, RefreshCw } from "lucide-react-native"
import AntDesign from "react-native-vector-icons/AntDesign"
import YouTubePlayerModal from "../Home/youtube-player-modal"
import { useVideosScreen } from "./useVideosScreen"

const VideosListScreen = () => {
    const {
        navigation,
        styles,
        videos,
        loading,
        searchQuery,
        setSearchQuery,
        loadMoreVideos,
        searchVideos,
        retrySearch,
        hasMoreVideos,
        isSearching,
    } = useVideosScreen()

    const [isYouTubeModalVisible, setIsYouTubeModalVisible] = useState(false)
    const [selectedYouTubeId, setSelectedYouTubeId] = useState("")

    const handleVideoPress = (videoId: any) => {
        setSelectedYouTubeId(videoId)
        setIsYouTubeModalVisible(true)
    }

    const handleSearch = () => {
        if (searchQuery.trim().length > 0) {
            searchVideos()
        }
    }

    const renderVideoItem = ({ item }: any) => (
        <TouchableOpacity style={styles.videoItem} onPress={() => handleVideoPress(item.video_id)}>
            <View style={styles.thumbnailContainer}>
                <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} resizeMode="cover" />
                <View style={styles.playIconOverlay}>
                    <AntDesign name="play" size={24} color="#FFF" />
                </View>
            </View>
            <View style={styles.videoDetails}>
                <Text style={styles.videoTitle} numberOfLines={2}>
                    {item.title}
                </Text>
                <Text style={styles.channelTitle}>{item.channel_title}</Text>
            </View>
        </TouchableOpacity>
    )

    const renderEmptyComponent = () => {
        if (loading && videos.length === 0) {
            return (
                <View style={styles.emptyContainer}>
                    <ActivityIndicator size="large" color="#002B49" />
                    <Text style={styles.loadingText}>Loading videos...</Text>
                </View>
            )
        }

        if (!loading && videos.length === 0) {
            return (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>
                        {searchQuery.trim() ? `No videos found for "${searchQuery}"` : "No videos available"}
                    </Text>
                    <TouchableOpacity style={styles.retryButton} onPress={retrySearch}>
                        <RefreshCw size={16} color="#fff" style={styles.retryIcon} />
                        <Text style={styles.retryText}>Retry</Text>
                    </TouchableOpacity>
                </View>
            )
        }

        return null
    }

    return (
        <BaseLayout>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <ArrowLeft size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Medical Videos</Text>
                </View>

                <View style={styles.searchContainer}>
                    <View style={styles.searchInputContainer}>
                        <Search size={20} color="#666" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search medical videos..."
                            placeholderTextColor="#999999"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            returnKeyType="search"
                            onSubmitEditing={handleSearch}
                        />
                        {isSearching && <ActivityIndicator size="small" color="#002B49" style={styles.searchingIndicator} />}
                    </View>
                </View>

                <FlatList
                    data={videos}
                    renderItem={renderVideoItem}
                    keyExtractor={(item) => item.video_id}
                    contentContainerStyle={[styles.listContent, videos.length === 0 && styles.emptyListContent]}
                    showsVerticalScrollIndicator={false}
                    onEndReached={hasMoreVideos && !loading ? loadMoreVideos : null}
                    onEndReachedThreshold={0.5}

                    ListEmptyComponent={renderEmptyComponent}
                    refreshing={loading && videos.length > 0}
                    onRefresh={retrySearch}
                />

                <YouTubePlayerModal
                    isVisible={isYouTubeModalVisible}
                    onClose={() => setIsYouTubeModalVisible(false)}
                    videoId={selectedYouTubeId}
                />
            </View>
        </BaseLayout>
    )
}

export default VideosListScreen

