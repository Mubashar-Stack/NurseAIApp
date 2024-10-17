import { useAppContext } from '@src/context';
import { Screen } from '../../navigation/appNavigation.type';
import { useCallback, useState } from 'react';
import * as yup from 'yup';
import { logger } from '@src/utils';

const useAddTasks = () => {
  const { color, navigation } = useAppContext();
  const [disabled, setDisabled] = useState(false);

  const fieldValidation = yup.object().shape({
    patientName: yup.string().required('Patient name is required'),
    issue: yup.string().required('Issue is required'),
    medication: yup.string().required('Enter your medication'),
    age: yup.string().required('Age is required'),
    sex: yup.string().required('Select your gender'),
    describe: yup.string().required('Describe your issue'),
  });

  const initialValues = {
    patientName: '',
    issue: '',
    medication: '',
    age: '',
    sex: '',
    describe: '',
  };

  const handleSubmit = useCallback(
    async (values: typeof initialValues) => {
      console.log("🚀 ~ values:", values)
      navigation.navigate(Screen.TASK_LIST);
      logger('values: ', values);
      setDisabled(true);
      await new Promise(res => setTimeout(res, 3000));
      setDisabled(false);
    },
    [navigation]
  );
  const completeTask = () => {
    navigation.navigate(Screen.COMPLETE_TASKS)
  }

  return {
    color,
    disabled,
    navigation,
    initialValues,
    fieldValidation,
    handleSubmit,
    completeTask
  };
};
export default useAddTasks;