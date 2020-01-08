import app from './app';

const stor = app.storage();

export const storage = {
  get: path => stor.ref(path),
};
