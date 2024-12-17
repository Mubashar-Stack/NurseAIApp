import { useState, useCallback } from 'react';
import { useAppContext } from '@src/context';
import { hospitalsStyles } from './Hospitals.style';

interface Hospital {
  id: string;
  name: string;
  distance: string;
  booking?: {
    date: string;
    specialty: string;
  };
}

interface HistoricalHospitalVisit extends Hospital {
  appointmentDate: string;
  status: 'completed' | 'cancelled' | 'no-show';
  rating?: number;
  hasReview: boolean;
}


const useHospitals = () => {
  const { color, navigation } = useAppContext();
  const [activeTab, setActiveTab] = useState('current');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [hospitals, setHospitals] = useState<Hospital[]>([
    { id: '1', name: 'Name of hospital', distance: 'Distance between user location and hospital' },
    { id: '2', name: 'Name of hospital', distance: 'Distance between user location and hospital' },
    { id: '3', name: 'Name of hospital', distance: 'Distance between user location and hospital' },
  ]);
  const [historicalVisits, setHistoricalVisits] = useState<HistoricalHospitalVisit[]>([
    {
      id: '4',
      name: 'Name of hospital',
      distance: 'Distance between user location and hospital',
      appointmentDate: 'Sun 29, Sep | 11:36 AM',
      status: 'completed',
      hasReview: false
    }
  ]);

  const toggleFavorite = useCallback((hospitalId: string) => {
    setFavorites(prev =>
      prev.includes(hospitalId)
        ? prev.filter(id => id !== hospitalId)
        : [...prev, hospitalId]
    );
  }, []);

  const handleBookNow = useCallback((hospital: Hospital) => {
    setSelectedHospital(hospital);
    setShowBookingModal(true);
  }, []);

  const handleConfirmBooking = useCallback(() => {
    if (!selectedHospital) return;

    setHospitals(prev => prev.map(hospital =>
      hospital.id === selectedHospital.id
        ? {
          ...hospital,
          booking: {
            date: selectedDate,
            specialty: selectedSpecialty
          }
        }
        : hospital
    ));

    setShowBookingModal(false);
    setSelectedDate('');
    setSelectedSpecialty('');
    setSelectedHospital(null);
    setActiveTab('current');
  }, [selectedHospital, selectedDate, selectedSpecialty]);

  const handleEdit = useCallback((hospital: Hospital) => {
    setSelectedHospital(hospital);
    setSelectedDate(hospital.booking?.date || '');
    setSelectedSpecialty(hospital.booking?.specialty || '');
    setShowBookingModal(true);
  }, []);

  const handleCancel = useCallback((hospitalId: string) => {
    setHospitals(prev => prev.map(hospital =>
      hospital.id === hospitalId
        ? {
          ...hospital,
          booking: undefined
        }
        : hospital
    ));
  }, []);


  const handleGiveReview = useCallback((hospitalId: string) => {
    // Navigate to review screen
    // navigation.navigate('ReviewHospital', { hospitalId });
  }, [navigation]);

  const currentHospitals = hospitals.filter(hospital => !hospital.booking);
  const bookedHospitals = hospitals.filter(hospital => hospital.booking);

  return {
    navigation,
    styles: hospitalsStyles(color),
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
    handleGiveReview
  };
};

export default useHospitals;