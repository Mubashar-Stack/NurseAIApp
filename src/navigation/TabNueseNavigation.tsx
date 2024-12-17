import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ChatsScreen, Home, Message, Profile, TaskList } from '@src/screens';
import { Screen } from './appNavigation.type';
import { getFocusedRouteNameFromRoute, useFocusEffect, RouteProp } from '@react-navigation/native';
import { Platform, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useColor } from '@src/context';

type TabParamList = {
  [Screen.NURSE_HOME]: undefined;
  [Screen.CHATS]: undefined;
  [Screen.TASK_LIST]: undefined;
  [Screen.PROFILE]: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

interface TabNurseNavigatorProps {
  route: RouteProp<TabParamList, keyof TabParamList>;
}

const TabNurseNavigator: React.FC<TabNurseNavigatorProps> = ({ route }) => {
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
      initialRouteName={Screen.NURSE_HOME}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          position: 'absolute',
          elevation: 0,
          height: Platform.OS == 'ios' ? 90 : 50,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          overflow: 'hidden',
        },
      }}>
      <Tab.Screen
        name={Screen.NURSE_HOME}
        component={Home}
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
                  height: 40,
                  width: 40,
                  backgroundColor: activeTab === Screen.HOME ? '#ccc' : '#E6E6E6',
                  borderRadius: 35,
                }}>
                <Feather name={'home'} size={22} color={color?.textColor} />
              </View>
            ) : (
              <Feather name={'home'} size={22} color={color?.textColor} />
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
                  height: 40,
                  width: 40,
                  backgroundColor: activeTab === Screen.CHATS ? '#ccc' : '#E6E6E6',
                  borderRadius: 35,
                }}>
                <Ionicons name={'chatbubble-outline'} size={24} color={color?.textColor} />
              </View>
            ) : (
              <Ionicons name={'chatbubble-outline'} size={24} color={color?.textColor} />
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
                  height: 40,
                  width: 40,
                  backgroundColor: activeTab === Screen.TASK_LIST ? '#ccc' : '#E6E6E6',
                  borderRadius: 35,
                }}>
                <Ionicons name={'document-text-outline'} size={24} color={color?.textColor} />
              </View>
            ) : (
              <Ionicons name={'document-text-outline'} size={24} color={color?.textColor} />
            )
          ),
        }}
      />
      <Tab.Screen
        name={Screen.PROFILE}
        component={Profile}
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
                  height: 40,
                  width: 40,
                  backgroundColor: activeTab === Screen.PROFILE ? '#ccc' : '#E6E6E6',
                  borderRadius: 35,
                }}>
                <Ionicons name={'person-circle-outline'} size={24} color={color?.textColor} />
              </View>
            ) : (
              <Ionicons name={'person-circle-outline'} size={24} color={color?.textColor} />
            )
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default TabNurseNavigator;