import { BaseLayout } from '@src/components';
import Header from '@src/components/Header/Header';
import mainStyle from '@src/constants/MainStyles';
import { useAppContext, useColor } from '@src/context';
import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from '@app/blueprints';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { scaleHeight } from '@src/utils';

interface Option {
  id: string;
  label: string;
  selected: boolean;
};

interface Question {
  id: string;
  text: string;
  options: Option[];
  multiSelect: boolean;
};

const Notification = () => {
  const { color } = useColor();
  const design = mainStyle(color);
  const { navigation } = useAppContext();
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      text: 'What you receive?',
      options: [
        { id: '1', label: 'App updates', selected: false },
        { id: '2', label: 'Booking updates', selected: true },
        { id: '3', label: 'Patient health', selected: true },
        { id: '4', label: 'Received reviews', selected: false },
        { id: '5', label: 'Messages', selected: true },
      ],
      multiSelect: true,
    },
    {
      id: '2',
      text: 'Where you receive notifications?',
      options: [
        { id: '1', label: 'SMS', selected: false },
        { id: '2', label: 'In App', selected: true },
        { id: '3', label: 'Email', selected: false },
      ],
      multiSelect: false,
    },
  ]);

  const toggleOption = (questionId: string, optionId: string) => {
    setQuestions((prevQuestions: any) =>
      prevQuestions.map((question: any) => {
        if (question.id === questionId) {
          const updatedOptions = question.options.map((option: any) => {
            if (option.id === optionId) {
              return { ...option, selected: !option.selected };
            }
            if (!question.multiSelect) {
              return { ...option, selected: option.id === optionId };
            }
            return option;
          });
          return { ...question, options: updatedOptions };
        }
        return question;
      })
    );
  };

  const saveChanges = () => {
    navigation.goBack()
    console.log('Saving changes:', questions);
  };

  return (
    <BaseLayout>
      <View style={design.mainView}>
        <Header onPress={() => navigation.goBack()} title="Notification" />
        <View style={design.subView}>
          <ScrollView style={{ flex: 1 }}>
            {questions.map((question: any) => (
              <View key={question.id} style={{ marginBottom: scaleHeight(20) }}>
                <Text preset='h2'>{question.text}</Text>
                {question.options.map((option: any) => (
                  <TouchableOpacity
                    key={option.id}
                    style={{ ...design.listView, justifyContent: 'flex-start' }}
                    onPress={() => toggleOption(question.id, option.id)}
                  >
                    {option.selected ? (
                      <MaterialCommunityIcons size={24} name="checkbox-marked" color={color.textColor} />
                    ) : (
                      <MaterialCommunityIcons size={24} name="checkbox-blank-outline" color={color?.textColor} />
                    )}
                    <Text preset='h4'>{option.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </ScrollView>

          <TouchableOpacity style={design.footerBtn} onPress={saveChanges}>
            <Text style={design.footerBtnTxt}>Save changes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BaseLayout>
  );
}
export default Notification