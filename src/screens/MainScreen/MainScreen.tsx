import { BaseLayout } from '@src/components';
import React, { useEffect } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Text } from '@app/blueprints';
import { storage, useAppContext, useColor } from '@src/context';
import mainStyle from '@src/constants/MainStyles';
import { Screen } from '../../navigation/appNavigation.type';
import { scaledSize } from '@src/utils';
import store from '../../redux/store';
import { setToken, setUserInfo } from '../../redux/slices/auth';
import { StorageKeys } from '../../constants/storageKeys';
import { Images } from '@src/assets';

const MainScreen = () => {
  const { color } = useColor();
  const design = mainStyle(color);
  const { navigation } = useAppContext();

  useEffect(() => {
    const checkUserData = async () => {
      const userId = await storage.getData(StorageKeys.USER_ID);
      const userToken = await storage.getData(StorageKeys.USER_TOKEN);
      const email = await storage.getData(StorageKeys.USER_EMAIL);
      const role = await storage.getData(StorageKeys.USER_ROLE);
      console.log("🚀 ~ checkUserData ~ role:", await storage.getStorageKey(), role, email, userToken, userId)

      if (userId && userToken) {
        store.dispatch(
          setUserInfo({
            userId: userId,
            email: email,
            role: role || "patient",
          }),
        );
        store.dispatch(setToken(userToken));
        navigation.navigate(role === "nurse" ? Screen.NURSE_HOME : Screen.HOME);
      }
    };

    checkUserData();
  }, [navigation]);

  return (
    <BaseLayout>
      <View style={design.mainView}>
        <View style={design.subView} >
          <Text preset='h2' style={{ textAlign: 'center', padding: scaledSize(20) }} >Let's take the next step toward a healthier you!</Text>
          <View style={design.imagePlaceholder}>
            <Image
              defaultSource={Images.DOCTOR_IMAGE}
              resizeMode="contain"
              height={scaledSize(150)}
              width={scaledSize(200)}
              source={Images.DOCTOR_IMAGE}
              style={{ marginTop: 10, height: scaledSize(450), width: scaledSize(200), alignItems: 'center', marginLeft: 40 }}
            />
          </View>
          <TouchableOpacity style={design.footerBtn} onPress={() => navigation.navigate(Screen.SIGNUP)} >
            <Text style={design.footerBtnTxt}>Get Start</Text>
          </TouchableOpacity>
          <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
            <Text preset="h2">Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate(Screen.LOGIN)}>
              <Text preset="h3" color={color.primaryColor}>Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </BaseLayout>
  );
};
export default MainScreen;