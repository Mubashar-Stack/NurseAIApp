import React from 'react';
import { View, Switch, TouchableOpacity } from 'react-native';
import { Text } from '@app/blueprints';
import { BaseLayout } from '@src/components';
import { useColor } from '@src/context';
import useSetting from './useSetting';
import Header from '@src/components/Header/Header';
import mainStyle from '@src/constants/MainStyles';
import { scaledSize } from '@src/utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import { Screen } from '../../navigation/appNavigation.type';


const SettingScreen = () => {
  const { color } = useColor();
  const design = mainStyle(color);

  const {
    handleToggleTheme,
    handleToggleLanguage,
    isDarkModeEnabled,
    isEnglishEnabled,
    navigation
  } = useSetting();

  return (
    <BaseLayout>
      <View style={design.mainView}>
        <Header onPress={() => navigation.goBack()} title="Settings" />
        <View style={design.subView}>
          <TouchableOpacity style={design.listView} onPress={() => { navigation.navigate(Screen.NOTIFICATION) }}>
            <View style={{ flexDirection: 'row' }}>
              <Ionicons name={'notifications-outline'} size={24} color={color.textColor} />
              <Text preset='h2' style={{ marginLeft: scaledSize(18) }}>Notification</Text>
            </View>
            <AntDesign size={18} name={"right"} color={color.textColor} />
          </TouchableOpacity>
          <TouchableOpacity style={design.listView} onPress={() => { navigation.navigate(Screen.HELP_AND_SUPPORT) }}>
            <View style={{ flexDirection: 'row' }}>
              <Feather name={'help-circle'} size={24} color={color.textColor} />
              <Text preset='h2' style={{ marginLeft: scaledSize(18) }}>Help & Support</Text>
            </View>
            <AntDesign size={18} name={"right"} color={color.textColor} />
          </TouchableOpacity>
          {/* <View style={design.listView}>
            <View style={{ flexDirection: 'row' }}>
              <FontAwesome name={'moon-o'} size={24} color={color.textColor} />
              <Text preset='h2' style={{ marginLeft: scaledSize(18) }}>Dark mode</Text>
            </View>
            <Switch value={isDarkModeEnabled} onValueChange={handleToggleTheme} />
          </View> */}
          <View style={design.listView}>
            <View style={{ flexDirection: 'row' }}>
              <Fontisto name={'world-o'} size={24} color={color.textColor} />
              <Text preset='h2' style={{ marginLeft: scaledSize(18) }}>Language</Text>
            </View>
            <Switch value={isEnglishEnabled} onValueChange={handleToggleLanguage} />
          </View>
          <TouchableOpacity style={{ borderBottomColor: color.textColor, borderBottomWidth: 0.5, width: '60%', alignSelf: 'center', marginVertical: scaledSize(30) }}>
            <Text preset='h2' style={{ textAlign: 'center', }} >Privacy, Terms & Conditions</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BaseLayout>
  );
};
export default React.memo(SettingScreen);