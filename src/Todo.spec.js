import test from 'tape';
import Todo from './Todo';
import Stateful from './Stateful';

test( 'Todo', t => {
  let actual, expected, todo;
  let testTodo = {
    id: 'test',
    title: 'Test',
    complete: true,
  };

  todo = new Todo( testTodo );

  t.ok( todo instanceof Stateful, 'should inherit from Stateful' );

  actual = todo.getId();
  expected = testTodo.id;
  t.equal( actual, expected, 'with object, should store the id' );

  actual = todo.getTitle();
  expected = testTodo.title;
  t.equal( actual, expected, 'with object, should store the title' );

  actual = todo.isComplete();
  expected = testTodo.complete;
  t.equal( actual, expected, 'with object, should store the completion' );

  todo = new Todo( 'Test' );

  actual = typeof todo.getId();
  expected = 'string';
  t.equal( actual, expected, 'with title, should generate an id' );

  actual = todo.getTitle();
  expected = 'Test';
  t.equal( actual, expected, 'with title, should store the title' );

  actual = todo.isComplete();
  expected = false;
  t.equal( actual, expected, 'with title, should default to not complete' );

  todo = new Todo( 'Test' );
  todo.toggle();
  actual = todo.isComplete();
  expected = true;
  t.equal( actual, expected, 'toggle should complete uncompleted todos' );

  todo.toggle();
  actual = todo.isComplete();
  expected = false;
  t.equal( actual, expected, 'toggle should uncomplete completed todos' );

  todo = new Todo( 'Test' );
  todo.setTitle( 'New' );
  actual = todo.getTitle();
  expected = 'New';
  t.equal( actual, expected, 'setTitle should change the title' );

  t.end();
});

