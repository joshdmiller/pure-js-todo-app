import App from './App';
import Todo from './Todo';

export default class TodoApp extends App {
  constructor ( config ) {
    super();

    this.setState({
      filter: false,
      loading: true,
      todos: [],
    });

    this.firebaseApp = firebase.initializeApp( config );
    this.todos = this.firebaseApp.database().ref( 'todos' );

    this.todos.on( 'value', snapshot => {
      const todoObject = snapshot.val();
      let todos = [];

      if ( todoObject ) {
        todos = Object.getOwnPropertyNames( todoObject ).map( id => new Todo({
          ...todoObject[ id ],
          id,
        }));
      }

      this.setState({ todos, loading: false });
    });
  }

  addTodo ( title ) {
    const { todos } = this.getState();

    this.todos.push({
      title,
      complete: false,
    });
  }

  rmTodo ( id ) {
    const { todos } = this.getState();
    this.todos.child( id ).remove();
  }

  getTodos () {
    const todos = this.getState().todos;

    if ( this.isFiltered() ) {
      return todos.filter( todo => ! todo.isComplete() );
    }

    return todos;
  }

  setTodos ( todos ) {
    return this.setState({
      todos: todos,
    });
  }

  changeTodo( id, fields ) {
    const { todos } = this.getState();
    const oldTodo = todos.find( t => t.getId() === id );

    this.todos.child( id ).set({
      ...oldTodo.getState(),
      ...fields,
    });
  }

  toggleFilter () {
    this.setState({
      filter: ! this.isFiltered(),
    });
  }

  isFiltered () {
    return this.getState().filter;
  }
}

