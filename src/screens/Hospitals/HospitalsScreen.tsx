import React from 'react';
import { View, TouchableOpacity, ScrollView, Image, FlatList, ActivityIndicator } from 'react-native';
import { Text } from '@app/blueprints';
import Header from '../../components/Header/Header';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import useHospitals from './useHospitals';
import { BookingModal } from './components/BookingModal';
import EmptyBookings from './components/empty-bookings';
import { BaseLayout } from '@src/components';

const HospitalCard = ({
  id,
  name,
  address,
  description,
  rating,
  photo,
  isFavorite,
  onFavorite,
  onBook,
  styles,
  color,
}: any) => (
  <View style={styles.hospitalCard}>
    <View style={styles.hospitalImage}>
      {photo && <Image source={{ uri: photo }} style={styles.hospitalImage} />}
    </View>
    <View style={styles.hospitalInfo}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.hospitalName}>{name}</Text>
        <TouchableOpacity onPress={() => onFavorite(id)}>
          <MaterialIcons
            name={isFavorite ? "favorite" : "favorite-border"}
            size={24}
            color={isFavorite ? "red" : color.textColor}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.hospitalDistance}>{description?.length > 50
        ? `${description.substring(0, 50)}...`
        : description}</Text>
      <View style={{ flexDirection: 'row', gap: 40 }}>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <MaterialIcons
              key={star}
              name="star"
              size={16}
              color={star <= rating ? "#BE0B31" : "#D3D3D3"}
              style={styles.star}
            />
          ))}
        </View>
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => onBook({ id, name, address })}
        >
          <Text style={styles.bookButtonText}>Book now</Text>
        </TouchableOpacity>
      </View>

    </View>
  </View>
);

const HistoricalHospitalCard = ({
  id,
  name,
  address,
  created_at,
  isFavorite,
  onFavorite,
  onGiveReview,
  styles,
  color,
}: any) => (
  <View style={styles.historyCard}>
    <View style={styles.historyHospitalImage} />
    <View style={styles.historyHospitalInfo}>
      <View style={styles.historyHeaderSection}>
        <View style={styles.historyNameSection}>
          <Text style={styles.historyHospitalName}>{name}</Text>
          <Text style={styles.historyDistance}>{address}</Text>
        </View>
        <TouchableOpacity onPress={() => onFavorite(id)}>
          <MaterialIcons
            name={isFavorite ? "favorite" : "favorite-border"}
            size={24}
            color={isFavorite ? "red" : color.textColor}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.historyDivider} />
      <View style={styles.historyAppointmentSection}>
        <View>
          <Text style={styles.historyAppointmentStatus}>Appointment done</Text>
          <Text style={styles.historyAppointmentDate}>{new Date(created_at).toLocaleString()}</Text>
        </View>
        <TouchableOpacity
          style={styles.historyReviewButton}
          onPress={() => onGiveReview(id)}
        >
          <Text style={styles.historyReviewButtonText}>Give review</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);


const BookedHospitalCard = ({
  id,
  name,
  hospital,
  isFavorite,
  onFavorite,
  onEdit,
  onCancel,
  styles,
  color,
  photo,
  description,
  rating = 5
}: any) => (
  <View style={[styles.hospitalCard, { margin: 10, borderRadius: 10, borderWidth: 1, borderColor: '#F0F0F0', }]}>
    <View style={styles.hospitalImage}>
      {hospital?.photo && <Image source={{ uri: hospital?.photo }} style={styles.hospitalImage} />}
    </View>
    <View style={styles.hospitalInfo}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.hospitalName}>{hospital?.name}</Text>
        <TouchableOpacity onPress={() => onFavorite(hospital?.id)}>
          <MaterialIcons
            name={isFavorite ? "favorite" : "favorite-border"}
            size={24}
            color={isFavorite ? "red" : color.textColor}
          />
        </TouchableOpacity>
      </View>
      <Text style={[styles.hospitalDistance, { maxWidth: 180 }]} >{hospital?.description?.length > 50
        ? `${hospital?.description.substring(0, 50)}...`
        : hospital?.description}</Text>
      <View style={{ flexDirection: 'row', gap: 40 }}>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <MaterialIcons
              key={star}
              name="star"
              size={16}
              color={star <= hospital?.rating ? "#BE0B31" : "#D3D3D3"}
              style={styles.star}
            />
          ))}
        </View>

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
    openEditModel,
    handleCancel,
    color,
    showBookingModal,
    setShowBookingModal,
    selectedDate,
    setSelectedDate,
    selectedSpecialty,
    setSelectedSpecialty,
    handleConfirmBooking,
    hospitals,
    currentHospitals,
    historicalVisits,
    handleGiveReview,
    specialties,
    bookings,
    loadingBookings,
    loadingCurrentHospitals,
    loadingHistoricalVisits,
    isEditingBooking
  } = useHospitals();

  return (
    <BaseLayout>
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

        <ScrollView style={{ marginBottom: 70 }}>
          {activeTab === 'current' && (
            <>
              {loadingBookings ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#002B49" />
                </View>
              ) : bookings?.length > 0 && (
                <View style={styles.bookedHospitalsContainer}>
                  <Text style={styles.bookedHospitalsTitle}>Your Bookings</Text>
                  <FlatList
                    data={bookings}
                    renderItem={(data: any) => {
                      const item = data?.item
                      return <BookedHospitalCard
                        key={item.id}
                        {...item}
                        isFavorite={favorites.includes(item?.hospital?.id)}
                        onFavorite={toggleFavorite}
                        onEdit={openEditModel}
                        onCancel={handleCancel}
                        styles={styles}
                        color={color}
                      />
                    }}
                    keyExtractor={item => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 8 }}
                  />
                </View>
              )}

              <>
                <Text style={styles.bookedHospitalsTitle}>Current Hospitals</Text>
                {currentHospitals?.map(hospital => (
                  <HospitalCard
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

            </>

          )}
          {activeTab === 'history' && (
            <>
              {loadingHistoricalVisits ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#002B49" />
                </View>
              ) : (
                historicalVisits.length > 0 ? historicalVisits?.map(hospital => (
                  <HistoricalHospitalCard
                    key={hospital.id}
                    {...hospital}
                    isFavorite={favorites.includes(hospital.id)}
                    onFavorite={toggleFavorite}
                    onGiveReview={handleGiveReview}
                    styles={styles}
                    color={color}
                  />
                )) : <EmptyBookings />
              )}
            </>
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
          onConfirm={isEditingBooking ? handleEdit : handleConfirmBooking}
          specialties={specialties}
        />
      </View>
    </BaseLayout>
  );
};

export default React.memo(HospitalsScreen);

