import fs from 'fs';

const reg1$ = /\d+0$/;
const reg2_4 = /^\d+?[2-4]$/;
const reg5_9 = /^\d+?[5-9]$/;

(async function () {
  const generateRuStars = (name, totalCount) => {
    let line = `(0)[${name.slice(0, name.length - 1)}];(1)[${name}];(2-4)[${name.slice(
      0,
      name.length - 1,
    )}ы];(5-20)[${name.slice(0, name.length - 1)}];`;

    for (let i = 21; i < totalCount; i++) {
      const strI = String(i);

      if (/\d+05/.test(strI)) {
        const incValue = 14;
        line += `(${i}-${i + incValue})[${name.slice(0, name.length - 1)}]`;
        i += 14;
      } else if (reg1$.test(strI)) {
        line += `(${i})[${name.slice(0, name.length - 1)}];`;
      } else if (/\d+1$/.test(strI)) {
        line += `(${i})[${name}];`;
      } else if (reg2_4.test(strI)) {
        const incValue = 2;
        line += `(${i}-${i + incValue})[${name.slice(0, name.length - 1)}ы];`;
        i += incValue;
      } else if (reg5_9.test(strI)) {
        const incValue = 4;
        line += `(${i}-${incValue + i})[${name.slice(0, name.length - 1)}];`;
        i += incValue;
      }
    }
    return line;
  };

  const generateRuWatchers = (name, totalCount) => {
    let line = `(0)[${name.slice(0, name.length - 1)}];(1)[${name}];(2-4)[${name.slice(
      0,
      name.length - 1,
    )}ы];(5-20)[${name.slice(0, name.length - 1)}];`;

    for (let i = 21; i < totalCount; i++) {
      const strI = String(i);

      if (/\d+05/.test(strI)) {
        const incValue = 14;
        line += `(${i}-${i + incValue})[${name.slice(0, name.length - 1)}]`;
        i += 14;
      } else if (reg1$.test(strI)) {
        line += `(${i})[${name}ов];`;
      } else if (/\d+1$/.test(strI)) {
        line += `(${i})[${name}];`;
      } else if (reg2_4.test(strI)) {
        const incValue = 2;
        line += `(${i}-${i + incValue})[${name}а];`;
        i += incValue;
      } else if (reg5_9.test(strI)) {
        const incValue = 4;
        line += `(${i}-${i + incValue})[${name}ов];`;
        i += incValue;
      }
    }
    return line;
  };

  const generateRuForks = (name, totalCount) => {
    let line = `(0)[${name.slice(0, name.length - 2)}ок];(1)[${name}];(2-4)[${name.slice(
      0,
      name.length - 1,
    )}и];(5-20)[${name.slice(0, name.length - 2)}ок];`;

    for (let i = 21; i < totalCount; i++) {
      const strI = String(i);

      if (/\d+05/.test(strI)) {
        const incValue = 14;
        line += `(${i}-${i + incValue})[${name.slice(0, name.length - 2)}ок]`;
        i += 14;
      } else if (/\d+1$/.test(strI)) {
        line += `(${i})[${name}];`;
      } else if (reg2_4.test(strI)) {
        const incValue = 2;
        line += `(${i}-${i + incValue})[${name.slice(0, name.length - 1)}и];`;
        i += incValue;
      } else if (reg5_9.test(strI)) {
        const incValue = 4;
        line += `(${i}-${i + incValue})[${name.slice(0, name.length - 2)}ок];`;
        i += incValue;
      }
    }
    return line;
  };

  const generateRuContributions = (name, totalCount) => {
    let line = `(0)[${name.slice(0, name.length - 1)}й];(1)[${name}];(2-4)[${name.slice(
      0,
      name.length - 1,
    )}и];(5-20)[${name.slice(0, name.length - 1)}й];`;

    for (let i = 21; i < totalCount; i++) {
      const strI = String(i);

      if (/\d+05/.test(strI)) {
        const incValue = 14;
        line += `(${i}-${i + incValue})[${name.slice(0, name.length - 1)}й]`;
        i += 14;
      } else if (reg1$.test(strI)) {
        line += `(${i})[${name.slice(0, name.length - 1)}й];`;
      } else if (/\d+1$/.test(strI)) {
        line += `(${i})[${name}];`;
      } else if (reg2_4.test(strI)) {
        const incValue = 2;
        line += `(${i}-${i + incValue})[${name.slice(0, name.length - 1)}и];`;
        i += incValue;
      } else if (reg5_9.test(strI)) {
        const incValue = 4;
        line += `(${i}-${i + incValue})[${name.slice(0, name.length - 1)}й];`;
        i += incValue;
      }
    }
    return line;
  };

  const stars_interval = generateRuStars('звезда', 800);
  const watchers_interval = generateRuWatchers('подписчик', 800);
  const forks_interval = generateRuForks('ветка', 800);
  const contributions_interval = generateRuContributions('Контрибуция', 800);

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
