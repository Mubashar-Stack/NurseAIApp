import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from '@app/blueprints';
import Header from '../../components/Header/Header';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import useHospitals from './useHospitals';
import { BookingModal } from './components/BookingModal';

const BookedHospitalCard = ({
  id,
  name,
  distance,
  isFavorite,
  onFavorite,
  onEdit,
  onCancel,
  styles,
  color,
}: any) => (
  <View style={styles.hospitalCard}>
    <View style={styles.hospitalImage} />
    <View style={styles.hospitalInfo}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text preset="h2">{name}</Text>
        <TouchableOpacity onPress={() => onFavorite(id)}>
          <MaterialIcons
            name={isFavorite ? "favorite" : "favorite-border"}
            size={24}
            color={isFavorite ? "red" : color.textColor}
          />
        </TouchableOpacity>
      </View>
      <Text preset="small">{distance}</Text>
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <MaterialIcons
            key={star}
            name="star"
            size={16}
            color="#FFD700"
            style={styles.star}
          />
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => onEdit(id)}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => onCancel(id)}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

const HistoricalHospitalCard = ({
  id,
  name,
  distance,
  appointmentDate,
  hasReview,
  onGiveReview,
  isFavorite,
  onFavorite,
  styles,
  color,
}: any) => (
  <View style={styles.historyCard}>
    {/* Hospital Image */}
    <View style={styles.historyHospitalImage} />

    {/* Hospital Info Container */}
    <View style={styles.historyHospitalInfo}>
      {/* Header Section */}
      <View style={styles.historyHeaderSection}>
        <View style={styles.historyNameSection}>
          <Text style={styles.historyHospitalName}>{name}</Text>
          <Text style={styles.historyDistance}>{distance}</Text>

          {/* Rating Stars */}
          <View style={styles.historyRatingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <MaterialIcons
                key={star}
                name="star"
                size={16}
                color="#D3D3D3"
                style={styles.historyStar}
              />
            ))}
          </View>
        </View>

        <TouchableOpacity onPress={() => onFavorite(id)}>
          <MaterialIcons
            name={isFavorite ? "favorite" : "favorite-border"}
            size={24}
            color={isFavorite ? "red" : color.textColor}
          />
        </TouchableOpacity>
      </View>

      {/* Divider Line */}
      <View style={styles.historyDivider} />

      {/* Appointment Info Section */}
      <View style={styles.historyAppointmentSection}>
        <View>
          <Text style={styles.historyAppointmentStatus}>Appointment done</Text>
          <Text style={styles.historyAppointmentDate}>
            {appointmentDate}
          </Text>
        </View>

        {!hasReview && (
          <TouchableOpacity
            style={styles.historyReviewButton}
            onPress={() => onGiveReview(id)}
          >
            <Text style={styles.historyReviewButtonText}>Give review</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  </View>
);

const UnbookedHospitalCard = ({
  id,
  name,
  distance,
  isFavorite,
  onFavorite,
  onBook,
  styles,
  color,
}: any) => (
  <View style={styles.hospitalCard}>
    <View style={styles.hospitalImage} />
    <View style={styles.hospitalInfo}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text preset="h2">{name}</Text>
        <TouchableOpacity onPress={() => onFavorite(id)}>
          <MaterialIcons
            name={isFavorite ? "favorite" : "favorite-border"}
            size={24}
            color={isFavorite ? "red" : color.textColor}
          />
        </TouchableOpacity>
      </View>
      <Text preset="small">{distance}</Text>
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <MaterialIcons
            key={star}
            name="star"
            size={16}
            color="#FFD700"
            style={styles.star}
          />
        ))}
      </View>
      <TouchableOpacity
        style={styles.bookButton}
        onPress={() => onBook({ id, name, distance })}
      >
        <Text style={{ color: color.secondaryColor }}>Book now</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const HospitalsScreen = () => {
  const {
    styles,
    navigation,
    activeTab,
    setActiveTab,
    favorites,
    toggleFavorite,
    handleBookNow,
    handleEdit,
    handleCancel,
    color,
    showBookingModal,
    setShowBookingModal,
    selectedDate,
    setSelectedDate,
    selectedSpecialty,
    setSelectedSpecialty,
    handleConfirmBooking,
    currentHospitals,
    bookedHospitals,
    historicalVisits,
    handleGiveReview,
  } = useHospitals();

  return (
    <View style={styles.container}>
      <Header onPress={() => navigation.goBack()} title="Hospitals" />

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'current' ? styles.activeTab : styles.inactiveTab]}
          onPress={() => setActiveTab('current')}
        >
          <Text style={styles.tabText}>Current</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'history' ? styles.activeTab : styles.inactiveTab]}
          onPress={() => setActiveTab('history')}
        >
          <Text style={styles.tabText}>History</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {activeTab === 'current' && (
          <>
            {bookedHospitals.map(hospital => (
              <BookedHospitalCard
                key={hospital.id}
                {...hospital}
                isFavorite={favorites.includes(hospital.id)}
                onFavorite={toggleFavorite}
                onEdit={handleEdit}
                onCancel={handleCancel}
                styles={styles}
                color={color}
              />
            ))}
            {currentHospitals.map(hospital => (
              <UnbookedHospitalCard
                key={hospital.id}
                {...hospital}
                isFavorite={favorites.includes(hospital.id)}
                onFavorite={toggleFavorite}
                onBook={handleBookNow}
                styles={styles}
                color={color}
              />
            ))}
          </>
        )}
        {activeTab === 'history' && (
          historicalVisits.map(hospital => (
            <HistoricalHospitalCard
              key={hospital.id}
              {...hospital}
              isFavorite={favorites.includes(hospital.id)}
              onFavorite={toggleFavorite}
              onGiveReview={handleGiveReview}
              styles={styles}
              color={color}
            />
          ))
        )}
      </ScrollView>

      <BookingModal
        visible={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        styles={styles}
        color={color}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedSpecialty={selectedSpecialty}
        setSelectedSpecialty={setSelectedSpecialty}
        onConfirm={handleConfirmBooking}
      />
    </View>
  );
};

export default React.memo(HospitalsScreen);
