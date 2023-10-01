import { FC, useState } from 'react';

import { useTranslation } from 'react-i18next';
import Button from 'components/Button';

interface ILangButtonProps {}

const LangButton: FC<ILangButtonProps> = () => {
  const [lang, setLang] = useState('En');
  const { t, i18n } = useTranslation();

  const changeLanguageHandler = () => {
    if (lang === 'En') {
      setLang('Ru');
      i18n.changeLanguage('ru');
    } else {
      setLang('En');
      i18n.changeLanguage('en');
    }
  };
  return (
    <Button onClick={changeLanguageHandler} isRound={true} isRect={true}>
      {t('language-button-text', { lang })}
    </Button>
  );
};
export default LangButton;
