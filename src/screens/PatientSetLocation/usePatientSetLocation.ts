import { useState, useRef, useCallback, useEffect } from 'react';
import { Platform, Alert } from 'react-native';
import { Region } from 'react-native-maps';
import { request, PERMISSIONS, RESULTS, check } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import { useAppContext } from '@src/context';
import { PatientSetLocationStyles } from './PatientSetLocation.style';
import { debounce } from 'lodash';
import { Screen } from '../../navigation/appNavigation.type';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useVoiceInput } from '@src/context/VoiceInputContext';

export interface LocationSuggestion {
  placeId: string;
  mainText: string;
  secondaryText: string;
  location?: {
    latitude: number;
    longitude: number;
  };
}

// Google Places API Key
const GOOGLE_PLACES_API_KEY = 'AIzaSyBNWQWVhRgKjAV0nNkMiYWEewCoLzptX8w';
const usePatientSetLocation = () => {
  const { color, navigation }: any = useAppContext();
  const { voiceInputText, isListening, startVoiceInput, stopVoiceInput } = useVoiceInput();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<Region | null>(null);
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSelectingSuggestion, setIsSelectingSuggestion] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [isVoiceSearchActive, setIsVoiceSearchActive] = useState(false);
  const token = useSelector((state: any) => state.auth?.isToken);

  const mapRef = useRef(null);


  const initialRegion = {
    latitude: 39.8283,
    longitude: -98.5795,
    latitudeDelta: 30,
    longitudeDelta: 30,
  };

  const [currentRegion, setCurrentRegion] = useState<Region>(initialRegion);

  const checkLocationPermission = useCallback(async () => {
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
  }, []);

  const requestLocationPermission = useCallback(async () => {
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
  }, []);

  const getCurrentLocation = useCallback(async () => {
    return new Promise<void>((resolve, reject) => {
      Geolocation.getCurrentPosition(
        async position => {
          const { latitude, longitude } = position.coords;
          const region = {
            latitude,
            longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          };
          setCurrentLocation(region);
          setCurrentRegion(region);

          const placeDetails = await getPlaceDetailsByCoordinates(latitude, longitude);
          if (placeDetails) {
            setSelectedPlace(placeDetails);
            setSearchQuery(placeDetails.mainText);
          }

          resolve();
        },
        error => {
          console.error('Error getting current location:', error);
          Alert.alert('Error', 'Failed to get your current location');
          reject(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    });
  }, []);

  useEffect(() => {
    if (voiceInputText && isVoiceSearchActive) {
      setSearchQuery(voiceInputText);
      setIsVoiceSearchActive(false);
      debouncedFetchSuggestions(voiceInputText);
    }
  }, [voiceInputText, isVoiceSearchActive]);

  const handleVoiceSearch = async () => {
    if (isListening) {
      await stopVoiceInput();
      setIsVoiceSearchActive(false);
    } else {
      setIsVoiceSearchActive(true);
      await startVoiceInput();
    }
  };

  useEffect(() => {
    const initializeLocation = async () => {
      const hasPermission = await checkLocationPermission();
      setHasLocationPermission(hasPermission);

      if (hasPermission) {
        await getCurrentLocation();
      }

      setIsLoading(false);
    };

    initializeLocation();
  }, [checkLocationPermission, getCurrentLocation]);

  const handleRegionChange = useCallback((region: Region) => {
    setCurrentRegion(region);
  }, []);

  const handleSetLocation = useCallback(async () => {
    if (!selectedPlace || !selectedPlace.location) {
      Alert.alert('Error', 'Please select a location first');
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(
        'https://technlogics.co/api/addresses/add',
        {
          address: selectedPlace.mainText,
          title: "Selected Location",
          city: selectedPlace.secondaryText.split(',')[0].trim(),
          state: selectedPlace.secondaryText.split(',')[1]?.trim() || "NY",
          postal_code: "10001",
          country: selectedPlace.secondaryText.split(',')[2]?.trim() || "USA",
          latitude: selectedPlace.location.latitude.toString(),
          longitude: selectedPlace.location.longitude.toString(),
          is_default: true
        },
        {
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Token ' + token
          }
        }
      );

      if (response.data && response.data.id) {
        navigation.navigate(Screen.PATIENT_LOCATION_SETUP, { locationId: response.data.id });
      } else {
        throw new Error('Failed to add address');
      }
    } catch (error: any) {
      console.error('Error setting location:', error.response.data);
      Alert.alert('Error', error.response.data?.detail || error.response.data?.non_field_errors || 'Failed to set location');
    } finally {
      setIsLoading(false);
    }
  }, [selectedPlace, navigation]);

  const fetchPlaceSuggestions = async (input: string) => {
    if (!input.trim()) {
      setSuggestions([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
          input
        )}&key=${GOOGLE_PLACES_API_KEY}&types=geocode`
      );
      const data = await response.json();

      if (data.status === 'OK') {
        const formattedSuggestions: LocationSuggestion[] = data.predictions.map(
          (prediction: any) => ({
            placeId: prediction.place_id,
            mainText: prediction.structured_formatting.main_text,
            secondaryText: prediction.structured_formatting.secondary_text,
          })
        );
        setSuggestions(formattedSuggestions);
      } else {
        console.error('Place Autocomplete Error:', data.status);
        setSuggestions([]);
      }
    } catch (error: any) {
      console.error('Error fetching place suggestions:', error.response.data);
      setSuggestions([]);
    } finally {
      setIsSearching(false);
    }
  };

  const debouncedFetchSuggestions = useCallback(
    debounce(fetchPlaceSuggestions, 300),
    []
  );

  const getPlaceDetails = async (placeId: string) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry&key=${GOOGLE_PLACES_API_KEY}`
      );
      const data = await response.json();

      if (data.status === 'OK') {
        return {
          latitude: data.result.geometry.location.lat,
          longitude: data.result.geometry.location.lng,
        };
      }
      throw new Error('Failed to get place details');
    } catch (error) {
      console.error('Error getting place details:', error);
      return null;
    }
  };

  const getPlaceDetailsByCoordinates = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_PLACES_API_KEY}`
      );
      const data = await response.json();

      if (data.status === 'OK' && data.results.length > 0) {
        const result = data.results[0];
        return {
          placeId: result.place_id,
          mainText: result.formatted_address,
          secondaryText: result.formatted_address,
          location: {
            latitude,
            longitude
          }
        };
      }
      throw new Error('No results found');
    } catch (error) {
      console.error('Error getting place details by coordinates:', error);
      return null;
    }
  };

  const handleSelectSuggestion = async (suggestion: LocationSuggestion) => {
    setIsSelectingSuggestion(true);
    setSearchQuery(suggestion.mainText);
    setSuggestions([]); // Clear suggestions immediately
    try {
      const location = await getPlaceDetails(suggestion.placeId);
      if (location) {
        const newRegion = {
          ...location,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        };
        setCurrentRegion(newRegion);
        //@ts-ignore
        mapRef.current?.animateToRegion(newRegion, 1000);
        setSelectedPlace({ location, ...suggestion });
      }
    } catch (error) {
      console.error('Error handling suggestion selection:', error);
      Alert.alert('Error', 'Failed to get location details');
    } finally {
      setIsSelectingSuggestion(false);
    }
  };

  const handleCurrentLocationClick = useCallback(async () => {
    try {
      await getCurrentLocation();
    } catch (error) {
      console.error('Error handling current location click:', error);
      Alert.alert('Error', 'Failed to get your current location');
    }
  }, [getCurrentLocation]);


  useEffect(() => {
    if (!isSelectingSuggestion && searchQuery !== selectedPlace?.mainText) {
      debouncedFetchSuggestions(searchQuery);
    }
  }, [searchQuery, isSelectingSuggestion, selectedPlace]);

  return {
    color,
    searchQuery,
    setSearchQuery,
    handleSetLocation,
    suggestions,
    isSearching,
    handleSelectSuggestion,
    mapRef,
    initialRegion,
    handleRegionChange,
    styles: PatientSetLocationStyles(color),
    isLoading,
    hasLocationPermission,
    requestLocationPermission,
    currentLocation,
    selectedPlace,
    handleCurrentLocationClick,
    handleVoiceSearch,
    isListening,
    isVoiceSearchActive,
  };
};

export default usePatientSetLocation;

