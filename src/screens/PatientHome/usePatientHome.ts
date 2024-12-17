import { useAppContext } from '@src/context';
import { PatientHomeStyles } from './PatientHome.style';
import { useState } from 'react';

const usePatientHome = () => {
  const { color, navigation } = useAppContext();
  const [activeSlide, setActiveSlide] = useState(0);

  const updates = [
    { id: '1', discount: '20% OFF', description: 'Updates will be here' },
    { id: '2', discount: '20% OFF', description: 'Updates will be here' },
  ];

  const hospitals = [
    {
      id: '1',
      name: 'Name of hospital',
      distance: 'Distance between user location and hospital',
      rating: 4,
    },
    {
      id: '2',
      name: 'Name of hospital',
      distance: 'Distance between user location and hospital',
      rating: 5,
    },
  ];

  return {
    navigation,
    styles: PatientHomeStyles(color),
    updates,
    hospitals,
    activeSlide,
    setActiveSlide,
  };
};

export default usePatientHome;

