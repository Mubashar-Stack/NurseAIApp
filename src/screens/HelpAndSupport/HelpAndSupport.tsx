import { BaseLayout } from '@src/components';
import Header from '@src/components/Header/Header';
import mainStyle from '@src/constants/MainStyles';
import { useAppContext, useColor } from '@src/context';
import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView, TextInput, StyleSheet } from 'react-native';
import { Text } from '@app/blueprints';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { scaleHeight } from '@src/utils';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: '1',
    question: 'What is Nurse Pro Ai?',
    answer: 'Nurse Pro Ai is an advanced artificial intelligence platform designed to assist nursing professionals in their daily tasks and decision-making processes.',
  },
  {
    id: '2',
    question: 'Why choose Nurse Pro Ai?',
    answer: 'Nurse Pro Ai offers cutting-edge technology, personalized assistance, and continuous learning capabilities to enhance the efficiency and accuracy of nursing care.',
  },
  {
    id: '3',
    question: 'What are the payment methods?',
    answer: 'We accept various payment methods including credit cards, debit cards, and digital wallets. Please check our payment page for a full list of accepted methods.',
  },
];

const HelpAndSupport = () => {
  const { color } = useColor();
  const design = mainStyle(color);
  const { navigation } = useAppContext();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleSend = () => {
    console.log('Sending query:', query);
    setQuery('');
  };

  return (
    <BaseLayout>
      <View style={design.mainView}>
        <Header onPress={() => navigation.goBack()} title="Help & Support" />
        <View style={design.subView}>
          <ScrollView style={{ flex: 1 }}>
            <Text preset='h2' style={{ marginBottom: scaleHeight(10) }}>FAQs</Text>
            {faqData.map((item) => (
              <View key={item.id} style={styles.faqItem} >
                <TouchableOpacity
                  style={{ ...design.listView, padding: scaleHeight(16), borderBottomWidth: 0 }}
                  onPress={() => toggleExpand(item.id)}
                >
                  <Text preset='h2'>{item.question}</Text>
                  {expandedId === item.id ? (
                    <AntDesign size={18} name={"up"} color={color.textColor} />
                  ) : (
                    <AntDesign size={18} name={"down"} color={color.textColor} />
                  )}
                </TouchableOpacity>
                {expandedId === item.id && (
                  <Text preset='h4' style={{ padding: scaleHeight(16) }}>{item.answer}</Text>
                )}
              </View>
            ))}
            <View >
              <Text preset='h2' style={{ marginBottom: scaleHeight(10) }}>Still need help?</Text>
              <View style={{ ...design.textView, alignItems: 'stretch', padding: scaleHeight(10), height: 100, }}>
                <TextInput
                  style={{ ...design.inputText, textAlignVertical: 'top', }}
                  placeholder="Type your query..."
                  value={query}
                  onChangeText={setQuery}
                  multiline
                />
              </View>
              <TouchableOpacity style={design.footerBtn} onPress={handleSend}>
                <Text style={design.footerBtnTxt}>Send</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </BaseLayout>
  );
}

const styles = StyleSheet.create({
  faqItem: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
  },
});
export default HelpAndSupport