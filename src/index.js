import TodoApp from './TodoApp';
import Todo from './Todo';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

const app = new TodoApp();
window.app = app;

// Render when the state changes.
const render = () => {
  ReactDOM.render(
    <App
      state={app.getState()}
      toggle={t => app.changeTodo( t.getId(), { complete: ! t.isComplete() } )}
      remove={t => app.rmTodo( t.getId() )}
      create={text => app.addTodo( text )}
      toggleFilter={() => app.toggleFilter()}
    />,
    document.getElementById( 'app' )
  );
};
app.subscribe( render );
render();

