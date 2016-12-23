import compose from './compose';
import notifyMixin from './mixins/notify';
import State from './mixins/state';
import Todo from './Todo';

const initialState = {
  todos: [],
  filter: false,
};

export default ( firebaseConfig ) => {
  const stateMixin = State( initialState );

  const firebaseApp = firebase.initializeApp( firebaseConfig );
  const dbTodos = firebaseApp.database().ref( 'todos' );

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
      // const todo = Todo( title );
      // const todos = this.getState().todos;
      // this.setState({ todos: [ ...todos, todo ] });

      // now push it to the db
      dbTodos.push({
        title,
        complete: false,
      });
    },

    rmTodo ( id ) {
      // const todos = this.getState().todos;
      // this.setState({
      //   todos: todos.filter( todo => todo.getId() !== id ),
      // });

      // analogy: dbTodos[ id ]
      dbTodos.child( id ).remove();
    },

    // _changeTodo ( id, fn ) {
    //   return this.getState().todos
    //     .map( todo => {
    //       if ( todo.getId() === id ) {
    //         fn( todo )
    //         return todo;
    //       }

    //       return todo;
    //     })
    //   ;
    // },

    toggleComplete ( id ) {
      // const todos = this._changeTodo( id, todo => todo.toggleComplete() );
      // this.setState({ todos });
      const todo = this.getState().todos.find( todo => todo.getId() === id );
      dbTodos.child( id ).set({
        ...todo.getState(),
        complete: ! todo.isComplete(),
      });
    },

    setTitle ( id, title ) {
      // const todos = this._changeTodo( id, todo => todo.setTitle( title ) );
      // this.setState({ todos });
      const todo = this.getState().todos.find( todo => todo.getId() === id );
      dbTodos.child( id ).set({
        ...todo.getState(),
        title,
      });
    },

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

  dbTodos.on( 'value', snapshot => {
    const todoObject = snapshot.val();

    let todos = [];

    if ( todoObject ) {
      // e.g. {
      //  'id1': { id: 'id1', complete: false, title: 'First Todo', },
      //  'id2': { id: 'id2', complete: false, title: 'Second Todo', },
      //  'id3': { complete: false, title: 'Third Todo', },
      // }
      // getOwnPropertyNames: [ 'id1', 'id2', 'id3' ]
      // map: [
      //  { id: 'id1', complete: false, title: 'First Todo', },
      //  { id: 'id2', complete: false, title: 'Second Todo', },
      //  { complete: false, title: 'Third Todo', },
      // ]
      // map2: [
      //   Todo(),
      //   Todo(),
      //   Todo(),
      // ]
      todos = Object.getOwnPropertyNames( todoObject )
        .map( id => ({
          ...todoObject[ id ],
          id,
        }))
        .map( todo => Todo( todo ) )
        ;
    }

    app.setTodos( todos );
  });

  return app;
};

