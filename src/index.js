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

    /**
     * For each todo, plop a list item.
     */
    let listHtml = '';
    todos.forEach( todo => {
      const classes = todo.isComplete() ? 'todo--complete' : '';

      // Important note: in the real world, this is a security problem; before injecting html from a
      // variable, you'll want to sanitize it first to prevent an XSS attack.
      listHtml += `
        <li data-id="${todo.getId()}" class="${classes}">
          ${todo.getTitle()}
        </li>
      `;
    });

    // Set the html into the 
    todoList.innerHTML = listHtml;

    todoList.querySelectorAll( 'li' ).forEach( li => li.addEventListener( 'click', function () {
      app.toggleComplete( this.getAttribute( 'data-id' ) );
    }));
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

