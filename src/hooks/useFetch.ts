import { useEffect, useState } from 'react';

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Добавляем статус loading

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false); // Устанавливаем loading в false при успешном получении данных
      } catch (err) {
        setError(err);
        setLoading(false); // Устанавливаем loading в false в случае ошибки
      }
    };

    fetchData();
  }, [url]);

  return { data, error, loading }; // Возвращаем loading в объекте
};

export default useFetch;
