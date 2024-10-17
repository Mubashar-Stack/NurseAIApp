import { useAppContext } from '@src/context';
import { Screen } from '../../navigation/appNavigation.type';

const useTaskList = () => {
  const { color, navigation } = useAppContext();
  const addTask = () => {
    navigation.navigate(Screen.ADD_TASK_LIST)
  }
  const completeTask = () => {
    navigation.navigate(Screen.COMPLETE_TASKS)
  }
  return {
    color,
    navigation,
    addTask,
    completeTask
  };
};
export default useTaskList;