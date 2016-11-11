import TodoApp from './TodoApp';
import Todo from './Todo';

const app = new TodoApp();
window.app = app;

/**
 * The event loop
 */
function eventLoop () {
  /**
   * Render to DOM
   * ( state ) => ui
   */
  const addTodoForm = document.getElementById( 'addTodoForm' );
  const toggleBtn = document.getElementById( 'toggleBtn' );
  const todoList = document.getElementById( 'todoList' );
  const newTodoText = document.getElementById( 'newTodoText' );

  // add event listeners
  toggleBtn.addEventListener( 'click', () => {
    app.toggleFilter();
  });

  addTodoForm.addEventListener( 'submit', event => {
    event.preventDefault();
    app.addTodo( newTodoText.value );
  });

  // Render when the state changes.
  app.subscribe( () => render( app.getState() ) );
  render( app.getState() );

  function render ( state ) {
    let { todos, filter } = state;

    // set toggle button textj
    let toggleBtnText = 'Hide Completed';
    if ( filter ) {
      toggleBtnText = 'Show Completed';
      todos = todos.filter( t => ! t.isComplete() );
    }
    toggleBtn.textContent = toggleBtnText;

    // empty the list
    todoList.textContent = '';

    // render out todos
    todos.forEach( todo => {
      // create a new LI
      const li = document.createElement( 'li' );
      const titleSpan = document.createElement( 'span' );
      const rmSpan = document.createElement( 'span' );

      // populate the LI with title
      titleSpan.textContent = todo.getTitle();

      rmSpan.textContent = 'x';
      rmSpan.classList.add( 'todo__remove' );

      // if complete, set the class
      if ( todo.isComplete() ) {
        titleSpan.classList.add( 'todo--complete' );
      }

      // listen to clicks on the LI
      titleSpan.addEventListener( 'click', () => {
        app.changeTodo( todo.getId(), { complete: ! todo.isComplete() } );
      });

      rmSpan.addEventListener( 'click', () => {
        app.rmTodo( todo.getId() );
      });

      li.appendChild( titleSpan );
      li.appendChild( rmSpan );

      // add it to the todo list
      todoList.appendChild( li );
    });
  }
}

/**
 * As soon as we have the DOM, kick things off
 */
if ( document.readyState !== 'loading' ) {
  eventLoop();
} else {
  document.addEventListener( 'DOMContentLoaded', eventLoop );
}

