import { useCallback, useState, useEffect } from 'react';
import * as yup from 'yup';
import { useAppContext } from '@src/context';
import { PatientLocationSetupStyles } from './PatientLocationSetup.style';
import { Screen } from '../../navigation/appNavigation.type';
import axios from 'axios';
import { useSelector } from 'react-redux';

const usePatientLocationSetup = (locationId: number) => {
  console.log("🚀 ~ usePatientLocationSetup ~ locationId:", locationId)
  const { color, navigation } = useAppContext();
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state: any) => state.auth?.isToken);


  const fieldValidation = yup.object().shape({
    // buildingNumber: yup.string().trim().required('Please enter building number'),
    // apartmentNumber: yup.string().trim().required('Please enter apartment number'),
    // floorNumber: yup.string().trim().required('Please enter floor number'),
    // address: yup.string().trim().required('Please enter address'),
    city: yup.string().trim().required('Please enter city'),
    state: yup.string().trim().required('Please enter state'),
    postalCode: yup.string().trim().required('Please enter postal code'),
    country: yup.string().trim().required('Please enter country'),
  });

  const [initialValues, setInitialValues] = useState({
    buildingNumber: '',
    apartmentNumber: '',
    floorNumber: '',
    address: '',
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
        // console.log("Address updated successfully:", response.data);
        navigation.navigate(Screen.HOME);
      } catch (error: any) {
        console.error("Error updating location:", error);
      } finally {
        setDisabled(false);
      }
    },
    [navigation, locationId]
  );

  return {
    color,
    disabled,
    loading,
    fieldValidation,
    handleSubmit,
    initialValues,
    navigation,
    styles: PatientLocationSetupStyles(color),
  };
};

export default usePatientLocationSetup;

