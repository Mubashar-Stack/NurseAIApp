import { useAppContext } from '@src/context';
import { Screen } from '../../navigation/appNavigation.type';
import { useState, useEffect, useCallback } from 'react';
import { fetchTodaysTasks, Task } from '../../api/tasks';
import { showErrorToast } from '@src/utils';
import { useSelector } from 'react-redux';

const useTaskList = () => {
  const { color, navigation } = useAppContext();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = useSelector((state: any) => {
    console.log("🚀 ~ useMedicalHistory ~ state:", state.auth)
    return state.auth.isToken
  })

  const loadTasks = useCallback(async () => {
    try {
      const response: any = await fetchTodaysTasks(token);
      console.log("🚀 ~ loadTasks ~ response:", response)
      if (response?.count) {
        setTasks(response?.results);
      }
    } catch (error: any) {
      console.error('Error loading tasks:', error);
      showErrorToast(error?.message || 'Failed to load tasks', 2000);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const addTask = () => {
    navigation.navigate(Screen.ADD_TASK_LIST);
  };

  const completeTask = () => {
    navigation.navigate(Screen.COMPLETE_TASKS);
  };

  return {
    color,
    navigation,
    addTask,
    completeTask,
    tasks,
    isLoading,
    loadTasks,
  };
};

export default useTaskList;

