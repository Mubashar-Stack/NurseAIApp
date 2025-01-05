import { useState, useEffect } from 'react';
import { useAppContext } from '@src/context';
import { PatientHomeStyles } from './PatientHome.style';
import { useSelector } from 'react-redux';
import { addressService } from '../../services/addressService';
import { hospitalService } from '../../api/hospital';
import { fetchUserProfile } from '../../api/profile';
import { Address, Hospital, UserProfile } from '../../types/patientHome';
import axios from 'axios';

const usePatientHome = () => {
  const { color, navigation } = useAppContext();
  const [activeSlide, setActiveSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [defaultAddress, setDefaultAddress] = useState<Address | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [news, setNews] = useState([]);
  const token = useSelector((state: any) => state.auth?.isToken);

  const fetchNews = async () => {
    try {
      const response = await axios.get('https://technlogics.co/api/news', {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      setNews(response.data.results);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [addressesResponse, profileResponse, hospitalsResponse]: any = await Promise.all([
        addressService.getAddresses(token),
        fetchUserProfile(token),
        hospitalService.getRecommendedHospitals(token),
        fetchNews()
      ]);
      console.log("🚀 ~ loadData ~ addressesResponse:", hospitalsResponse)

      const defaultAddr = addressesResponse?.data.length > 0 ? addressesResponse.data.find((addr: Address) => addr.is_default) : undefined;
      console.log("🚀 ~ loadData ~ defaultAddr:", defaultAddr)
      setDefaultAddress(defaultAddr || null);
      setUserProfile(profileResponse.data);

      // Calculate distances for hospitals if we have a default address
      const hospitalsWithDistance = hospitalsResponse?.results.map((hospital: any) => ({
        ...hospital,
        distance: null
      }));

      setHospitals(hospitalsWithDistance);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    navigation,
    styles: PatientHomeStyles(color),
    hospitals,
    activeSlide,
    setActiveSlide,
    loading,
    defaultAddress,
    userProfile,
    color: color,
    news
  };
};

export default usePatientHome;

