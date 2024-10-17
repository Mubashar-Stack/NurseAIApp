import { BaseLayout } from '@src/components';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import mainStyle from '@src/constants/MainStyles';
import useCompleteTask from './useCompleteTasks';
import Header from '@src/components/Header/Header';
import { Text } from '@app/blueprints';
import { scaleHeight } from '@src/utils';
interface Task {
  id: string;
  patientName: string;
  medication: string;
  date: string;
}

const tasks: Task[] = [
  { id: '1', patientName: 'Patient 1', medication: 'Administer prescribed pain medication (e.g., ibuprofen 400 mg) every 6 hours as needed.', date: '09 Sep 2024' },
  { id: '2', patientName: 'Patient 2', medication: 'Administer prescribed pain medication (e.g., ibuprofen 400 mg) every 6 hours as needed.', date: '09 Sep 2024' },
  { id: '3', patientName: 'Patient 3', medication: 'Administer prescribed pain medication (e.g., ibuprofen 400 mg) every 6 hours as needed.', date: '09 Sep 2024' },
  { id: '4', patientName: 'Patient 4', medication: 'Administer prescribed pain medication (e.g., ibuprofen 400 mg) every 6 hours as needed.', date: '09 Sep 2024' },
  { id: '5', patientName: 'Patient 5', medication: 'Administer prescribed pain medication (e.g., ibuprofen 400 mg) every 6 hours as needed.', date: '09 Sep 2024' },
];
const CompleteTasks = () => {
  const { navigation, color } = useCompleteTask();
  const design = mainStyle(color);

  return (
    <BaseLayout>
      <View style={design.mainView} >
        <Header onPress={() => navigation.goBack()} title="Complete tasks" />
        <View style={design.subView}>
          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, marginBottom: scaleHeight(40) }}>
            {tasks.map((task) => (
              <TouchableOpacity
                key={task.id}
                style={styles.taskItem}
              >
                <View style={styles.avatar} />
                <View style={{ flex: 1, }}>
                  <Text preset='h4'>{task.patientName}</Text>
                  <Text preset='h5'>{task.medication}</Text>
                  <Text preset='h5'>{task.date}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </BaseLayout>
  );
}
const styles = StyleSheet.create({
  taskItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    alignItems: 'center'
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e0e0e0',
    marginRight: 16,
  },
});
export default CompleteTasks