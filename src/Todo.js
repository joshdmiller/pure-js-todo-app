import shortid from 'shortid';
import State from './mixins/state';
import compose from './compose';

const TodoPrototype = {
  getId () {
    return this.getState().id;
  },

  getTitle () {
    return this.getState().title;
  },

  setTitle ( title ) {
    return this.setState({ title });
  },

  isComplete () {
    return this.getState().complete === true;
  },

  toggleComplete () {
    const complete = this.getState().complete;
    return this.setState({ complete: ! complete });
  },
};

export default todo => {
  if ( typeof todo !== 'object' ) {
    todo = {
      id: shortid.generate(),
      title: todo,
      complete: false,
    };
  }

  return compose( State( todo ), TodoPrototype );
};

