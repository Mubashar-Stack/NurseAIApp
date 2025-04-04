import React from 'react';
import { View, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl, Image } from 'react-native';
import { Text } from '@app/blueprints';
import { BaseLayout } from '@src/components';
import useTaskList from './useTaskList';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { TaskListStyles } from './TaskList.style';
import { Screen } from '../../navigation/appNavigation.type';
import Clipboard from '@react-native-clipboard/clipboard';
import { showErrorToast, showSuccessToast } from '@src/utils';
const TaskListScreen = () => {
  const {
    color,
    navigation,
    addTask,
    completeTask,
    tasks,
    isLoading,
    loadTasks,
  } = useTaskList();
  console.log("🚀 ~ TaskListScreen ~ tasks:", tasks)

  const styles = TaskListStyles(color);

  const copyToClipboard = (task: any) => {
    console.log("🚀 ~ copyToClipboard ~ task:", task)
    try {
      const taskDetails = `Patient: ${task.patient_name}\nIssue: ${task.issue}\nMedication: ${task.medication}\nTask Details: ${task?.task_details}`;
      console.log("🚀 ~ copyToClipboard ~ taskDetails:", taskDetails)
      Clipboard.setString(taskDetails);
      showSuccessToast('Task details copied to clipboard', 2000);
    } catch (error) {
      showErrorToast('Failed to copy task details', 2000);
    }
  };


  return (
    <BaseLayout>
      <View style={styles.mainView}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <AntDesign name="left" size={24} color={color.textColor} />
            </TouchableOpacity>

            <View style={styles.shiftInfo}>
              <Feather name="clock" color={color.textColor} size={24} />
              <View style={styles.shiftDetails}>
                <Text style={{ color: color.textColor, fontSize: 12 }}>Shift timing</Text>
                <Text style={{ color: color.textColor, fontSize: 12, fontWeight: '500' }}>
                  09:00 AM - 05:00 PM
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.completeTaskButton}
            onPress={completeTask}
          >
            <Text style={styles.completeTaskButtonText}>Complete Task</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Today's Task</Text>
            <TouchableOpacity onPress={addTask}>
              <AntDesign name="pluscircleo" color={color.textColor} size={24} />
            </TouchableOpacity>
          </View>

          {isLoading ? (
            <BaseLayout>
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#002A65" />
              </View>
            </BaseLayout>
          )
            : <ScrollView
              style={styles.taskList}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={isLoading} onRefresh={loadTasks} />
              }
            >
              {tasks.length === 0 ? (
                <View style={styles.noTasksContainer}>
                  <Feather name="clipboard" size={48} color={'#666666'} />
                  <Text style={styles.noTasksText}>No tasks found</Text>
                </View>
              ) : (
                tasks.map((task: any) => (
                  <TouchableOpacity
                    key={task.id}
                    style={styles.taskItem}
                    //@ts-ignore
                    onPress={() => navigation.navigate(Screen.PATIENT_DETAIL, { taskId: task?.id })}
                  >
                    <Image
                      source={{ uri: task?.patient_photo }}
                      style={styles.avatar}
                    />
                    <View style={styles.taskDetails}>
                      <Text style={styles.patientName}>{task.patient_name}</Text>
                      <Text style={styles.medication}>{task.medication}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.copyButton}
                      onPress={() => copyToClipboard(task)}
                    >
                      <Feather name="copy" size={20} color={color.textColor} />
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>}
        </View>

      </View>
    </BaseLayout>
  );
};

export default React.memo(TaskListScreen);

