import { BaseLayout } from '@src/components';
import Header from '@src/components/Header/Header';
import React from 'react';
import { View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Text } from '@app/blueprints';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { scaleHeight } from '@src/utils';
import useNotification from './useNotification';

const Notification = () => {
  const {
    design,
    color,
    navigation,
    settings,
    toggleSetting,
    saveChanges,
    isLoading
  } = useNotification();

  const renderSection = (title: string, options: { key: string; label: string }[]) => (
    <View style={{ marginBottom: scaleHeight(20) }}>
      <Text preset='h2'>{title}</Text>
      {options.map(({ key, label }) => (
        <TouchableOpacity
          key={key}
          style={{ ...design.listView, justifyContent: 'flex-start' }}
          onPress={() => toggleSetting(key as keyof typeof settings)}
        >
          <MaterialCommunityIcons
            size={24}
            name={settings[key as keyof typeof settings] ? "checkbox-marked" : "checkbox-blank-outline"}
            color={color.textColor}
          />
          <Text preset='h4'>{label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <BaseLayout>
      <View style={design.mainView}>
        <Header onPress={() => navigation.goBack()} title="Notification" />
        <View style={design.subView}>
          {isLoading ? (
            <View >
              <ActivityIndicator size="large" color={color.primaryColor} />
            </View>
          ) : (
            <>
              <ScrollView style={{ flex: 1 }}>
                {renderSection('What you receive?', [
                  { key: 'app_updates', label: 'App updates' },
                  { key: 'booking_updates', label: 'Booking updates' },
                  { key: 'patient_health', label: 'Patient health' },
                  { key: 'receive_reviews', label: 'Received reviews' },
                  { key: 'messages', label: 'Messages' },
                ])}

                {renderSection('Where you receive notifications?', [
                  { key: 'notify_on_sms', label: 'SMS' },
                  { key: 'notify_on_app', label: 'In App' },
                  { key: 'notify_on_email', label: 'Email' },
                ])}
              </ScrollView>

              <TouchableOpacity
                style={[design.footerBtn, isLoading && { opacity: 0.5 }]}
                onPress={saveChanges}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={design.footerBtnTxt}>Save changes</Text>
                )}
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </BaseLayout>
  );
};

export default Notification;

