import { toJS } from 'mobx';
import { FC } from 'react';

import { useTranslation } from 'react-i18next';
import Loader from 'components/Loader';
import Text from 'components/Text';

import { TLanguagesModel } from 'store/models/repo';
import { randomRGBColor } from 'utils/randomRGBColor';

import css from './Languages.module.scss';

interface ILanguagesProps {
  languages: TLanguagesModel | null;
  error: string;
  loading: boolean;
}

const Languages: FC<ILanguagesProps> = ({ languages, error, loading }) => {
  const { t } = useTranslation('repoPage');

  const langValues: number[] = (languages && Object.values(toJS(languages))) || [];
  const oneLanguagesSum = langValues.reduce((acc, count) => acc + count, 0) / 100;
  const languagesWithPercent =
    languages &&
    Object.entries(toJS(languages)).map(([name, count]) => ({
      name,
      percent: +(count / oneLanguagesSum).toFixed(1),
      color: randomRGBColor(),
    }));

  return (
    <>
      <div className={css.languages}>
        <Text tag="h4" weight="bold" view="p-18">
          {t('languages.languages-title')}
        </Text>

        <div className={css.languages__status}>
          {loading && !error && <Loader color="accent" size="l" />}
          {error && !loading && <div className={css.languages__status_error}>{error}</div>}
          {!loading && !error && languages === null && (
            <div className={css.languages__status_empty}>{t('languages.no-data-languages')}</div>
          )}
        </div>

        {languagesWithPercent && languagesWithPercent?.length > 0 && (
          <>
            <div className={css.languages__range}>
              {languagesWithPercent.map(({ name, percent, color }) => (
                <div key={name} className={css.range__item} style={{ width: `${percent}%`, backgroundColor: color }} />
              ))}
            </div>

            <ul className={css.languages__list}>
              {languagesWithPercent.map(({ name, percent, color }) => (
                <li key={name} className={css.languages__item}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <circle cx="4" cy="4" r="4" fill={color} />
                  </svg>

                  <Text color="primary" tag="p">
                    {name}
                    <span className={css.languages__percent}>{percent}%</span>
                  </Text>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};
export default Languages;
