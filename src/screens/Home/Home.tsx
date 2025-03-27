import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, FlatList, Image, Alert, ActivityIndicator } from 'react-native';
import { Text } from '@app/blueprints';
import usePatientHome from './useHome';
import { MapPin, Bell, CheckCircle } from 'lucide-react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { BaseLayout } from '@src/components';
import YouTubePlayerModal from './youtube-player-modal';
import VideoSectionHeader from './video-section-header';
import { Screen } from '../../navigation/appNavigation.type';

const HomeScreen = () => {
  const {
    navigation,
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
  console.log("🚀 ~ HomScreen ~ userProfile:", userProfile)

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
              source={userProfile?.userPhoto
                ? { uri: userProfile?.userPhoto }
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
          {/* <Text style={styles.sectionTitle}>New Updates</Text> */}
          {/* <View style={{ backgroundColor: '#fff' }}>
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
          </View> */}

          {/* Medical Videos Section */}

          <VideoSectionHeader title="Medical Videos" onViewAllPress={() => navigation.navigate(Screen.YOUTUBE_VIDEOS)} />
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

        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 70,
            right: 20,
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: "#002B49",
            justifyContent: "center",
            alignItems: "center",
            elevation: 5,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            zIndex: 999,
          }}
          onPress={() => navigation.navigate(Screen.CHATBOT_SCREEN)}
        >
          <View style={{ position: "relative" }}>
            <AntDesign name="message1" size={24} color="#FFF" />
          </View>
        </TouchableOpacity>
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

