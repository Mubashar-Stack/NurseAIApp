import React from 'react';
import { Keyboard, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, View } from 'react-native';
import { BaseLayout } from '@src/components';
import { useAppContext, useColor } from '@src/context';
import mainStyle from '@src/constants/MainStyles';
import Header from '@src/components/Header/Header';
import { Text } from '../../../blueprints/Text/Text';

const ShareProfile = () => {
  const { color } = useColor();
  const design = mainStyle(color);
  const { navigation } = useAppContext();

  return (
    <BaseLayout>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={design.mainView} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <Header onPress={() => navigation.goBack()} title="ShareProfile" />
          <View style={design.subView}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text preset='h1' >Welcome ShareProfile</Text>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </BaseLayout>
  );
};
export default React.memo(ShareProfile);