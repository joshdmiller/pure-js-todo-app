import App from './App';
import Todo from './Todo';
import 'whatwg-fetch';

const HOST = 'http://localhost:3000';

export default class TodoApp extends App {
  constructor () {
    super();

    this.setState({
      filter: false,
      loading: true,
      todos: [],
    });

    // fetch initial todos
    fetch( `${HOST}/todos` )
      .then( res => res.json() )
      .then( todos => todos.map( t => new Todo( t ) ) )
      .then( todos => this.setState({ todos }) )
      ;
  }

  addTodo ( title ) {
    const { todos } = this.getState();

    // TODO: create on the server
    fetch( `${HOST}/todos`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
      }),
    })
      .then( res => res.json() )
      .then( todo => new Todo( todo ) )
      .then( todo => this.setState({ todos: [ ...todos, todo ] }))
      ;
  }

  rmTodo ( id ) {
    const { todos } = this.getState();

    fetch( `${HOST}/todos/${id}`, {
      method: 'DELETE',
    })
      .then( () => this.setState({ todos: todos.filter( t => id !== t.getId() ) }))
      ;
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

    const newTodo = {
      ...oldTodo.getState(),
      ...fields,
    };

    fetch( `${HOST}/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( newTodo ),
    })
      .then( res => res.json() )
      .then( todo => new Todo( todo ) )
      .then( newTodo => this.setState({ todos: todos.map( todo => {
        if ( id === todo.getId() ) {
          return newTodo;
        }

        return todo;
      })}))
    ;
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

