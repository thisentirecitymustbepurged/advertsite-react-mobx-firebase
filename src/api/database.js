import app from './app';

const db = app.database();

const ref = path => db.ref(path);

export const database = {
  get: (path, options) => {
    const { orderBy, equalTo, limitToFirst, limitToLast, startAt, endAt } = options;
    let query = ref(path);

    if (orderBy) {
      query = query[orderBy]();

      if (equalTo) {
        query = query.equalTo(equalTo);
      }
      if (limitToFirst) {
        query = query.limitToFirst(limitToFirst);
      }
      if (limitToLast) {
        query = query.limitToLast(limitToLast);
      }
      if (startAt) {
        query = query.startAt(startAt);
      }
      if (endAt) {
        query = query.endAt(endAt);
      }
    }
    return query.once('value');
  }
};
