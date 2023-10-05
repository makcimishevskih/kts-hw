const scrollTo = (Y: number = 0) => {
  window.scrollTo({ top: Y, behavior: 'smooth' });
};

export default scrollTo;
