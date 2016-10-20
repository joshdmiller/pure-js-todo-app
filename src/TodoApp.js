import App from './App';
import Todo from './Todo';

export default class TodoApp extends App {
  constructor () {
    super();

    this.setState({
      filter: false,
      todos: [],
    });
  }

  addTodo ( title ) {
    const { todos } = this.getState();

    this.setState({
      todos: [ ...todos, new Todo( title ) ],
    });
  }

  rmTodo ( id ) {
    const { todos } = this.getState();

    this.setState({
      todos: todos.filter( todo => todo.getId() !== id ),
    });
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

    const newTodos = todos.map( oldTodo => {
      if ( oldTodo.getId() === id ) {
        return new Todo({
          ...oldTodo.getState(),
          ...fields,
        });
      }

      return oldTodo;
    });

    this.setState({
      todos: newTodos,
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

