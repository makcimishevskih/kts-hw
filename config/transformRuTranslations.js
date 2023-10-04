import fs from 'fs';

const reg1$ = /\d+0$/;
const reg2_4 = /^\d+?[2-4]$/;
const reg5_9 = /^\d+?[5-9]$/;

(async function () {
  const generateRuTranslations = (totalCount, one, many, parentCase) => {
    let line = `(0)[${parentCase}];(1)[${one}];(2-4)[${many}];(5-20)[${parentCase}];`;

    for (let i = 21; i < totalCount; i++) {
      const strI = String(i);

      if (/\d+05/.test(strI)) {
        const incValue = 14;
        line += `(${i}-${i + incValue})[${parentCase}]`;
        i += 14;
      } else if (reg1$.test(strI)) {
        line += `(${i})[${parentCase}];`;
      } else if (/\d+1$/.test(strI)) {
        line += `(${i})[${one}];`;
      } else if (reg2_4.test(strI)) {
        const incValue = 2;
        line += `(${i}-${i + incValue})[${many}];`;
        i += incValue;
      } else if (reg5_9.test(strI)) {
        const incValue = 4;
        line += `(${i}-${incValue + i})[${parentCase}];`;
        i += incValue;
      }
    }
    return line;
  };

  const stars_interval = generateRuTranslations(800, 'звезда', 'звезды', 'звезд');
  const watchers_interval = generateRuTranslations(800, 'подписчик', 'подписчика', 'подписчиков');
  const forks_interval = generateRuTranslations(800, 'ветка', 'ветки', 'веток');
  const contributions_interval = generateRuTranslations(
    800,
    'Контрибуция: {{count}}',
    'Контрибуции: {{count}}',
    'Контрибуций: {{count}}',
  );

  fs.readFile('./public/locales/ru/repoPage.json', (err, file) => {
    if (err) throw err;

    const jsonParsed = JSON.parse(file);

    const updatedJson = JSON.stringify({
      ...jsonParsed,
      subs: {
        stars_interval,
        watchers_interval,
        forks_interval,
      },
      contributors: {
        ...jsonParsed.contributors,
        contributions_interval,
      },
    });

    fs.writeFile('./public/locales/ru/repoPage.json', updatedJson, (err) => {
      if (err) throw err;
    });
  });
})();
