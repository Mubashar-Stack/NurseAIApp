import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Text } from '@app/blueprints';
import { useColor } from '@src/context';

type HeaderBackButtonProps = {
  onPress: () => void;
  headerlogo?: boolean;
  title?: string;
};

const Header: React.FC<HeaderBackButtonProps> = ({ onPress, title }) => {
  const { color } = useColor();
  //@ts-ignore
  const isAuthScreen = ['Sign Up', 'Log In', 'Home', 'My profile'].includes(title);
  return (
    <View style={{ flexDirection: 'row', alignSelf: 'center', marginVertical: 14, alignItems: 'center', width: '90%' }}>
      {isAuthScreen ? (
        <Text preset="h1">{title}</Text>
      ) : (
        <>
          <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={onPress} >
            <AntDesign size={18} name={"left"} color={color?.textColor} />
          </TouchableOpacity>
          <Text preset="h1" style={{ marginLeft: 10 }}>{title}</Text>
        </>
      )}
    </View>
  );
};
export default Header;