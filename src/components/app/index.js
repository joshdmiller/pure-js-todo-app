import React from 'react';

export default class App extends React.Component {
  constructor ( props ) {
    super( props );
    this.state = {};
  }

  render () {
    const {
      state,
      create = () => null,
      remove = () => null,
      toggle = () => null,
      toggleFilter = () => null,
    } = this.props;

    const todos = state.todos;
    const filter = state.filter;
    const loading = state.loading;

    let todoList;

    if ( loading ) {
      todoList = <li>Loading...</li>;
    } else if ( todos.length === 0 ) {
      todoList = <li>No todos.</li>;
    } else {
      todoList = todos
        .filter( todo => filter ? ! todo.isComplete() : true )
        .map( todo => (
          <li
            key={todo.getId()}
            className={todo.isComplete() ? 'todo--complete' : ''}
            >
            <span
              onClick={() => toggle( todo )}
              >
              { todo.getTitle() }
            </span>
            <span
              className="todo__remove"
              onClick={() => remove( todo )}
              >
                x
              </span>
          </li>
        ));
    }

    return (
      <div>
        <h1>The Todo App</h1>

        <form onSubmit={::this.submit} id="addTodoForm">
          <label htmlFor="newTodoText"></label>
          
          <input
            id="newTodoText"
            type={this.state.newTodo }
            onChange={ev => this.setState({ newTodo: ev.target.value })}
          />

          <button type="submit">Add Todo</button>
        </form>

        <button onClick={toggleFilter}>
          { filter ? 'Show Completed' : 'Hide Completed' }
        </button>

        <ul id="todoList">
          { todoList }
        </ul>
      </div>
    );
  }

  submit () {
    this.props.create( this.state.newTodo );
    this.setState({ newTodo: '' });
  }
};

