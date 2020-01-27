import * as mobx from 'mobx';

const { isObservable, toJS } = mobx;

window.console.defaultLog = window.console.log;
window.console.log = function log(...args) {
  window.console.defaultLog(...args.map(e => (isObservable(e) ? toJS(e) : e)));
};

window.mobx = mobx;
