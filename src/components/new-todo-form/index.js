import React from 'react';

export default class App extends React.Component {
  constructor ( props ) {
    super( props );
    this.state = {};
  }

  render () {
    return (
      <form onSubmit={::this.submit} id="addTodoForm">
        <label htmlFor="newTodoText"></label>

        <input
          id="newTodoText"
          type={this.state.newTodo }
          onChange={ev => this.setState({ newTodo: ev.target.value })}
        />

      <button type="submit">Add Todo</button>
      </form>
    );
  }

  submit () {
    this.props.create( this.state.newTodo );
    this.setState({ newTodo: '' });
  }
}

