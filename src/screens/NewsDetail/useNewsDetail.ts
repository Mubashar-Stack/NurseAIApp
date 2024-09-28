import { useCallback } from 'react';
import { contents, useAppContext } from '@src/context';
import { newsDetailStyles } from './NewsDetail.style';

const useNewsDetail = () => {
  const { color, navigation } = useAppContext();

  const getPublishedMonth = useCallback((val: number) => {
    const publishedAt = new Date(val).toString();
    return publishedAt.split(' ').slice(0, 3).join(' ');
  }, []);

  const handleGoBack = useCallback(async () => {
    navigation.goBack();
  }, [navigation]);

  return {
    contents,
    getPublishedMonth,
    handleGoBack,
    navigation,
    styles: newsDetailStyles(color),
  };
};

export default useNewsDetail;
