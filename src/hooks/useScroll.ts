import { useEffect, useState } from 'react';

const useScroll = (): { isScrollVisible: boolean } => {
  const [isScrollVisible, setIsScrollVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const coordY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const innerHeight = window.innerHeight;

      if (scrollHeight > innerHeight && coordY > innerHeight) {
        setIsScrollVisible(true);
      } else {
        setIsScrollVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { isScrollVisible };
};

export default useScroll;
