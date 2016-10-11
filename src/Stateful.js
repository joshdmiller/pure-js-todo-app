export default class Stateful {
  constructor () {
    this._state = {};
  }

  setState ( state ) {
    this._state = {
      ...this._state,
      ...state,
    };
  }

  getState () {
    return {
      ...this._state,
    };
  }

  toJSON () {
    return this.getState();
  }
}

