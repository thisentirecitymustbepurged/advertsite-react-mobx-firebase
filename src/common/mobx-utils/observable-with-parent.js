import { observable } from 'mobx';

const parenter = {
  set(target, key, value) {
    console.log({ target, key, value });

    if (key !== 'parent' && typeof value === 'object') {
      value.parent = target;

      value = observableWithParent(value);
    }

    target[key] = value;

    return true;
  }
};

function observableWithParent(obj) {
  if (!obj.__IS_OBSERVABLE_WITH_PARENT__) {
    obj.__IS_OBSERVABLE_WITH_PARENT__ = true;
    obj = new Proxy(observable(obj), parenter);
  }

  Object.keys(obj).forEach(key => {
    if (key !== 'parent' && obj[key] && typeof obj[key] === 'object') {
      obj[key] = observableWithParent(obj[key]);
    }
  });

  return obj;
}

// create observable from nested object without any existing oversables
// create an observable from observable
// create observable from nested object with an existing observable somewhere inside
// attaching a non-observable objects nested object
// attaching an observable object
// attaching an object that may have an observable inside

export default observableWithParent;
