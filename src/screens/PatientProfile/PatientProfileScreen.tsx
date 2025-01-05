import React from 'react';
import { View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Text } from '@app/blueprints';
import { BaseLayout } from '@src/components';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import usePatientProfile from './usePatientProfile';
import { Screen } from '../../navigation/appNavigation.type';

const PatientProfileScreen = () => {
  const { profilePhoto, profileData, styles, color, handleMenuItemPress, handleLogout } = usePatientProfile();

  const menuItems = [
    { icon: 'person-outline', label: 'Account Settings', screen: Screen.PATIENT_ACCOUNT_SETTINGS },
    { icon: 'history', label: 'Medical History', screen: Screen.MEDICAL_HISTORY },
    { icon: 'account-balance-wallet', label: 'Credit Cards', screen: Screen.PATIENT_CREDIT_CARD },
    { icon: 'location-on', label: 'Address', screen: Screen.ADDRESS },
    { icon: 'settings', label: 'Settings', screen: Screen.SETTING },
  ];

  return (
    <BaseLayout>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <Text preset="h1">My profile</Text>
          </View>

          <View style={styles.profileSection}>
            <Image
              source={{ uri: profilePhoto }}
              style={styles.avatar}
            />
            <View style={styles.profileInfo}>
              <Text preset="h2">{profileData?.name}</Text>
              <Text preset="h4" color={color.textColor}>
                {profileData?.email}
              </Text>
            </View>
          </View>

          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => handleMenuItemPress(item.screen)}
            >
              <MaterialIcons
                name={item.icon}
                size={24}
                color={'#002A65'}
              />
              <Text preset="h2" style={styles.menuItemText}>
                {item.label}
              </Text>
              <Feather name="chevron-right" size={24} color={'#002A65'} />
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <MaterialIcons
              name="logout"
              size={24}
              color={'#BE0B31'}
            />
            <Text preset="h2" style={styles.menuItemText}>
              Log out
            </Text>
          </TouchableOpacity>
        </ScrollView>

      </View>
    </BaseLayout>
  );
};

export default React.memo(PatientProfileScreen);