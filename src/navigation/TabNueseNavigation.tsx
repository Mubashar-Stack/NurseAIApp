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
          backgroundColor: '#fff',
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
            backgroundColor: '#FFF',
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
                  backgroundColor: activeTab === Screen.NURSE_HOME ? '#E6E6E6' : '#FFF',
                  borderRadius: 35,
                }}>
                <Feather name={'home'} size={29} color={'#BE0B31'} />
              </View>
            ) : (
              <Feather name={'home'} size={29} color={'#002A65'} />
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
            backgroundColor: '#FFF',
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
                  backgroundColor: activeTab === Screen.CHATS ? '#E6E6E6' : '#FFF',
                  borderRadius: 35,
                }}>
                <Ionicons name={'chatbubble-outline'} size={30} color={'#BE0B31'} />
              </View>
            ) : (
              <Ionicons name={'chatbubble-outline'} size={30} color={'#002A65'} />
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
            backgroundColor: '#FFF',
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
                  backgroundColor: activeTab === Screen.TASK_LIST ? '#E6E6E6' : '#FFF',
                  borderRadius: 35,
                }}>
                <Ionicons name={'document-text-outline'} size={30} color={'#BE0B31'} />
              </View>
            ) : (
              <Ionicons name={'document-text-outline'} size={30} color={'#002A65'} />
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
            backgroundColor: '#FFF',
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
                  backgroundColor: activeTab === Screen.PROFILE ? '#E6E6E6' : '#FFF',
                  borderRadius: 35,
                }}>
                <Ionicons name={'person-circle-outline'} size={30} color={'#BE0B31'} />
              </View>
            ) : (
              <Ionicons name={'person-circle-outline'} size={30} color={'#002A65'} />
            )
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default TabNurseNavigator;