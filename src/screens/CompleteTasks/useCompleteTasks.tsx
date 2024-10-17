import { useAppContext } from '@src/context';

const useCompleteTask = () => {
 const { color, navigation } = useAppContext();


 return {
  color,
  navigation,
 };
};
export default useCompleteTask;