import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './TodoApp';
import Todo from './Todo';
import App from './components/app';

/**
 * Our Main Code
 */

const onReady = function () {
  const app = TodoApp();

  /**
   * Expose the app on the `window` object so we can play with it in the console.
   */
  window.app = app;

  /**
   * Set Up Test Data
   */
  const todo1 = Todo( 'First Todo' );
  const todo2 = Todo( 'Second Todo' );
  const todo3 = Todo( 'Third Todo' );
  todo2.toggleComplete();

  app.setTodos([ todo1, todo2, todo3 ]);

  /**
   * A helper function for drawing the view.
   * ( state ) => ui
   */
  const renderTheView = () => ReactDOM.render(
    <App
      filter={app.isFiltered()}
      todos={app.getTodos()}
      markComplete={app::app.toggleComplete}
      create={app::app.addTodo}
      toggleFilter={app::app.toggleFilter}
    />, document.getElementById( 'app' )
  );

  /**
   * Whenever our app state changes, let's redraw the view to reflect it.
   */
  app.subscribe( renderTheView );

  /**
   * When the page first loads, we need to renderTheView it once, because it won't run again until the
   * state changes.
   */
  renderTheView();
};

/**
 * As soon as the browser is ready, let's kick things off
 */
if ( document.readyState !== 'loading' ) {
  onReady();
} else {
  document.addEventListener( 'DOMContentLoaded', onReady );
}

