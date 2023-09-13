type TOpacity = 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;
export const randomRGBColor = (opacity: TOpacity = 1) => {
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
