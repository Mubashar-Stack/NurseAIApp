import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Text } from '@app/blueprints';
import { BaseLayout } from '@src/components';
import Header from '@src/components/Header/Header';
import { useAppContext, useColor } from '@src/context';
import mainStyle from '@src/constants/MainStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { scaleHeight } from '@src/utils';
import { Address, AddressFormData } from '../../types/address';
import { addressService } from '../../services/addressService';
import AddressModal from './AddressModal';
import { useSelector } from 'react-redux';

export default function AddressScreen() {
  const { color } = useColor();
  const design = mainStyle(color);
  const { navigation } = useAppContext();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const token = useSelector((state: any) => state.auth?.isToken);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const data = await addressService.getAddresses(token);
      setAddresses(data?.data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleAddAddress = async (data: AddressFormData) => {
    try {
      await addressService.addAddress(token, data);
      fetchAddresses();
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  const handleUpdateAddress = async (data: AddressFormData) => {
    if (!selectedAddress?.id) return;
    try {
      await addressService.updateAddress(token, selectedAddress.id, data);
      fetchAddresses();
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };

  const confirmDelete = (id: number) => {
    Alert.alert(
      "Delete Address",
      "Are you sure you want to delete this address? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => handleDeleteAddress(id)
        }
      ]
    );
  };

  const handleDeleteAddress = async (id: number) => {
    try {
      await addressService.deleteAddress(token, id);
      fetchAddresses();
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  const openModal = (address?: Address) => {
    setSelectedAddress(address || null);
    setModalVisible(true);
  };

  const handleModalSubmit = (data: AddressFormData) => {
    if (selectedAddress) {
      handleUpdateAddress(data);
    } else {
      handleAddAddress(data);
    }
    setModalVisible(false);
  };

  const EmptyAddressView = () => (
    <View style={styles.emptyContainer}>
      <Feather name="map-pin" size={48} color={'#002A65'} style={styles.emptyIcon} />
      <Text preset="h2" style={styles.emptyText}>No addresses added yet</Text>
      <Text preset="h4" style={styles.emptySubText}>Add your first address by clicking the button below</Text>
    </View>
  );

  const renderAddressItem = ({ item }: { item: Address }) => (
    <View style={styles.addressItem}>
      <TouchableOpacity
        style={styles.addressInfo}
        onPress={() => openModal(item)}
      >
        <Feather name="map-pin" size={24} color={'#002A65'} />
        <View style={{ marginLeft: 16 }}>
          <Text preset="h2">{item.title}</Text>
          <Text preset="h4">{`${item.address}, ${item.city}, ${item.state} ${item.postal_code}`}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => confirmDelete(item.id!)}>
        <Ionicons name="trash-outline" color={'#BE0B31'} size={24} />
      </TouchableOpacity>
    </View>
  );


  return (
    <BaseLayout>
      <View style={design.mainView}>
        <Header onPress={() => navigation.goBack()} title="Address" />
        <View style={design.subView}>
          <View style={{ flex: 1 }}>
            {loading ? <BaseLayout>
              <View style={[design.mainView, styles.centerContent]}>
                <ActivityIndicator size="large" color={'#002A65'} />
              </View>
            </BaseLayout> : addresses.length === 0 ? (
              <EmptyAddressView />
            ) : (
              <FlatList
                data={addresses}
                renderItem={renderAddressItem}
                keyExtractor={item => item.id?.toString() || ''}
                contentContainerStyle={styles.addressList}
              />
            )}
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => openModal(undefined)}
            >
              <Entypo name="plus" color={'#002A65'} size={24} />
              <Text preset="h2" style={{ marginLeft: 8, color: '#002A65' }}>Add New Location</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <AddressModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setSelectedAddress(null);
        }}
        onSubmit={handleModalSubmit}
        initialData={selectedAddress || undefined}
        color={color}
      />
    </BaseLayout>
  );
}

const styles = StyleSheet.create({
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressList: {
    padding: 16,
  },
  addressItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scaleHeight(16),
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  addressInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyText: {
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubText: {
    textAlign: 'center',
    opacity: 0.7,
  },
});