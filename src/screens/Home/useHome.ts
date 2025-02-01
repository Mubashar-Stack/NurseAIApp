import { useState, useEffect } from 'react';
import { useAppContext } from '@src/context';
import { HomeStyles } from './Home.style';
import { useSelector } from 'react-redux';
import { addressService } from '../../services/addressService';
import { hospitalService } from '../../api/hospital';
import { fetchUserProfile } from '../../api/profile';
import { Address, Hospital, UserProfile } from '../../types/patientHome';
import axios from 'axios';
import { Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import { Alert } from 'react-native';

const usePatientHome = () => {
  const { color, navigation } = useAppContext();
  const [activeSlide, setActiveSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [defaultAddress, setDefaultAddress] = useState<Address | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [news, setNews] = useState([]);
  const token = useSelector((state: any) => state.auth?.isToken);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [currentAddress, setCurrentAddress] = useState('');
  const [checkins, setCheckins] = useState([]);
  const [recommendedVideos, setRecommendedVideos] = useState([]);
  const [technlogicsVideos, setTechnlogicsVideos] = useState([])

  const GOOGLE_PLACES_API_KEY = 'AIzaSyBNWQWVhRgKjAV0nNkMiYWEewCoLzptX8w';

  const checkLocationPermission = async () => {
    try {
      const permission = Platform.select({
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      });

      if (!permission) {
        throw new Error('Platform not supported');
      }

      const result = await check(permission);
      return result === RESULTS.GRANTED;
    } catch (error) {
      console.error('Error checking location permission:', error);
      return false;
    }
  };

  const requestLocationPermission = async () => {
    try {
      const permission = Platform.select({
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      });

      if (!permission) {
        throw new Error('Platform not supported');
      }

      const result = await request(permission);
      const granted = result === RESULTS.GRANTED;
      setHasLocationPermission(granted);

      if (granted) {
        getCurrentLocation();
      } else {
        Alert.alert(
          'Location Permission Required',
          'Please enable location services in your device settings to use this feature.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
      Alert.alert('Error', 'Failed to request location permission');
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude }: any = position.coords;
        setCurrentLocation({ latitude, longitude });
        await getAddressFromCoordinates(latitude, longitude);
      },
      (error) => {
        console.error('Error getting current location:', error);
        Alert.alert('Error', 'Failed to get your current location');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const getAddressFromCoordinates = async (latitude: any, longitude: any) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_PLACES_API_KEY}`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setCurrentAddress(data.results[0].formatted_address);
      }
    } catch (error) {
      console.error('Error getting address:', error);
    }
  };

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

  const fetchCheckins = async () => {
    try {
      const response = await axios.get('https://technlogics.co/api/checkins', {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      setCheckins(response.data.data);
    } catch (error) {
      console.error('Error fetching checkins:', error);
    }
  };

  const fetchRecommendedVideos = async () => {
    try {
      const response = await axios.get('https://technlogics.co/api/recommended-videos', {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      setRecommendedVideos(response.data.data);
    } catch (error) {
      console.error('Error fetching recommended videos:', error);
    }
  };

  const fetchTechnlogicsVideos = async () => {
    try {
      const response = await axios.get(`https://technlogics.co/api/youtube-videos/user/62`, {
        headers: {
          Accept: "application/json",
          Authorization: `Token ${token}`,
        },
      })
      setTechnlogicsVideos(response.data.data)
    } catch (error) {
      console.error("Error fetching Technlogics videos:", error)
    }
  }

  const handleCheckIn = async () => {
    if (!currentLocation) {
      Alert.alert('Error', 'Unable to get current location. Please try again.');
      return;
    }

    try {
      const response = await axios.post(
        'https://technlogics.co/api/checkins',
        {
          location: currentAddress,
          latitude: currentLocation?.latitude?.toString(),
          longitude: currentLocation?.longitude?.toString(),
          description: 'Checked in via app'
        },
        {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Token ${token}`
          }
        }
      );

      if (response.data.status) {
        Alert.alert('Success', response.data.message);
        // Refresh the checkins list
        fetchCheckins();
      } else {
        Alert.alert('Error', 'Failed to check in. Please try again.');
      }
    } catch (error) {
      console.error('Error during check-in:', error);
      Alert.alert('Error', 'An error occurred while checking in. Please try again.');
    }
  };

  const refreshLocation = () => {
    return new Promise<void>((resolve) => {
      Geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude }: any = position.coords;
          setCurrentLocation({ latitude, longitude });
          await getAddressFromCoordinates(latitude, longitude);
          resolve();
        },
        (error) => {
          console.error('Error getting current location:', error);
          Alert.alert('Error', 'Failed to get your current location');
          resolve();
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    });
  };

  useEffect(() => {
    loadData();
    requestLocationPermission();
    fetchCheckins();
    fetchRecommendedVideos();
    fetchTechnlogicsVideos()
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
    styles: HomeStyles(color),
    hospitals,
    activeSlide,
    setActiveSlide,
    loading,
    defaultAddress,
    userProfile,
    color: color,
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
  };
};

export default usePatientHome;

