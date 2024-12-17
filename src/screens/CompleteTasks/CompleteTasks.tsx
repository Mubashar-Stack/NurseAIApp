import React from 'react';
import { View, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { Text } from '@app/blueprints';
import { BaseLayout } from '@src/components';
import useCompleteTask from './useCompleteTasks';
import { CompleteTaskStyles } from './CompleteTask.style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { format } from 'date-fns';

const CompleteTasks = () => {
  const {
    color,
    navigation,
    tasks,
    isLoading,
    isRefreshing,
    handleRefresh,
    clearAll,
  } = useCompleteTask();

  const styles = CompleteTaskStyles(color);

  if (isLoading) {
    return (
      <BaseLayout>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <View style={styles.mainView}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="left" size={24} color={color.textColor} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Complete tasks</Text>
          </View>
          {/* <TouchableOpacity style={styles.clearButton} onPress={clearAll}>
            <Text style={styles.clearButtonText}>Clear all</Text>
          </TouchableOpacity> */}
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
          }
        >
          {tasks.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Feather
                name="clipboard"
                size={48}
                color="#666666"
                style={styles.emptyIcon}
              />
              <Text style={styles.emptyText}>No completed tasks found</Text>
            </View>
          ) : (
            tasks.map((task) => (
              <TouchableOpacity key={task.id} style={styles.taskItem}>
                <View style={styles.avatar} />
                <View style={styles.taskDetails}>
                  <Text style={styles.patientName}>{task.patient_name}</Text>
                  <Text style={styles.medication}>{task.medication}</Text>
                  <Text style={styles.date}>
                    Date: {format(new Date(task.created_at), 'dd MMM yyyy')}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>

      </View>
    </BaseLayout>
  );
};

export default React.memo(CompleteTasks);

