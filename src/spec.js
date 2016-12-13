import test from 'tape';
import { TodoClass, Todo, todoPrototype } from './index';

test( 'Todo', function ( test ) {
  let actual, expected, todo;

  // with es6 classes
  todo = new TodoClass( 'First Todo' );

  actual = todo.getTitle();
  expected = 'First Todo';
  test.equal( actual, expected, 'getTitle should return the title' );


  // new:
  //   - creates a new object
  //   - binds function to new object
  //   - returns the new object
  todo = new Todo( 'Another Todo' );

  actual = todo.getTitle();
  expected = 'Another Todo';
  test.equal( actual, expected, 'getTitle should return the title' );

  // Same, but without the new keyword
  todo = Object.create( todoPrototype );
  Todo.call( todo, 'Newless Todo' );

  // protype chain:
  //   null
  //   Object.prototype
  //   todoPrototype
  //   todo
  //   groupTodo // instance
  const groupTodo = Object.create( todo );

  actual = todo.getTitle();
  expected = 'Newless Todo';
  test.equal( actual, expected, 'getTitle should return the title' );

  test.end();
});

