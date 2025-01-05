import { useState, useCallback, useEffect } from 'react';
import { useAppContext } from '@src/context';
import { hospitalsStyles } from './Hospitals.style';
import { hospitalService } from '../../api/hospital';
import { useSelector } from 'react-redux';

interface Hospital {
  id: number;
  name: string;
  address: string;
  description: string;
  latitude: string;
  longitude: string;
  photo: string;
  rating: number;
  is_active: boolean;
  created_at: string;
}

interface Specialty {
  id: number;
  name: string;
  description: string;
  icon: string | null;
  is_active: boolean;
  created_at: string;
  created_by: number;
}

interface Booking {
  id: number;
  status: string;
  booking_date: string;
  created_at: string;
  user: number;
  hospital: number;
  speciality: number;
  created_by: number | null;
}

const useHospitals = () => {
  const { color, navigation } = useAppContext();
  const [activeTab, setActiveTab] = useState('current');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<number | null>(null);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [currentHospitals, setCurrentHospitals] = useState<Hospital[]>([]);
  const [historicalVisits, setHistoricalVisits] = useState<Hospital[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [loadingCurrentHospitals, setLoadingCurrentHospitals] = useState(true);
  const [loadingHistoricalVisits, setLoadingHistoricalVisits] = useState(true);
  const [isEditingBooking, setIsEditingBooking] = useState(false);
  const [editBookingId, setEditBookingId] = useState<number | null>(null);
  const token = useSelector((state: any) => state.auth?.isToken);
  const patientId = useSelector((state: any) => state.auth.userInfo?.userId);



  const fetchData = useCallback(async () => {
    setLoadingBookings(true);
    // setLoadingCurrentHospitals(true);
    setLoadingHistoricalVisits(true);
    try {
      const [allHospitals, currentHospitalsData, historicalHospitalsData, specialtiesData, bookingsData, favoriteHospitals]: any = await Promise.all([
        hospitalService.getHospitals(token),
        hospitalService.getCurrentHospitals(token),
        hospitalService.getHistoricalHospitals(token),
        hospitalService.getSpecialties(token),
        hospitalService.getBookings(token),
        hospitalService.getFavoriteHospitals(token)
      ]);

      console.log("🚀 ~ fetchData ~ historicalHospitalsData:", historicalHospitalsData)
      setHospitals(allHospitals);
      setCurrentHospitals(currentHospitalsData?.results);
      setHistoricalVisits(historicalHospitalsData);
      setSpecialties(specialtiesData.data);
      setFavorites(favoriteHospitals.results.map((favorite: any) => favorite?.hospital?.id));
      setBookings(bookingsData?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingBookings(false);
      setLoadingCurrentHospitals(false);
      setLoadingHistoricalVisits(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const toggleFavorite = useCallback(async (hospitalId: number) => {
    try {
      await hospitalService.toggleFavorite(token, hospitalId);
      setFavorites(prev =>
        prev.includes(hospitalId)
          ? prev.filter(id => id !== hospitalId)
          : [...prev, hospitalId]
      );
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  }, []);

  const handleBookNow = useCallback((hospital: Hospital) => {
    setSelectedHospital(hospital);
    setShowBookingModal(true);
  }, []);

  const handleConfirmBooking = useCallback(async () => {
    if (!selectedHospital || !selectedSpecialty) return;

    try {
      const userId = patientId;
      await hospitalService.createBooking(token, userId, selectedHospital.id, selectedSpecialty, selectedDate);
      await fetchData(); // Refresh data after booking
      setShowBookingModal(false);
      setSelectedDate('');
      setSelectedSpecialty(null);
      setSelectedHospital(null);
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  }, [selectedHospital, selectedSpecialty, selectedDate, fetchData]);

  const handleEdit = useCallback(async () => {
    if (!selectedHospital || !selectedSpecialty) return;
    try {
      setLoadingBookings(true);
      if (editBookingId) {
        console.log("🚀 ~ handleEdit ~ editBookingId:", editBookingId, {
          hospital: selectedHospital.id,
          speciality: selectedSpecialty,
          booking_date: selectedDate
        })
        const response = await fetch(`https://technlogics.co/api/bookings/${editBookingId}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            hospital: selectedHospital.id,
            speciality: selectedSpecialty,
            booking_date: selectedDate
          })
        });
        const data = await response.json();
        if (data.status) {
          await fetchData(); // Refresh data after booking
          setSelectedDate('');
          setSelectedSpecialty(null);
          setSelectedHospital(null);
        }
      }
    } catch (error) {
      console.error('Error editing booking:', error);
    } finally {
      setLoadingBookings(false);
      setShowBookingModal(false);

    }
  }, [token, selectedDate, selectedSpecialty, selectedHospital, fetchData]);

  const openEditModel = useCallback((bookingId: any) => {
    const booking: any = bookings.find(b => b.id === bookingId);
    console.log("🚀 ~ openEditModel ~ booking:", booking)
    if (booking) {
      setIsEditingBooking(true)
      setEditBookingId(bookingId);
      setSelectedHospital(booking?.hospital);
      setSelectedDate(booking?.booking_date);
      setSelectedSpecialty(booking?.speciality?.id);
    }
    setShowBookingModal(true);
  }, [bookings]);

  const handleCancel = useCallback(async (bookingId: number) => {
    try {
      setLoadingBookings(true);
      const response = await fetch(`https://technlogics.co/api/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      if (response.ok) {
        await fetchData(); // Refresh data after booking
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
    } finally {
      setLoadingBookings(false);
    }
  }, [token]);


  const handleGiveReview = useCallback((hospitalId: number) => {
    // Navigate to review screen
    // navigation.navigate('ReviewHospital', { hospitalId });
  }, [navigation]);

  return {
    navigation,
    styles: hospitalsStyles(color),
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
    setSelectedSpecialty: (specialty: number | null) => {
      console.log("🚀 ~ useHospitals ~ specialty:", specialty)
      setSelectedSpecialty(specialty)
    },
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
  };
};

export default useHospitals;

