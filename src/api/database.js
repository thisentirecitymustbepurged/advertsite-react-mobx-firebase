import app from './app';

const db = app.firestore();
const toObject = QueryDocumentSnapshot => QueryDocumentSnapshot.data();
const toArray = QuerySnapshot => QuerySnapshot.docs.map(toObject);
const getCollection = async Collection => {
  const QuerySnapshot = await Collection.get();

  return toArray(QuerySnapshot);
};
const postCollection = async (Collection, document) => {
  const DocumentReference = await Collection.add(document);

  return DocumentReference;
};
const subscribeCollection = async (Collection, observer) => {
  const wrappedObserver = QuerySnapshot => observer(toArray(QuerySnapshot));
  const unsubscribe = Collection.onSnapshot(wrappedObserver);

  return unsubscribe;
};
const collection = (...args) => {
  const Collection = db.collection(...args);

  return {
    get: (...args) => getCollection(Collection, ...args),
    post: (...args) => postCollection(Collection, ...args),
    subscribe: (...args) => subscribeCollection(Collection, ...args),
  };
};

export const database = {
  entities: collection('entities')
};

window.database = database;
