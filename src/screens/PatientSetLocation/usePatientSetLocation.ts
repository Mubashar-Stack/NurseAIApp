import { useState, useRef, useCallback, useEffect } from 'react';
import { Platform, Alert } from 'react-native';
import { Region } from 'react-native-maps';
import { request, PERMISSIONS, RESULTS, check } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import { useAppContext } from '@src/context';
import { PatientSetLocationStyles } from './PatientSetLocation.style';
import { debounce } from 'lodash';
import { Screen } from '../../navigation/appNavigation.type';

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
  const { color, navigation } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<Region | null>(null);
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSelectingSuggestion, setIsSelectingSuggestion] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<LocationSuggestion | null>(null);
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

  const getCurrentLocation = useCallback(() => {
    Geolocation.getCurrentPosition(
      position => {
        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        };
        setCurrentLocation(region);
        setCurrentRegion(region);
      },
      error => {
        console.error('Error getting current location:', error);
        Alert.alert('Error', 'Failed to get your current location');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);

  useEffect(() => {
    const initializeLocation = async () => {
      const hasPermission = await checkLocationPermission();
      setHasLocationPermission(hasPermission);

      if (hasPermission) {
        getCurrentLocation();
      }

      setIsLoading(false);
    };

    initializeLocation();
  }, [checkLocationPermission, getCurrentLocation]);

  const handleRegionChange = useCallback((region: Region) => {
    setCurrentRegion(region);
  }, []);

  const handleSetLocation = useCallback(() => {
    // Handle saving the selected location
    console.log('Selected location:', currentRegion);
    navigation.navigate(Screen.PATIENT_LOCATION_SETUP);

  }, [currentRegion, navigation]);

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
    } catch (error) {
      console.error('Error fetching place suggestions:', error);
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

  const handleSelectSuggestion = async (suggestion: LocationSuggestion) => {
    setIsSelectingSuggestion(true); // Prevent triggering search again
    setSearchQuery(suggestion.mainText); // Set the query to the selected suggestion text
    setSuggestions([]); // Clear suggestions
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
        setSelectedPlace({ location, ...suggestion }); // Set the selected place for marker
      }
    } catch (error) {
      console.error('Error handling suggestion selection:', error);
      Alert.alert('Error', 'Failed to get location details');
    } finally {
      setIsSelectingSuggestion(false); // Allow future searches
    }
  };

  useEffect(() => {
    if (!isSelectingSuggestion && searchQuery !== selectedPlace?.mainText) {
      debouncedFetchSuggestions(searchQuery); // Only search when not selecting
    }
  }, [searchQuery, isSelectingSuggestion]);

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
    selectedPlace
  };
};

export default usePatientSetLocation;

