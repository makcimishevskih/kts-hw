export type CollectionModel<K extends string | number, T> = {
  order: K[];
  entities: Record<K, T>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getInitialCollectionModel = (): CollectionModel<any, any> => ({
  order: [],
  entities: {},
});

export const getCollection = <K extends string | number, T>(
  data: T[],
  getKeyFromData: (data: T) => K,
): CollectionModel<K, T> => {
  const collection: CollectionModel<K, T> = {
    order: [],
    entities: {} as Record<K, T>,
  };

  data.forEach((item) => {
    const id = getKeyFromData(item);
    if (typeof id === 'number' || typeof id === 'string') {
      collection.order.push(id);
      collection.entities[id] = item;
    }
  });

  return collection;
};
