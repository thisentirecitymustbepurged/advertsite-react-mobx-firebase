import { observable } from 'mobx';

const parenter = {
  set(target, key, value) {
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

export default observableWithParent;
