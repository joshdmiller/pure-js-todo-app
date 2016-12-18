import React from 'react';

export default React.createClass({
  getInitialState () {
    return {
      newTodoText: '',
    };
  },

  create ( e ) {
    e.preventDefault();
    this.props.create( this.state.newTodoText );
    this.setState({ newTodoText: '' });
  },

  render () {
    const {
      filter,
      todos,

      // callbacks
      toggleFilter,
      create,
      markComplete,
    } = this.props;

    const { newTodoText } = this.state;

    return (
      <div>
        <h1>The Todo App</h1>

        <form onSubmit={this.create}>
          <label htmlFor="newTodoText">Add a Todo:</label>
          <input
            id="newTodoText"
            value={newTodoText}
            onChange={e => this.setState({ newTodoText: e.target.value })}
            type="text"
          />
          <button type="submit">Add Todo</button>
        </form>

        <button onClick={toggleFilter}>
          { filter ? 'Show Completed' : 'Hide Completed'}
        </button>

        <ul>
          { todos.map( todo => (
            <li
              key={todo.getId()}
              onClick={() => markComplete( todo.getId() )}
              className={todo.isComplete() ? 'todo--complete' : ''}
              >
              { todo.getTitle() }
            </li>
          ))}
        </ul>
      </div>
    );
  },
});

