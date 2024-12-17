import React from 'react';
import { View, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Text } from '@app/blueprints';
import usePatientHome from './usePatientHome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const PatientHomeScreen = () => {
  const { styles, updates, hospitals, activeSlide, setActiveSlide } = usePatientHome();

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <FontAwesome
        key={index}
        name={index < rating ? 'star' : 'star-o'}
        size={16}
        color={index < rating ? '#FFD700' : '#666'}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={24} color="#000" />
            <Text style={styles.locationText}>Location of user will be here</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
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
          <View style={styles.avatar} />
          <View>
            <Text style={styles.welcomeTitle}>Welcome</Text>
            <Text style={styles.userName}>Name of User</Text>
          </View>
        </View>

        {/* Updates Section */}
        <Text style={styles.sectionTitle}>New Updates</Text>
        <FlatList
          horizontal
          data={updates}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.updateCard}>
              <Text style={styles.updateDiscount}>{item.discount}</Text>
              <Text style={styles.updateDescription}>{item.description}</Text>
              <TouchableOpacity style={styles.readMoreButton}>
                <Text style={styles.readMoreText}>Read more</Text>
              </TouchableOpacity>
            </View>
          )}
          onMomentumScrollEnd={(event) => {
            const slideSize = event.nativeEvent.layoutMeasurement.width;
            const index = event.nativeEvent.contentOffset.x / slideSize;
            setActiveSlide(Math.round(index));
          }}
        />

        {/* Pagination Dots */}
        <View style={styles.paginationDots}>
          {updates.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, activeSlide === index && styles.activeDot]}
            />
          ))}
        </View>

        {/* Recommended Hospitals */}
        <Text style={styles.sectionTitle}>Recommended Hospitals</Text>
        {hospitals.map((hospital) => (
          <View key={hospital.id} style={styles.hospitalCard}>
            <View style={styles.hospitalImage} />
            <View style={styles.hospitalInfo}>
              <Text style={styles.hospitalName}>{hospital.name}</Text>
              <Text style={styles.hospitalDistance}>{hospital.distance}</Text>
              <View style={styles.ratingContainer}>
                {renderStars(hospital.rating)}
              </View>
              <TouchableOpacity style={styles.bookButton}>
                <Text style={styles.bookButtonText}>Book now</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <MaterialCommunityIcons name="heart-outline" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default React.memo(PatientHomeScreen);