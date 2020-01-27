import { observable } from 'mobx';
import nativeArrayProperties from './native-array-properties.json';

const assignParent = (target, key, value) => {
  if (key !== 'parent' && typeof value === 'object') {
    value = observableWithParent(value);

    if (Array.isArray(value)) {
      value.__STORE__.parent = target;
    } else {
      value.parent = target;
    }
  }

  return value;
};

const objectParenter = {
  set(target, key, value) {
    value = assignParent(target, key, value);

    target[key] = value;

    return true;
  }
};

const arrayParenter = {
  set(target, key, value) {
    value = assignParent(target, key, value);

    if (nativeArrayProperties[key] || Number.isInteger(Number(key))) {
      target[key] = value;
    } else {
      target.__STORE__[key] = value;
    }

    return true;
  },
  get(target, key) {
    if (key === '__STORE__' || nativeArrayProperties[key] || typeof key === 'symbol' || Number.isInteger(Number(key))) {
      return target[key];
    }

    return target.__STORE__[key];
  }
};

function observableWithParent(obj, options, ...args) {
  if (!obj.__IS_OBSERVABLE_WITH_PARENT__) {
    obj = observable(obj, ...args);
    obj.__IS_OBSERVABLE_WITH_PARENT__ = true;
    let parenter = objectParenter;

    if (Array.isArray(obj)) {
      obj.__STORE__ = observableWithParent({});
      parenter = arrayParenter;
    }

    obj = new Proxy(obj, parenter);
  }

  Object.keys(obj).forEach(key => {
    if (key !== 'parent' && key !== '__STORE__' && obj[key] && typeof obj[key] === 'object') {
      obj[key] = observableWithParent(obj[key]);
    }
  });

  return obj;
}

export default observableWithParent;
