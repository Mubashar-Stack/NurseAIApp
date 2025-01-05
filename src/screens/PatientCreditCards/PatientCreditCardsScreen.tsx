import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import { Text } from '@app/blueprints';
import { BaseLayout } from '@src/components';
import Header from '@src/components/Header/Header';
import { useAppContext, useColor } from '@src/context';
import mainStyle from '@src/constants/MainStyles';
import { CreditCard } from '../../types/credit-card';
import { creditCardService } from '../../api/creditCard';
import CreditCardModal from './components/credit-card-modal';
import { useSelector } from 'react-redux';
import { CreditCard as CreditCardIcon, Trash2 } from 'lucide-react-native';

export default function CreditCardsScreen() {
  const { color } = useColor();
  const design = mainStyle(color);
  const { navigation } = useAppContext();
  const [cards, setCards] = useState<CreditCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CreditCard | null>(null);
  const token = useSelector((state: any) => state.auth?.isToken);

  const fetchCards = async () => {
    try {
      setLoading(true);
      const data = await creditCardService.getCreditCards(token);
      console.log("🚀 ~ fetchCards ~ data:", data)
      setCards(data?.data);
    } catch (error) {
      console.error('Error fetching cards:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleAddCard = async (data: CreditCard) => {
    try {
      console.log("🚀 ~ handleAddCard ~ token, data:", token, data)
      await creditCardService.addCreditCard(token, data);
      fetchCards();
      setModalVisible(false);
      setSelectedCard(null);
    } catch (error: any) {
      console.error('Error adding card:', error?.response?.data);
      Alert.alert(
        "Error",
        JSON.stringify(error?.response?.data),
        [
          {
            text: "ok",
            style: "cancel"
          }
        ]
      );
    }
  };

  const handleUpdateCard = async (data: CreditCard) => {
    if (!selectedCard?.id) return;
    try {
      await creditCardService.updateCreditCard(token, selectedCard.id, data);
      fetchCards();
      setModalVisible(false);
      setSelectedCard(null);
    } catch (error) {
      console.error('Error updating card:', error);
    }
  };

  const confirmDelete = (id: number) => {
    Alert.alert(
      "Delete Card",
      "Are you sure you want to delete this card?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => handleDeleteCard(id)
        }
      ]
    );
  };

  const handleDeleteCard = async (id: number) => {
    try {
      await creditCardService.deleteCreditCard(token, id);
      fetchCards();
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  const openModal = (card?: CreditCard) => {
    setSelectedCard(card || null);
    setModalVisible(true);
  };

  const handleModalSubmit = (data: CreditCard) => {
    if (selectedCard) {
      handleUpdateCard(data);
    } else {
      handleAddCard(data);
    }
    setModalVisible(false);
  };

  const EmptyCardView = () => (
    <View style={styles.emptyContainer}>
      <CreditCardIcon size={48} color={'#002A65'} style={styles.emptyIcon} />
      <Text preset="h2" style={styles.emptyText}>No cards added yet</Text>
      <Text preset="h4" style={styles.emptySubText}>Add your first card by clicking the button below</Text>
    </View>
  );

  const renderCardItem = ({ item }: { item: CreditCard }) => {
    const maskedNumber = `•••• •••• •••• ${item.card_number.slice(-4)}`;

    return (
      <View style={styles.cardItem}>
        <TouchableOpacity
          style={styles.cardInfo}
          onPress={() => openModal(item)}
        >
          <CreditCardIcon size={32} color={'#002A65'} />
          <View style={styles.cardDetails}>
            <View style={styles.cardHeader}>
              <Text preset="h2" style={{ fontSize: 18 }}>{item?.cardholder_name}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={(e) => {
                  e.stopPropagation();
                  confirmDelete(item.id!);
                }}
              >
                <Trash2 size={20} color="#FF4444" />
              </TouchableOpacity>
              {/* {item.is_default && (
                <View style={{
                  backgroundColor: '#E8F5E9',
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 4,
                  alignSelf: 'flex-start',
                  marginTop: 8,
                }}>
                  <Text style={{ color: '#2E7D32', fontSize: 12 }}>Default</Text>
                </View>
              )} */}
            </View>
            <Text preset="h2" style={styles.cardNumber}>{maskedNumber}</Text>
            <Text preset="h4">{`Expires ${item?.expiration_month}/${item?.expiration_year}`}</Text>
            <Text style={styles.cardType}>{item?.card_type}</Text>

          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <BaseLayout>
      <View style={design.mainView}>
        <Header onPress={() => navigation.goBack()} title="Cards" />
        <View style={design.subView}>
          <View style={{ flex: 1 }}>
            {loading ? (
              <View style={[design.mainView, styles.centerContent]}>
                <ActivityIndicator size="large" color={'#002A65'} />
              </View>
            ) : cards.length === 0 ? (
              <EmptyCardView />
            ) : (
              <FlatList
                data={cards}
                renderItem={renderCardItem}
                keyExtractor={item => item.id?.toString() || ''}
                contentContainerStyle={styles.cardList}
              />
            )}
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => openModal()}
            >
              <Text preset="h2" color='#002A65'>+ Add New Card</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <CreditCardModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setSelectedCard(null);
        }}
        //@ts-ignore
        onSubmit={handleModalSubmit}
        initialData={selectedCard || undefined}
        color={color}
      />
    </BaseLayout>
  );
}

const styles = StyleSheet.create({
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardList: {
    padding: 5,
  },
  cardItem: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardDetails: {
    marginLeft: 16,
    width: 260
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardNumber: {
    fontSize: 16,
    letterSpacing: 2,
    marginTop: 8,
  },
  cardType: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  deleteButton: {
    padding: 8,
    borderRadius: 8,
  },
  addButton: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyText: {
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubText: {
    textAlign: 'center',
    opacity: 0.7,
  },
});