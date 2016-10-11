import Stateful from './Stateful';

export default class App extends Stateful {
  constructor () {
    super();

    this._subscribers = [];
  }

  subscribe ( fn ) {
    this._subscribers.push( fn );

    return () => this.unsubscribe( fn );
  }

  unsubscribe ( fn ) {
    this._subscribers = this._subscribers.filter( f => f !== fn );
  }

  setState ( state ) {
    Stateful.prototype.setState.call( this, state );

    this._subscribers.forEach( fn => fn() );
  }
}

