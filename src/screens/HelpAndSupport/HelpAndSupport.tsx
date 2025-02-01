import { BaseLayout } from '@src/components';
import Header from '@src/components/Header/Header';
import React from 'react';
import { View, TouchableOpacity, ScrollView, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import { Text } from '@app/blueprints';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { scaleHeight } from '@src/utils';
import useHelpAndSupport, { faqData } from './useHelpAndSupport';

const HelpAndSupport = () => {
  const {
    design,
    color,
    navigation,
    expandedId,
    query,
    subject,
    isLoading,
    setQuery,
    setSubject,
    toggleExpand,
    handleSend,
  } = useHelpAndSupport();

  return (
    <BaseLayout>
      <View style={design.mainView}>
        <Header onPress={() => navigation.goBack()} title="Help & Support" />
        <View style={design.subView}>
          <ScrollView style={{ flex: 1 }}>
            <Text preset='h2' style={{ marginBottom: scaleHeight(10) }}>FAQs</Text>
            {faqData.map((item) => (
              <View key={item.id} style={styles.faqItem}>
                <TouchableOpacity
                  style={{ ...design.listView, padding: scaleHeight(16), borderBottomWidth: 0 }}
                  onPress={() => toggleExpand(item.id)}
                >
                  <Text preset='h2'>{item.question}</Text>
                  <AntDesign
                    size={18}
                    name={expandedId === item.id ? "up" : "down"}
                    color={color.textColor}
                  />
                </TouchableOpacity>
                {expandedId === item.id && (
                  <Text preset='h4' style={{ padding: scaleHeight(16) }}>{item.answer}</Text>
                )}
              </View>
            ))}
            <View>
              <Text preset='h2' style={{ marginBottom: scaleHeight(10) }}>Still need help?</Text>
              <View style={styles.queryContainer}>
                <TextInput
                  style={[design.inputText, styles.subjectInput]}
                  placeholder="Subject (optional)"
                  value={subject}
                  onChangeText={setSubject}
                />
                <View style={{ ...design.textView, alignItems: 'stretch', padding: scaleHeight(10), height: 100 }}>
                  <TextInput
                    style={{ ...design.inputText, textAlignVertical: 'top' }}
                    placeholder="Type your query..."
                    value={query}
                    onChangeText={setQuery}
                    multiline
                  />
                </View>
              </View>
              <TouchableOpacity
                style={[design.footerBtn, isLoading && styles.disabledButton]}
                onPress={handleSend}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={design.footerBtnTxt}>Send</Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  faqItem: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
  },
  queryContainer: {
    marginBottom: 16,
  },
  subjectInput: {
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    margin: 5,
    backgroundColor: '#E2E2E2',
    height: 40,
    width: 'auto'
  },
  disabledButton: {
    opacity: 0.7,
  },
});

export default HelpAndSupport;

