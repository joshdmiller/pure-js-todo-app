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

  toggleFilter () {
    this.setState({
      filter: ! this.isFiltered(),
    });
  }

  isFiltered () {
    return this.getState().filter;
  }
}

