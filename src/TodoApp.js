import compose from './compose';
import notifyMixin from './mixins/notify';
import State from './mixins/state';
import Todo from './Todo';

const initialState = {
  todos: [],
  filter: false,
};

export default () => {
  const stateMixin = State( initialState );

  const TodoAppPrototype = {
    /**
     * State
     */

    getTodos () {
      const todos = this.getState().todos;

      return this.isFiltered() ? todos.filter( t => ! t.isComplete() ) : todos;
    },

    setTodos ( todos ) {
      this.setState({ todos });
    },

    toggleFilter () {
      const filter = this.getState().filter;
      this.setState({ filter: ! filter });
    },

    isFiltered () {
      return this.getState().filter;
    },

    /**
     * Todo Functions
     */

    addTodo ( title ) {
      const todo = Todo( title );
      const todos = this.getState().todos;
      this.setState({ todos: [ ...todos, todo ] });
    },

    rmTodo ( id ) {
      const todos = this.getState().todos;
      this.setState({
        todos: todos.filter( todo => todo.getId() !== id ),
      });
    },

    _changeTodo ( id, fn ) {
      return this.getState().todos
        .map( todo => {
          if ( todo.getId() === id ) {
            fn( todo )
            return todo;
          }

          return todo;
        })
      ;
    },

    toggleComplete ( id ) {
      const todos = _changeTodo( id, todo => todo.toggleComplete() );
      this.setState({ todos });
    },

    setTitle ( id, title ) {
      const todos = _changeTodo( id, todo => todo.setTitle( title ) );
      this.setState({ todos });
    },

    /**
     * Listeners!
     */

    setState ( newState ) {
      stateMixin.setState.call( this, newState );
      this.notify();
    }
  };

  return compose(
    notifyMixin,
    stateMixin,
    TodoAppPrototype
  );
};

