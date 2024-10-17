import { useCallback, useState } from 'react';
import { useAppContext } from '@src/context';
import { ContentLanguage } from '@src/i18n';
import { Theme } from '@src/utils';
import { Screen } from '../../navigation/appNavigation.type';

const useSetting = () => {
  const {
    appTheme,
    color,
    language,
    navigation,
    setAppTheme,
    setLanguageInApp,
  } = useAppContext();

  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(appTheme === 'dark');
  const [isEnglishEnabled, setIsEnglishEnabled] = useState(language === ContentLanguage.English);

  const handleToggleTheme = useCallback(() => {
    const newTheme = isDarkModeEnabled ? 'light' : 'dark';
    setIsDarkModeEnabled(!isDarkModeEnabled);
    setAppTheme(newTheme as Theme);
  }, [isDarkModeEnabled, setAppTheme]);

  const handleToggleLanguage = useCallback(() => {
    const newLanguage = isEnglishEnabled ? ContentLanguage.Hindi : ContentLanguage.English;
    setIsEnglishEnabled(!isEnglishEnabled);
    setLanguageInApp(newLanguage);
  }, [isEnglishEnabled, setLanguageInApp]);

  const handleLogin = useCallback(() => {
    navigation.navigate(Screen.LOGIN);
  }, [navigation]);

  return {
    appTheme,
    color,
    handleToggleTheme,
    handleToggleLanguage,
    handleLogin,
    isDarkModeEnabled,
    isEnglishEnabled,
    language,
    navigation,
  };
};
export default useSetting;