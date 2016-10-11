import shortid from 'shortid';
import Stateful from './Stateful';

export default class Todo extends Stateful {
  constructor ( todo ) {
    super();

    if ( typeof todo === 'object' ) {
      this.setState( todo );
    } else {
      this.setState({
        id: shortid.generate(),
        title: todo,
        complete: false,
      });
    }
  }

  toggle () {
    const { complete } = this.getState();

    this.setState({
      complete: ! complete,
    });
  }

  getId () {
    return this.getState().id;
  }

  getTitle () {
    return this.getState().title;
  }

  setTitle ( title ) {
    this.setState({ title });
  }

  isComplete () {
    return this.getState().complete;
  }
}

