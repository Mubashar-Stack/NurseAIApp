import { useAppContext } from '@src/context';
import { Screen } from '../../navigation/appNavigation.type';
import { useState, useCallback } from 'react';
import * as yup from 'yup';
import { createTask } from '../../api/tasks';
import { showErrorToast, showSuccessToast } from '@src/utils';
import { useSelector } from 'react-redux';

const useAddTask = () => {
  const { color, navigation } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const nurseId = useSelector((state: any) => state.auth.userInfo?.userId);
  const token = useSelector((state: any) => state.auth?.isToken);


  const fieldValidation = yup.object().shape({
    patientName: yup.string().required('Patient name is required'),
    issue: yup.string().required('Issue is required'),
    medication: yup.string().required('Medication is required'),
    age: yup.string().required('Age is required'),
    sex: yup.string().required('Gender is required'),
    describe: yup.string().required('Task details are required'),
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
      try {
        setIsLoading(true);
        const response = await createTask(token, {
          patient: 1, // You might want to get this from somewhere
          patient_name: values.patientName,
          gender: values.sex,
          issue: values.issue,
          age: parseInt(values.age.split('-')[0] || '18'), // Taking the lower bound of the age range
          medication: values.medication,
          task_details: values.describe,
          nurse: nurseId,
        });

        if (response.status) {
          showSuccessToast('Task created successfully', 2000);
          navigation.navigate(Screen.TASK_LIST);
        } else {
          showErrorToast(response.message || 'Failed to create task', 2000);
        }
      } catch (error: any) {
        console.error('Error creating task:', error);
        showErrorToast(error?.message || 'Failed to create task', 2000);
      } finally {
        setIsLoading(false);
      }
    },
    [navigation, nurseId]
  );

  const completeTask = () => {
    navigation.navigate(Screen.COMPLETE_TASKS);
  };

  return {
    color,
    navigation,
    initialValues,
    fieldValidation,
    handleSubmit,
    completeTask,
    isLoading,
  };
};

export default useAddTask;

