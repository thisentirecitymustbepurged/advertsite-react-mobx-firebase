import { mobxUtils } from 'common';

const creator = initial => {
  const test = mobxUtils.observableWithParent(initial);

  test.update = partial => Object.assign(test, partial);
  test.creator = creator;

  return test;
};

export const test = creator({
  foo: true,
  bar: false
});
