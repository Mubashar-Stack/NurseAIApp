import { useCallback, useState } from 'react';
import * as yup from 'yup';
import { useAppContext } from '@src/context';
import { PatientLocationSetupStyles } from './PatientLocationSetup.style';
import { Screen } from '../../navigation/appNavigation.type';

const usePatientLocationSetup = () => {
  const { color, navigation } = useAppContext();
  const [disabled, setDisabled] = useState(false);

  const fieldValidation = yup.object().shape({
    buildingNumber: yup.string().trim()
      .required('Please enter building number'),
    apartmentNumber: yup.string().trim()
      .required('Please enter apartment number'),
    floorNumber: yup.string().trim()
      .required('Please enter floor number'),
  });

  const initialValues = {
    buildingNumber: '',
    apartmentNumber: '',
    floorNumber: '',
  };

  const handleSubmit = useCallback(
    async (values: typeof initialValues) => {
      setDisabled(true);
      try {
        console.log("Submitting location data:", values);
        // Add your API call here
        // Example: await savePatientLocation(values);
        navigation.navigate(Screen.HOME);
      } catch (error) {
        console.error("Error saving location:", error);
      } finally {
        setDisabled(false);
      }
    },
    [navigation]
  );

  return {
    color,
    disabled,
    fieldValidation,
    handleSubmit,
    initialValues,
    navigation,
    styles: PatientLocationSetupStyles(color),
  };
};

export default usePatientLocationSetup;
