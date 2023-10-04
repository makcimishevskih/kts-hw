type TDateFormats = 'en-GB' | 'de-DE' | 'ar-EG' | 'en-US' | 'ko-KR' | 'ru-RU';

export const getFormattedDate = (date: string, format: TDateFormats = 'en-GB') => {
  return new Date(date).toLocaleDateString(format, {
    month: 'short',
    day: 'numeric',
  });
};
