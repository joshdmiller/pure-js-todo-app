import React from 'react';
import TodoList from '../todo-list';
import NewTodoForm from '../new-todo-form';

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
      todoList = <h3>Loading...</h3>;
    } else if ( todos.length === 0 ) {
      todoList = <h3>No todos.</h3>;
    } else {
      const filteredTodos = todos
        .filter( todo => filter ? ! todo.isComplete() : true )

      todoList = <TodoList toggle={toggle} remove={remove} todos={filteredTodos} />;
    }

    return (
      <div>
        <h1>The Todo App</h1>

        <NewTodoForm onCreate={create} />

        <button onClick={toggleFilter}>
          { filter ? 'Show Completed' : 'Hide Completed' }
        </button>
        
        { todoList }
      </div>
    );
  }
};

