type TOpacity = 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;
export const randomRGBColor = (opacity: TOpacity = 1) => {
  // const colors = ['blue', 'red', 'gold'];
  // const colors = ['blue', 'red', 'rgba(49, 120, 198, 1)'];
  // const langs = {
  //   TypeScript: 'rgba(49, 120, 198, 1)',
  //   JavaScript: 'rgba(241, 224, 90, 1)',
  //   HTML: 'rgba(227, 76, 38, 1)',
  //   CSS: 'rgba(86, 61, 124, 1)',
  //   SCSS: 'rgba(198, 83, 140, 1)',
  // };

  const max = 245; // if need from white 255
  const min = 0; // if need from white 255
  const calcColor = () => {
    return min + Math.floor(Math.random() * (max - min + 1));
  };
  const r = calcColor();
  const g = calcColor();
  const b = calcColor();
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
