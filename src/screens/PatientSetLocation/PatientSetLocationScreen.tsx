import React from 'react';
import { View, TextInput, TouchableOpacity, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text } from '@app/blueprints';
import usePatientSetLocation, { LocationSuggestion } from './usePatientSetLocation';

const LocationSuggestions = ({
  suggestions,
  isLoading,
  onSelectSuggestion,
  styles,
  color,
}: {
  suggestions: LocationSuggestion[];
  isLoading: boolean;
  onSelectSuggestion: (suggestion: LocationSuggestion) => void;
  styles: any;
  color: any;
}) => {
  if (!suggestions.length && !isLoading) return null;

  return (
    <View style={styles.suggestionsContainer}>
      <ScrollView keyboardShouldPersistTaps="always">
        {isLoading ? (
          <View style={styles.loadingIndicator}>
            <ActivityIndicator size="small" color={color.textColor} />
          </View>
        ) : (
          suggestions.map((suggestion) => (
            <TouchableOpacity
              key={suggestion.placeId}
              style={styles.suggestionItem}
              onPress={() => onSelectSuggestion(suggestion)}
            >
              <Text style={styles.suggestionText}>{suggestion.mainText}</Text>
              <Text style={styles.suggestionSubText}>
                {suggestion.secondaryText}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const PatientSetLocationScreen = () => {
  const {
    styles,
    searchQuery,
    setSearchQuery,
    handleSetLocation,
    suggestions,
    isSearching,
    handleSelectSuggestion,
    mapRef,
    initialRegion,
    handleRegionChange,
    color,
    isLoading,
    hasLocationPermission,
    requestLocationPermission,
    currentLocation,
    selectedPlace,
    handleCurrentLocationClick
  } = usePatientSetLocation();


  if (!hasLocationPermission) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>
            We need access to your location to provide better service. Please enable location services to continue.
          </Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestLocationPermission}
          >
            <Text style={styles.buttonText}>Enable Location</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={color.textColor} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor={color.textColor}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity>
            <Ionicons name="mic-outline" color={color.textColor} size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <LocationSuggestions
        suggestions={suggestions}
        isLoading={isSearching}
        onSelectSuggestion={handleSelectSuggestion}
        styles={styles}
        color={color}
      />

      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          initialRegion={currentLocation || initialRegion}
          onRegionChangeComplete={handleRegionChange}
          showsUserLocation
        // showsMyLocationButton
        // onUserLocationChange={handleCurrentLocationClick}
        >
          {selectedPlace && selectedPlace.location && (
            <Marker
              coordinate={{
                latitude: selectedPlace.location.latitude,
                longitude: selectedPlace.location.longitude,
              }}
              title={selectedPlace.mainText}
              description={selectedPlace.secondaryText}
            />
          )}
        </MapView>
        <TouchableOpacity
          style={styles.currentLocationButton}
          onPress={handleCurrentLocationClick}
        >
          <Ionicons name="arrow-undo-outline" size={24} color={color.primaryColor} />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.setLocationButton}
          onPress={handleSetLocation}
        >
          {isLoading ? <ActivityIndicator size="small" color="#FFF" /> : <Text style={styles.buttonText}>Set location</Text>}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default React.memo(PatientSetLocationScreen);

