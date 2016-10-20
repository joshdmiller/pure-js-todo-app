import TodoApp from './TodoApp';
import Todo from './Todo';

const app = new TodoApp();
window.app = app;

/**
 * Dummy data
 */
const todo1 = new Todo( 'First todo' );
const todo2 = new Todo( 'Second todo' );
todo2.toggle();
const todo3 = new Todo( 'Third todo' );
app.setTodos([ todo1, todo2, todo3 ]);

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

      // populate the LI with title
      li.textContent = todo.getTitle();

      // if complete, set the class
      if ( todo.isComplete() ) {
        li.classList.add( 'todo--complete' );
      }

      // listen to clicks on the LI
      li.addEventListener( 'click', () => {
        app.changeTodo( todo.getId(), { complete: ! todo.isComplete() } );
      });

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

