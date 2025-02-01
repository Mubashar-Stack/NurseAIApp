import { useCallback, useState, useEffect } from 'react';
import * as yup from 'yup';
import { useAppContext } from '@src/context';
import { PatientLocationSetupStyles } from './PatientLocationSetup.style';
import { Screen } from '../../navigation/appNavigation.type';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useVoiceInput } from '@src/context/VoiceInputContext';

const usePatientLocationSetup = (locationId: number) => {
  console.log("🚀 ~ usePatientLocationSetup ~ locationId:", locationId)
  const { color, navigation } = useAppContext();
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state: any) => state.auth?.isToken);
  const { voiceInputText, isListening, startVoiceInput, stopVoiceInput } = useVoiceInput();
  const [activeField, setActiveField] = useState<string | null>(null);

  const fieldValidation = yup.object().shape({
    city: yup.string().trim().required('Please enter city'),
    state: yup.string().trim().required('Please enter state'),
    postalCode: yup.string().trim().required('Please enter postal code'),
    country: yup.string().trim().required('Please enter country'),
  });

  const [initialValues, setInitialValues] = useState({
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });

  const handleSubmit = useCallback(
    async (values: typeof initialValues) => {
      console.log("🚀 ~ values:", values)
      setDisabled(true);
      try {
        const response = await axios.patch(
          `https://technlogics.co/api/addresses/update/${locationId}`,
          {
            city: values.city,
            state: values.state,
            postal_code: values.postalCode,
            country: values.country,
          },
          {
            headers: {
              'Accept': 'application/json',
              'Authorization': 'Token ' + token
            }
          }
        );
        console.log("🚀 ~ response:", response)
        navigation.navigate(Screen.HOME);
      } catch (error: any) {
        console.error("Error updating location:", error);
      } finally {
        setDisabled(false);
      }
    },
    [navigation, locationId, token]
  );

  const handleVoiceInput = async (field: string) => {
    if (isListening) {
      await stopVoiceInput();
    } else {
      setActiveField(field);
      await startVoiceInput();
    }
  };

  useEffect(() => {
    if (voiceInputText && activeField) {
      setInitialValues(prev => ({ ...prev, [activeField]: voiceInputText }));
      setActiveField(null);
    }
  }, [voiceInputText, activeField]);

  return {
    color,
    disabled,
    loading,
    fieldValidation,
    handleSubmit,
    initialValues,
    navigation,
    styles: PatientLocationSetupStyles(color),
    handleVoiceInput,
    isListening,
    activeField,
  };
};

export default usePatientLocationSetup;

