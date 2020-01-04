import { observable } from 'mobx';

const parenter = {
  set(target, key, value) {
    if (typeof value === 'object') {
      value.parent = target;

      value = observableWithParent(value);
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

// create observable from nested object without any existing oversables
// create an observable from observable
// create observable from nested object with an existing observable somewhere inside
// attaching a non-observable objects nested object
// attaching an observable object
// attaching an object that may have an observable inside

export default observableWithParent;
