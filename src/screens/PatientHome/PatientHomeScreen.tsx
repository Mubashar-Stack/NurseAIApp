import React from 'react';
import { View, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native';
import { Text } from '@app/blueprints';
import usePatientHome from './usePatientHome';
import { MapPin, Bell, Star, Heart, Home, MessageSquare, Building2, User } from 'lucide-react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const PatientHomeScreen = () => {
  const {
    styles,
    hospitals,
    defaultAddress,
    activeSlide,
    setActiveSlide,
    userProfile,
    news
  } = usePatientHome();

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={14}
        fill={index < rating ? '#BE0B31' : 'transparent'}
        stroke={index < rating ? '#BE0B31' : '#BE0B31'}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 60 }}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.locationContainer}>
            <MapPin size={30} color="#000" />
            <View>
              <Text style={styles.locationText}>Location</Text>
              <Text style={styles.locationText}>{defaultAddress != undefined ? `${defaultAddress?.address}, ${defaultAddress?.city}, ${defaultAddress?.state} ${defaultAddress?.postal_code}` : 'No address available'}</Text>
            </View>

          </View>
          <TouchableOpacity style={styles.notificationContainer}>
            <Bell size={30} color="#000" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        {/* Service Type Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.primaryButton]}>
            <Text style={styles.buttonText}>From home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
            <Text style={styles.buttonText}>In hospital</Text>
          </TouchableOpacity>
        </View>

        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Image
            //@ts-ignore
            source={userProfile?.user_photo
              ? { uri: userProfile.user_photo }
              : '' //require('../assets/default-avatar.png')
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
                    {item?.description.length > 0
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


        {/* Recommended Hospitals */}
        <Text style={styles.sectionTitle}>Recommended Hospitals</Text>
        {hospitals.map((hospital: any) => (
          <View key={hospital.id} style={styles.hospitalCard}>
            <Image
              //@ts-ignore
              source={hospital.photo ? { uri: hospital?.photo } : '../assets/hospital-placeholder.png'}
              style={styles.hospitalImage}
            />
            <View style={styles.hospitalInfo}>
              <View>
                <Text style={styles.hospitalName}>{hospital?.name}</Text>
                <Text style={styles.hospitalDistance}>
                  {hospital?.description?.length > 50
                    ? `${hospital?.description.substring(0, 50)}...`
                    : hospital?.description}
                </Text>
                <View style={{ flexDirection: 'row', gap: 50 }}>
                  <View style={styles.ratingContainer}>
                    {renderStars(hospital?.rating)}
                  </View>
                  <TouchableOpacity style={styles.bookButton}>
                    <Text style={styles.bookButtonText}>Book now</Text>
                  </TouchableOpacity>
                </View>
              </View>

            </View>
            <TouchableOpacity style={styles.favoriteButton}>
              <MaterialIcons
                name={hospital?.is_favorite ? "favorite" : "favorite-border"}
                size={24}
                color={hospital?.is_favorite ? "red" : '#002A65'}
              />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default PatientHomeScreen;

