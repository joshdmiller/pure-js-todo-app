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

//Class Bonus question

(function simpleScript() {

  console.log('***********Simple App Script*************');

  var simpleTodo = new TodoApp();

  simpleTodo.addTodo('First todo');
  simpleTodo.addTodo('Second todo');
  simpleTodo.addTodo('Third todo');

  var todos = simpleTodo.getTodos();

  //In the future the UI will determine what array element?
  todos[1].toggle();

  todos.forEach( e => {
    console.log('- [' + (() => {if (e.isComplete()) { return 'x'} else { return ''}})() + ']'+ ' ' + e.getTitle())
  });

})()

