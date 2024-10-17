import { BaseLayout } from '@src/components';
import Header from '@src/components/Header/Header';
import mainStyle from '@src/constants/MainStyles';
import { useAppContext, useColor } from '@src/context';
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text } from '@app/blueprints';
import { scaleHeight, scaledSize } from '@src/utils';
import { Screen } from '../../navigation/appNavigation.type';

interface MenuItemProps {
  icon: JSX.Element;
  title: string;
  onPress: () => void;
};

const Profile = () => {
  const { color } = useColor();
  const { navigation } = useAppContext();
  const design = mainStyle(color);

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
            <View style={styles.avatar} />
            <View>
              <Text preset='h1'>Nurse One</Text>
              <Text preset='h2'>Specialty of the nurse</Text>
            </View>
          </View>
          <View style={{ marginTop: scaleHeight(40) }}>
            <MenuItem icon={<Ionicons name={'person-outline'} size={24} color={color.textColor} />} title="Account Settings" onPress={() => { navigation.navigate(Screen.ACCOUNT_SETTING) }} />
            <MenuItem icon={<Feather name={'map-pin'} size={24} color={color.textColor} />} title="Address" onPress={() => { navigation.navigate(Screen.ADDRESS) }} />
            <MenuItem icon={<Ionicons name={'wallet-outline'} size={24} color={color.textColor} />} title="Wallet" onPress={() => { navigation.navigate(Screen.WALLET) }} />
            <MenuItem icon={<AntDesign name={'sharealt'} size={24} color={color.textColor} />} title="Share profile" onPress={() => { }} />
            <MenuItem icon={<Feather name={'settings'} size={24} color={color.textColor} />} title="Settings" onPress={() => { navigation.navigate(Screen.SETTING) }} />
            <MenuItem icon={<AntDesign name={'logout'} size={24} color={color.textColor} />} title="Log out" onPress={() => { }} />
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