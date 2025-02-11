import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, FlatList, Image, Alert, ActivityIndicator } from 'react-native';
import { Text } from '@app/blueprints';
import usePatientHome from './useHome';
import { MapPin, Bell, CheckCircle } from 'lucide-react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import VideoPlayerModal from './VideoPlayerModal';
import { BaseLayout } from '@src/components';
import YouTubePlayerModal from './youtube-player-modal';

const HomeScreen = () => {
  const {
    styles,
    hospitals,
    defaultAddress,
    activeSlide,
    setActiveSlide,
    userProfile,
    news,
    hasLocationPermission,
    currentLocation,
    currentAddress,
    checkins,
    recommendedVideos,
    technlogicsVideos,
    requestLocationPermission,
    getCurrentLocation,
    handleCheckIn,
    refreshLocation,
    loading
  } = usePatientHome();

  const [isVideoModalVisible, setIsVideoModalVisible] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState('');
  const [isYouTubeModalVisible, setIsYouTubeModalVisible] = useState(false)
  const [selectedYouTubeId, setSelectedYouTubeId] = useState("")

  useEffect(() => {
    if (!hasLocationPermission) {
      requestLocationPermission();
    }
  }, [hasLocationPermission]);

  const VideoThumbnail: React.FC<{ item: any }> = ({ item }) => (
    <TouchableOpacity
      style={styles.videoThumbnail}
      onPress={() => {
        if (item.youtube_video_id) {
          setSelectedYouTubeId(item.youtube_video_id)
          setIsYouTubeModalVisible(true)
        } else if (item.video_file) {
          setSelectedVideoUrl(item.video_file)
          setIsVideoModalVisible(true)
        } else {
          Alert.alert("Error", "Video URL is not available")
        }
      }}
    >
      <Image source={{ uri: item.thumbnail || item.thumbnail_url }} style={styles.videoImage} />
      <View style={styles.playIconOverlay}>
        <AntDesign name="play" size={24} color={"#FFF"} />
      </View>
    </TouchableOpacity>
  )

  const onCheckInPress = async () => {
    await refreshLocation();
    handleCheckIn();
  };

  return (
    <BaseLayout>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 60 }}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.locationContainer}>
              <MapPin size={30} color="#000" />
              <View>
                <Text style={styles.locationText}>Location</Text>
                <Text style={styles.locationText}>
                  {currentAddress || (defaultAddress ? `${defaultAddress.address}, ${defaultAddress.city}, ${defaultAddress.state} ${defaultAddress.postal_code}` : 'No address available')}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.notificationContainer}>
              <Bell size={30} color="#000" />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
          </View>

          {/* Service Type Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={onCheckInPress}
            >

              {loading ? (
                <View >
                  <ActivityIndicator size="small" color="#fff" />
                </View>
              ) : <Text style={styles.buttonText}>Check In</Text>}
            </TouchableOpacity>
          </View>

          {/* Welcome Section */}
          <View style={styles.welcomeSection}>
            <Image
              //@ts-ignore
              source={userProfile?.user_photo
                ? { uri: userProfile.user_photo }
                : "require('../assets/default-avatar.png')"
              }
              style={styles.avatar}
            />
            <View style={styles.welcomeInfo}>
              <Text style={styles.welcomeTitle}>Welcome</Text>
              <Text style={styles.userName}>{userProfile?.name || 'User'}</Text>
            </View>
          </View>

          {/* Updates Section */}
          <Text style={styles.sectionTitle}>New Updates</Text>
          <View style={{ backgroundColor: '#fff' }}>
            <FlatList
              horizontal
              style={{ marginRight: 10 }}
              showsHorizontalScrollIndicator={false}
              data={news}
              renderItem={({ item, index }: any) => (
                <View style={styles.updateCard}>
                  <View style={styles.updateContent}>
                    <Text style={styles.discountText}>{item.title}</Text>
                    <Text style={styles.updateDescription}>
                      {item?.description.length > 50
                        ? `${item?.description.substring(0, 50)}...`
                        : item?.description}
                    </Text>
                    <TouchableOpacity style={styles.readMoreButton}>
                      <Text style={styles.readMoreText}>Read more</Text>
                    </TouchableOpacity>
                  </View>
                  <Image
                    source={{ uri: item.photo }}
                    style={styles.updateImage}
                  />
                </View>
              )}
              keyExtractor={(item: any) => item?.id.toString()}
              onMomentumScrollEnd={(e) => {
                const contentOffset = e.nativeEvent.contentOffset.x;
                const viewSize = e.nativeEvent.layoutMeasurement.width;
                setActiveSlide(Math.floor(contentOffset / viewSize));
              }}
            />
            <View style={styles.paginationContainer}>
              {news.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.paginationDot,
                    activeSlide === index && styles.activePaginationDot,
                  ]}
                />
              ))}
            </View>
          </View>

          {/* Recent Check-ins */}
          {/* <Text style={styles.sectionTitle}>Recent Check-ins</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={checkins}
          renderItem={({ item }: any) => (
            <View style={styles.checkinCard}>
              <CheckCircle size={24} color="#002B49" />
              <Text style={styles.checkinLocation}>{item?.location}</Text>
              <Text style={styles.checkinDate}>{new Date(item?.created_at).toLocaleDateString()}</Text>
            </View>
          )}
          keyExtractor={(item: any) => item.id.toString()}
        /> */}

          {/* Recommended Videos */}
          <Text style={styles.sectionTitle}>Recommended Videos</Text>
          <FlatList
            horizontal
            style={{ marginRight: 10 }}
            showsHorizontalScrollIndicator={false}
            data={recommendedVideos}
            renderItem={({ item }: any) => <VideoThumbnail item={item} />}
            keyExtractor={(item: any) => item.id.toString()}
          />
          <Text style={styles.sectionTitle}>Medical Videos</Text>
          <FlatList
            horizontal
            style={{ marginRight: 10 }}
            showsHorizontalScrollIndicator={false}
            data={technlogicsVideos}
            renderItem={({ item }: any) => (
              <VideoThumbnail
                item={{
                  ...item,
                  thumbnail: item.thumbnail_url || "https://via.placeholder.com/200x112",
                  video_file: item.youtube_url,
                  youtube_video_id: item.youtube_video_id,
                }}
              />
            )}
            keyExtractor={(item: any) => item.id.toString()}
          />
        </ScrollView>

        <VideoPlayerModal
          isVisible={isVideoModalVisible}
          onClose={() => setIsVideoModalVisible(false)}
          videoUrl={selectedVideoUrl}
        />
        <YouTubePlayerModal
          isVisible={isYouTubeModalVisible}
          onClose={() => setIsYouTubeModalVisible(false)}
          videoId={selectedYouTubeId}
        />
      </View>
    </BaseLayout>
  );
};

export default HomeScreen;

