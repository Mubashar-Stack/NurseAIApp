import { BaseLayout } from '@src/components';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@app/blueprints';
import { useAppContext, useColor } from '@src/context';
import mainStyle from '@src/constants/MainStyles';
import { Screen } from '../../navigation/appNavigation.type';
import { scaledSize } from '@src/utils';

const MainScreen = () => {
  const { color } = useColor();
  const design = mainStyle(color);
  const { navigation } = useAppContext();

  return (
    <BaseLayout>
      <View style={design.mainView}>
        <View style={design.subView} >
          <Text preset='h2' style={{ textAlign: 'center', padding: scaledSize(20) }} >Let's take the next step toward a healthier you!</Text>
          <View style={design.imagePlaceholder}>
            <Text preset='h2' >Image</Text>
          </View>
          <TouchableOpacity style={design.footerBtn} onPress={() => navigation.navigate(Screen.SIGNUP)} >
            <Text style={design.footerBtnTxt}>Get Start</Text>
          </TouchableOpacity>
          <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
            <Text preset="h3">Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate(Screen.LOGIN)}>
              <Text preset="h2" >Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </BaseLayout>
  );
};
export default MainScreen;