import { observable } from 'mobx';

const parenter = {
  set(target, key, value) {
    if (typeof value === 'object') {
      value.parent = target;

      value = new Proxy(observable(value), parenter);
    }

    target[key] = value;

    return true;
  }
};

function observableWithParent(target) {
  target = new Proxy(observable(target), parenter);

  Object.keys(target).forEach(key => {
    if (target[key] && typeof target[key] === 'object') {
      target[key] = observableWithParent(target[key]);
    }
  });

  return target;
}

export default observableWithParent;
