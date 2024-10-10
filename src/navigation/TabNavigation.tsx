import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Document, Home, Message, Profile } from '@src/screens';
import { Screen } from './appNavigation.type';
import { getFocusedRouteNameFromRoute, useFocusEffect, RouteProp } from '@react-navigation/native';
import { View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

type TabParamList = {
  [Screen.HOME]: undefined;
  [Screen.MESSAGE]: undefined;
  [Screen.DOCUMENT]: undefined;
  [Screen.PROFILE]: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

interface TabNavigatorProps {
  route: RouteProp<TabParamList, keyof TabParamList>;
}

const TabNavigator: React.FC<TabNavigatorProps> = ({ route }) => {
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
          height: 68,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          overflow: 'hidden',
        },
      }}>
      <Tab.Screen
        name={Screen.HOME}
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
                <Feather name={'home'} size={24} color={'black'} />
              </View>
            ) : (
              <Feather name={'home'} size={24} color={'black'} />
            )
          ),
        }}
      />
      <Tab.Screen
        name={Screen.MESSAGE}
        component={Message}
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
                  backgroundColor: activeTab === Screen.MESSAGE ? '#ccc' : '#E6E6E6',
                  borderRadius: 35,
                }}>
                <Ionicons name={'chatbubble-outline'} size={30} color={'black'} />
              </View>
            ) : (
              <Ionicons name={'chatbubble-outline'} size={30} color={'black'} />
            )
          ),
        }}
      />
      <Tab.Screen
        name={Screen.DOCUMENT}
        component={Document}
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
                  backgroundColor: activeTab === Screen.DOCUMENT ? '#ccc' : '#E6E6E6',
                  borderRadius: 35,
                }}>
                <Ionicons name={'document-text-outline'} size={30} color={'black'} />
              </View>
            ) : (
              <Ionicons name={'document-text-outline'} size={30} color={'black'} />
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
                <Ionicons name={'person-circle-outline'} size={30} color={'black'} />
              </View>
            ) : (
              <Ionicons name={'person-circle-outline'} size={30} color={'black'} />
            )
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default TabNavigator;