import TodoApp from './TodoApp';
import Todo from './Todo';

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
   * Grab a reference to our existing DOM elements
   */
  const addTodoForm = document.getElementById( 'addTodoForm' );
  const toggleBtn = document.getElementById( 'toggleBtn' );
  const todoList = document.getElementById( 'todoList' );
  const newTodoText = document.getElementById( 'newTodoText' );

  /**
   * Event Listener: when the filter button is clicked, toggle the filter status.
   */
  toggleBtn.addEventListener( 'click', () => {
    app.toggleFilter();
  });

  /**
   * Event Listener: when the form is submitted, create a new todo and clear the text.
   */
  addTodoForm.addEventListener( 'submit', event => {
    event.preventDefault();
    app.addTodo( newTodoText.value );
    newTodoText.value = '';
  });

  /**
   * A helper function for drawing the view.
   * ( state ) => ui
   */
  const renderTheView = () => {
    const filter = app.isFiltered();
    const todos = app.getTodos();

    // Set the filter button text.
    toggleBtn.textContent = filter ? 'Show Completed' : 'Hide Completed';

    // We need to first get rid of all the todos we already drew out, so we don't need to check
    // which ones we need to update manually.
    todoList.textContent = '';

    /**
     * For each todo, plop a list item.
     */
    todos.forEach( todo => {
      // Create a new LIm but don't put it anywhere on the page just yet.
      const li = document.createElement( 'li' );

      // Populate the LI with title of the todo.
      li.textContent = todo.getTitle();

      // If complete, add a class so we can put in some strikethrough.
      if ( todo.isComplete() ) {
        li.classList.add( 'todo--complete' );
      }

      // Listen to clicks on the LI and toggle the completion status then.
      li.addEventListener( 'click', () => {
        app.toggleComplete( todo.getId() );
      });

      // Finally, dd it to the todo list so it will appear on the page.
      todoList.appendChild( li );
    });
  };

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

