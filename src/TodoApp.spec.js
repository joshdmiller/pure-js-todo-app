import test from 'tape';
import TodoApp from './TodoApp';
import Stateful from './Stateful';
import Todo from './Todo';

test( 'TodoApp', t => {
  let actual, expected, app;

  app = new TodoApp();

  t.ok( app instanceof Stateful, 'should inherit from Stateful' );

  actual = app.getState().filter;
  expected = false;
  t.deepEqual( actual, expected, 'should begin without a filter' );

  actual = app.getTodos();
  expected = [];
  t.deepEqual( actual, expected, 'should begin an empty set of todos' );

  app.addTodo( 'Test' );

  actual = app.getTodos().length;
  expected = 1;
  t.equal( actual, expected, 'addTodo should add a todo' );

  let todo = app.getTodos()[ 0 ];
  actual = todo instanceof Todo;
  t.ok( actual, 'addTodo should add todos as Todo instances' );

  actual = todo.getTitle();
  expected = 'Test';
  t.equal( actual, expected, 'addTodo should set the title of the todo to that passed' );

  app.toggleFilter();
  todo.toggle();
  actual = app.getTodos().length;
  expected = 0;
  t.equal( actual, expected, 'should use filter to hide todos' );

  app.toggleFilter();
  actual = app.getTodos().length;
  expected = 1;
  t.equal( actual, expected, 'should show all todos when filter removed' );

  app.rmTodo( todo.getId() );
  actual = app.getTodos().length;
  expected = 0;
  t.equal( actual, expected, 'rmTodo should remove a todo by its id' );

  app.setTodos([ new Todo( '1' ), new Todo( '2' ) ]);
  actual = app.getTodos().length;
  expected = 2;
  t.equal( actual, expected, 'setTodos should replace all todos witht those provided' );

  t.end();
});

