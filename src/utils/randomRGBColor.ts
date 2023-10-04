type TOpacity = 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;
export const randomRGBColor = (opacity: TOpacity = 1) => {
  const max = 240; // if need from white and black 0 - 255
  const min = 25; // if need from white and black 0 - 255

  const calcColor = () => {
    const rgbArr: number[] = [];
    for (let i = 0; i < 3; i++) {
      const rndNum = min + Math.floor(Math.random() * (max - min + 1));
      rgbArr.push(rndNum);
    }
    return rgbArr;
  };

  const [r, g, b] = calcColor();

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
