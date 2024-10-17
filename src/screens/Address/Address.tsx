import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Text } from '@app/blueprints';
import { BaseLayout } from '@src/components';
import Header from '@src/components/Header/Header';
import { useAppContext, useColor } from '@src/context';
import mainStyle from '@src/constants/MainStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { scaleHeight } from '@src/utils';

interface Address {
  id: string;
  name: string;
  address: string;
}

export default function AddressScreen() {
  const { color } = useColor();
  const design = mainStyle(color);
  const { navigation } = useAppContext();
  const [addresses, setAddresses] = useState<Address[]>([
    { id: '1', name: 'Home', address: '1234 Elm Street, Apt 56B, Springfield' },
    { id: '2', name: 'Hospital', address: '1234 Elm Street, Apt 56B, Springfield' },
  ]);

  const deleteAddress = (id: string) => {
    setAddresses(addresses.filter(address => address.id !== id));
  };

  const renderAddressItem = ({ item }: { item: Address }) => (
    <View style={styles.addressItem}>
      <View style={styles.addressInfo}>
        <Feather name={'map-pin'} size={24} color={color?.textColor} />
        <View style={{ marginLeft: 16 }}>
          <Text preset='h2'>{item.name}</Text>
          <Text preset='h4'>{item.address}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => deleteAddress(item.id)}>
        <Ionicons name="trash-outline" color={color?.textColor} size={24} />
      </TouchableOpacity>
    </View>
  );

  return (
    <BaseLayout>
      <View style={design.mainView}>
        <Header onPress={() => navigation.goBack()} title="Address" />
        <View style={design.subView}>
          <View style={{ flex: 1 }}>
            <FlatList
              data={addresses}
              renderItem={renderAddressItem}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.addressList}
            />
            <TouchableOpacity style={styles.addButton}>
              <Entypo name="plus" color={color?.textColor} size={24} />
              <Text preset='h2'>Add New Location</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </BaseLayout>
  );
}

const styles = StyleSheet.create({
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
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
});