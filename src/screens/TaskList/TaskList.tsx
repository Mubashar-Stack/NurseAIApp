import { BaseLayout } from '@src/components';
import mainStyle from '@src/constants/MainStyles';
import React from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Text } from '@app/blueprints';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { scaleHeight, scaleWidth } from '@src/utils';
import Feather from 'react-native-vector-icons/Feather';
import useTaskList from './useTaskList';

interface Task {
  id: string;
  patientName: string;
  medication: string;
}

const tasks: Task[] = [
  { id: '1', patientName: 'Patient 1', medication: 'Administer prescribed pain medication (e.g., ibuprofen 400 mg) every 6 hours as needed.' },
  { id: '2', patientName: 'Patient 2', medication: 'Administer prescribed pain medication (e.g., ibuprofen 400 mg) every 6 hours as needed.' },
  { id: '3', patientName: 'Patient 3', medication: 'Administer prescribed pain medication (e.g., ibuprofen 400 mg) every 6 hours as needed.' },
];

const TaskList = () => {
  const { navigation, color, addTask, completeTask } = useTaskList();
  const design = mainStyle(color);

  return (
    <BaseLayout>
      <View style={design.mainView} >
        <View style={{ ...design.listView, width: '90%', alignSelf: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ justifyContent: 'center', alignItems: 'center' }}  >
              <AntDesign size={18} name={"left"} color={color?.textColor} />
            </TouchableOpacity>
            <View style={{ marginLeft: scaleWidth(10), flexDirection: 'row', alignItems: 'center' }}>
              <Feather name="clock" color={color.textColor} size={24} />
              <View style={{ marginLeft: scaleWidth(10), }}>
                <Text preset='h5'>Shift timing</Text>
                <Text preset='h4'>09:00 AM - 05:00 PM</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={() => completeTask()} style={{ ...design.footerBtn, marginBottom: 0, marginVertical: 0, height: 30, width: '30%' }}>
            <Text preset='h5' style={styles.completeTaskButtonText}>Complete Task</Text>
          </TouchableOpacity>
        </View>
        <View style={design.subView}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text preset='h1'>Today's Task</Text>
            <TouchableOpacity onPress={() => addTask()}>
              <AntDesign name="pluscircleo" color={color?.textColor} size={24} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, marginBottom: scaleHeight(40) }}>
            {tasks.map((task) => (
              <TouchableOpacity
                key={task.id}
                style={styles.taskItem}
              >
                <View style={styles.avatar} />
                <View style={styles.taskDetails}>
                  <Text preset='h4'>{task.patientName}</Text>
                  <Text preset='h5'>{task.medication}</Text>
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
  completeTaskButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  taskItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e0e0e0',
    marginRight: 16,
  },
  taskDetails: {
    flex: 1,
  },
});
export default TaskList