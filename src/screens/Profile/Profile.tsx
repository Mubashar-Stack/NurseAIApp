import { BaseLayout } from '@src/components';
import Header from '@src/components/Header/Header';
import mainStyle from '@src/constants/MainStyles';
import { storage, useAppContext, useColor } from '@src/context';
import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text } from '@app/blueprints';
import { scaleHeight, scaledSize } from '@src/utils';
import { Screen } from '../../navigation/appNavigation.type';
import store from '../../redux/store';
import { StorageKeys } from '@src/constants/storageKeys';
import { setToken, setUserInfo } from '../../redux/slices/auth';
import { useSelector } from 'react-redux';
import { fetchUserProfile } from '../../api/profile';

interface MenuItemProps {
  icon: JSX.Element;
  title: string;
  onPress: () => void;
};

const Profile = () => {
  const { color } = useColor();
  const { navigation } = useAppContext();
  const design = mainStyle(color);
  const token = useSelector((state: any) => state.auth.isToken);
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  const [profilePhoto, setProfilePhoto] = useState<any>(null);

  const loadProfile = useCallback(async () => {
    try {
      const response = await fetchUserProfile(token);
      if (response.status && response.data) {
        const { name, email, mobile_no, user_photo, gender, mrn } = response.data;
        const [firstName, lastName] = name.split(' ');
        setProfileData({
          firstName: firstName || '',
          lastName: lastName || '',
          name,
          email,
          phone: mobile_no,
          gender: gender,
          mrn
        });
        setProfilePhoto(user_photo);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load profile data');
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const MenuItem: React.FC<MenuItemProps> = ({ icon, title, onPress }) => (
    <TouchableOpacity style={design.listView} onPress={onPress}>
      {title == 'Log out' ? (
        <View style={{ flexDirection: 'row' }}>
          {icon}
          <Text preset='h2' style={{ marginLeft: scaledSize(18) }}>{title}</Text>
        </View>
      ) : (
        <>
          <View style={{ flexDirection: 'row' }}>
            {icon}
            <Text preset='h2' style={{ marginLeft: scaledSize(18) }}>{title}</Text>
          </View>
          <AntDesign size={18} name={"right"} color={color.textColor} />
        </>
      )
      }
    </TouchableOpacity>
  );
  return (
    <BaseLayout>
      <View style={design.mainView}>
        <Header onPress={() => navigation.goBack()} title="My profile" />
        <View style={design.subView}>
          <View style={styles.profileInfo}>
            <Image
              source={{ uri: profilePhoto }}
              style={styles.avatar}
            />
            <View>
              <Text preset='h1'>{profileData?.name}</Text>
              <Text preset='h2'>{profileData?.mrn}</Text>
            </View>
          </View>
          <View style={{ marginTop: scaleHeight(40) }}>
            <MenuItem icon={<Ionicons name={'person-outline'} size={24} color={'#002A65'} />} title="Account Settings" onPress={() => { navigation.navigate(Screen.ACCOUNT_SETTING) }} />
            <MenuItem icon={<Feather name={'map-pin'} size={24} color={'#002A65'} />} title="Address" onPress={() => { navigation.navigate(Screen.ADDRESS) }} />
            <MenuItem icon={<Ionicons name={'wallet-outline'} size={24} color={'#002A65'} />} title="Wallet" onPress={() => { navigation.navigate(Screen.WALLET) }} />
            <MenuItem icon={<AntDesign name={'sharealt'} size={24} color={'#002A65'} />} title="Share profile" onPress={() => { }} />
            <MenuItem icon={<Feather name={'settings'} size={24} color={'#002A65'} />} title="Settings" onPress={() => { navigation.navigate(Screen.SETTING) }} />
            <MenuItem icon={<AntDesign name={'logout'} size={24} color={'#002A65'} />} title="Log out" onPress={() => {
              store.dispatch(setUserInfo({ userId: null, email: null, role: null }));
              storage.deleteStorage(StorageKeys.USER_ID);
              storage.deleteStorage(StorageKeys.USER_TOKEN);
              store.dispatch(setToken(null));
              navigation.reset({
                index: 0,
                routes: [{ name: Screen.LOGIN }],
              });
            }} />
          </View>
        </View>
      </View>
    </BaseLayout>

  );
}

const styles = StyleSheet.create({
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e0e0e0',
    marginRight: 16,
  },
});
export default Profile;