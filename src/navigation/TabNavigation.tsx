import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ChatsScreen, Home, HospitalsScreen, Message, PatientHomeScreen, PatientProfileScreen, Profile, TaskList } from '@src/screens';
import { Screen } from './appNavigation.type';
import { getFocusedRouteNameFromRoute, useFocusEffect, RouteProp } from '@react-navigation/native';
import { Platform, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import { useColor } from '@src/context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type TabParamList = {
  [Screen.HOME]: undefined;
  [Screen.CHATS]: undefined;
  [Screen.TASK_LIST]: undefined;
  [Screen.NOTIFICATION]: undefined;
  [Screen.PROFILE]: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

interface TabNavigatorProps {
  route: RouteProp<TabParamList, keyof TabParamList>;
}

const TabNavigator: React.FC<TabNavigatorProps> = ({ route }) => {
  const { color } = useColor();
  const [activeTab, setActiveTab] = useState<string>(Screen.HOME);

  useFocusEffect(
    React.useCallback(() => {
      const routeName = getFocusedRouteNameFromRoute(route) ?? Screen.HOME;
      setActiveTab(routeName);
    }, [route]),
  );

  return (
    <Tab.Navigator
      initialRouteName={Screen.HOME}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          position: 'absolute',
          elevation: 0,
          height: Platform.OS == 'ios' ? 90 : 60,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          overflow: 'hidden',
        },
      }}>
      <Tab.Screen
        name={Screen.HOME}
        component={PatientHomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: () => null,
          tabBarItemStyle: {
            margin: 0,
            backgroundColor: '#E6E6E6',
          },
          tabBarIcon: ({ focused }) => (
            focused ? (
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 45,
                  width: 45,
                  backgroundColor: activeTab === Screen.HOME ? '#ccc' : '#E6E6E6',
                  borderRadius: 35,
                }}>
                <Feather name={'home'} size={25} color={color?.textColor} />
              </View>
            ) : (
              <Feather name={'home'} size={25} color={color?.textColor} />
            )
          ),
        }}
      />
      <Tab.Screen
        name={Screen.CHATS}
        component={ChatsScreen}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarLabel: () => null,
          tabBarItemStyle: {
            margin: 0,
            backgroundColor: '#E6E6E6',
          },
          tabBarIcon: ({ focused }) => (
            focused ? (
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 48,
                  width: 48,
                  backgroundColor: activeTab === Screen.CHATS ? '#ccc' : '#E6E6E6',
                  borderRadius: 35,
                }}>
                <Ionicons name={'chatbubbles-outline'} size={30} color={color?.textColor} />
              </View>
            ) : (
              <Ionicons name={'chatbubbles-outline'} size={30} color={color?.textColor} />
            )
          ),
        }}
      />
      <Tab.Screen
        name={Screen.TASK_LIST}
        component={TaskList}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarLabel: () => null,
          tabBarItemStyle: {
            margin: 0,
            backgroundColor: '#E6E6E6',
          },
          tabBarIcon: ({ focused }) => (
            focused ? (
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 48,
                  width: 48,
                  backgroundColor: activeTab === Screen.TASK_LIST ? '#ccc' : '#E6E6E6',
                  borderRadius: 35,
                }}>
                <EvilIcons name={'heart'} size={40} color={color?.textColor} />
              </View>
            ) : (
              <EvilIcons name={'heart'} size={40} color={color?.textColor} />
            )
          ),
        }}
      />
      <Tab.Screen
        name={Screen.NOTIFICATION}
        component={HospitalsScreen}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarLabel: () => null,
          tabBarItemStyle: {
            margin: 0,
            backgroundColor: '#E6E6E6',
          },
          tabBarIcon: ({ focused }) => (
            focused ? (
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 50,
                  width: 50,
                  backgroundColor: activeTab === Screen.NOTIFICATION ? '#ccc' : '#E6E6E6',
                  borderRadius: 35,
                }}>
                <FontAwesome name={'hospital-o'} size={25} color={color?.textColor} />
              </View>
            ) : (
              <FontAwesome name={'hospital-o'} size={25} color={color?.textColor} />
            )
          ),
        }}
      />
      <Tab.Screen
        name={Screen.PROFILE}
        component={PatientProfileScreen}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarLabel: () => null,
          tabBarItemStyle: {
            margin: 0,
            backgroundColor: '#E6E6E6',
          },
          tabBarIcon: ({ focused }) => (
            focused ? (
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 50,
                  width: 50,
                  backgroundColor: activeTab === Screen.PROFILE ? '#ccc' : '#E6E6E6',
                  borderRadius: 35,
                }}>
                <EvilIcons name={'user'} size={40} color={color?.textColor} />
              </View>
            ) : (
              <EvilIcons name={'user'} size={40} color={color?.textColor} />
            )
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default TabNavigator;