import { useAppContext } from '@src/context';

import { PatientCreditCardsStyles } from './PatientCreditCards.style';

const usePatientCreditCards = () => {
  const { color, navigation } = useAppContext();

  // add your code here

  return {
    navigation,
    styles: PatientCreditCardsStyles(color),
  };
};

export default usePatientCreditCards;
