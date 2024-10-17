import { BaseLayout } from '@src/components';
import Header from '@src/components/Header/Header';
import mainStyle from '@src/constants/MainStyles';
import { useAppContext, useColor } from '@src/context';
import React from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { Text } from '@app/blueprints';
import { scaledSize } from '@src/utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
interface Transaction {
  id: string;
  name: string;
  date: string;
  type: string;
  amount: number;
}

const transactions: Transaction[] = [
  { id: '1', name: 'James Bennett', date: '09 Sep 2024', type: 'Credit', amount: 230 },
  { id: '2', name: 'James Bennett', date: '09 Sep 2024', type: 'Credit', amount: 230 },
  { id: '3', name: 'James Bennett', date: '09 Sep 2024', type: 'Credit', amount: 230 },
  { id: '4', name: 'James Bennett', date: '09 Sep 2024', type: 'Credit', amount: 230 },
  { id: '5', name: 'James Bennett', date: '09 Sep 2024', type: 'Credit', amount: 230 },
];

const Wallet = () => {
  const { color } = useColor();
  const design = mainStyle(color);
  const { navigation } = useAppContext();

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <View style={design.listView}>
      <View>
        <Text preset='h2'>{item.name}</Text>
        <Text preset='h4'>{item.date}</Text>
      </View>
      <Text preset='h4'>{item.type}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text preset='h2' style={{ marginRight: scaledSize(10) }} >${item.amount}</Text>
        <AntDesign size={18} name={"right"} color={color.textColor} />
      </View>
    </View>
  );

  return (
    <BaseLayout>
      <View style={design.mainView}>
        <Header onPress={() => navigation.goBack()} title="Wallet" />
        <View style={design.subView}>
          <View style={{ alignItems: 'center' }} >
            <Text preset='h2'>Total earned</Text>
            <Text preset='h1'>$ 3245</Text>
          </View>
          <View style={design.listView}>
            <Text preset='h2'>Transaction</Text>
            <TouchableOpacity>
              <Text preset='h4'>View all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={transactions}
            renderItem={renderTransaction}
            keyExtractor={item => item.id}
          />
          <TouchableOpacity style={design.footerBtn}>
            <Text style={design.footerBtnTxt}>Transfer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BaseLayout>
  );
}
export default Wallet