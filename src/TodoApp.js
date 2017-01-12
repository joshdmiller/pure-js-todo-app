import compose from './compose';
import notifyMixin from './mixins/notify';
import State from './mixins/state';
import Todo from './Todo';

const API_URI = 'http://localhost:3000';

const initialState = {
  todos: [],
  filter: false,
};

const TodoApp = ( $http ) => {
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
      const todos = this.getState().todos;

      $http.post( `${API_URI}/todos`, {
        title,
      })
        .then( res => res.data )
        .then( todo => Todo( todo ) )
        .then( todo => this.setState({ todos: [ ...todos, todo ] }) )
        ;
      // const todo = Todo( todoFromServer );
      // this.setState({ todos: [ ...todos, todo ] });

      // now push it to the db
      // dbTodos.push({
      //   title,
      //   complete: false,
      // });
    },

    rmTodo ( id ) {
      const todos = this.getState().todos;

      $http.delete( `${API_URI}/todos/${id}` )
        // .then( res => res.data )
        .then( () => this.setState({
          todos: todos.filter( todo => todo.getId() !== id ),
        }))
        ;

      // analogy: dbTodos[ id ]
      // dbTodos.child( id ).remove();
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
      const todo = this.getState().todos.find( todo => todo.getId() === id );

      $http.put( `${API_URI}/todos/${id}`, {
        complete: ! todo.isComplete(),
      })
        .then( res => res.data )
        .then( todo => Todo( todo ) )
        .then( todo => this.getState().todos.map( t => {
          if ( t.getId() === id ) {
            return todo;
          }

          return t;
        }))
        .then( todos => this.setState({ todos }))
        ;

      // const todos = this._changeTodo( id, todo => todo.toggleComplete() );
      // dbTodos.child( id ).set({
      //   ...todo.getState(),
      //   complete: ! todo.isComplete(),
      // });
    },

    // setTitle ( id, title ) {
    //   // const todos = this._changeTodo( id, todo => todo.setTitle( title ) );
    //   // this.setState({ todos });
    //   const todo = this.getState().todos.find( todo => todo.getId() === id );
    //   dbTodos.child( id ).set({
    //     ...todo.getState(),
    //     title,
    //   });
    // },

    /**
     * Listeners!
     */

    setState ( newState ) {
      stateMixin.setState.call( this, newState );
      this.notify();
    }
  };

  const app = compose(
    notifyMixin,
    stateMixin,
    TodoAppPrototype
  );

  $http.get( `${API_URI}/todos` )
    .then( response => response.data )
    .then( todos => todos.map( t => Todo( t ) ) )
    .then( todos => app.setTodos( todos ) )
    ;

  return app;
};
TodoApp.$inject = [ '$http' ];

export default TodoApp;

