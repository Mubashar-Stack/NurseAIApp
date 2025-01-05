import { BaseLayout } from '@src/components';
import Header from '@src/components/Header/Header';
import mainStyle from '@src/constants/MainStyles';
import { useAppContext, useColor } from '@src/context';
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { Text } from '@app/blueprints';
import { scaledSize } from '@src/utils';
import { ChevronRight } from 'lucide-react-native';
import { walletService } from '../../api/wallet';
import { TransactionData, WalletData } from '../../types/wallet';
import EmptyTransactions from './empty-transactions';
import { useSelector } from 'react-redux';

const Wallet = () => {
  const { color } = useColor();
  const design = mainStyle(color);
  const { navigation } = useAppContext();
  const token = useSelector((state: any) => state.auth?.isToken);

  const [loading, setLoading] = useState(true);
  const [walletData, setWalletData] = useState<WalletData[]>([]);
  const [transactions, setTransactions] = useState<TransactionData[]>([]);

  useEffect(() => {
    fetchWalletData();
  }, []);

  const fetchWalletData = async () => {
    try {
      setLoading(true);
      const [walletResponse, transactionsResponse] = await Promise.all([
        walletService.getWalletBalance(token),
        walletService.getTransactions(token)
      ]);

      setWalletData(walletResponse.data);
      setTransactions(transactionsResponse.data);
    } catch (error) {
      console.error('Error fetching wallet data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTotalBalance = () => {
    if (walletData?.length === 0) return '0';
    //@ts-ignore
    return walletData[walletData?.length - 1].balance_after_transaction;
  };

  const renderTransaction = ({ item }: { item: TransactionData }) => (
    <View style={[design.listView, styles.transactionItem]}>
      <View>
        <Text preset='h2'>{item.payment_id}</Text>
        <Text preset='h6'>Date:{new Date(item.transaction_date).toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        })}</Text>
      </View>
      <Text preset='h4' style={styles.transactionType}>
        {item.payment_type.charAt(0).toUpperCase() + item.payment_type.slice(1)}
      </Text>
      <View style={styles.amountContainer}>
        <Text preset='h2' style={styles.amount}>${parseFloat(item.amount).toFixed(2)}</Text>
        <ChevronRight size={18} color={color.textColor} />
      </View>
    </View>
  );

  return (
    <BaseLayout>
      <View style={design.mainView}>
        <Header onPress={() => navigation.goBack()} title="Wallet" />
        {loading ? <BaseLayout>
          <View style={[design.mainView, styles.centerContent]}>
            <ActivityIndicator size="large" color={'#002B49'} />
          </View>
        </BaseLayout> : <View style={design.subView}>
          <View style={styles.balanceContainer}>
            <Text preset='h2'>Total earned</Text>
            <Text preset='h1' style={styles.balanceAmount}>$ {getTotalBalance()}</Text>
          </View>

          <View style={[styles.transactionHeader]}>
            <Text preset='h2'>Transaction</Text>
            <TouchableOpacity>
              <Text preset='h4'>View all</Text>
            </TouchableOpacity>
          </View>

          {transactions.length === 0 ? (
            <EmptyTransactions textColor={color.textColor} />
          ) : (
            <FlatList
              data={transactions}
              renderItem={renderTransaction}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={styles.transactionList}
              showsVerticalScrollIndicator={false}
            />
          )}

          <TouchableOpacity
            style={[design.footerBtn, styles.transferButton]}
            onPress={() => {/* Handle transfer */ }}
          >
            <Text style={design.footerBtnTxt}>Transfer</Text>
          </TouchableOpacity>
        </View>}
      </View>
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceContainer: {
    alignItems: 'center',
    marginBottom: scaledSize(24),
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: '600',
    color: '#002B49',
    marginTop: scaledSize(8),
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: scaledSize(16),
  },
  transactionList: {
    flexGrow: 1,
  },
  transactionItem: {
    marginBottom: scaledSize(5),
  },
  transactionType: {
    textTransform: 'capitalize',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amount: {
    marginRight: scaledSize(10),
    color: '#002B49'
  },
  transferButton: {
    marginTop: 'auto',
    marginBottom: scaledSize(16),
  },
});

export default Wallet;

