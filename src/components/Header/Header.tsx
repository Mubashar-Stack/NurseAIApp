import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
//@ts-ignore
import AntDesign from 'react-native-vector-icons/AntDesign';
import mainStyle from '@src/constants/MainStyles';

type HeaderBackButtonProps = {
 onPress: () => void;
 headerlogo?: boolean;
 title?: string;
};

const Header: React.FC<HeaderBackButtonProps> = ({ onPress, title }) => {
 return (

  <View style={{ flexDirection: 'row', marginVertical: 20, alignItems: 'center', width: '100%' }}>

   <TouchableOpacity style={{ width: '16%', justifyContent: 'center', alignItems: 'center' }} onPress={onPress} >
    <AntDesign size={18} name={"left"} color={'#000000'} />
   </TouchableOpacity>
   <Text style={{ ...mainStyle.headerText, color: '#000000', }}>{title}</Text>
  </View>

 );
};

export default Header;