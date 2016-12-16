import test from 'tape';
import Todo from './Todo';

test( 'Todo', t => {
  let actual, expected, todo;
  let testTodo = {
    id: 'test',
    title: 'Test',
    complete: true,
  };

  todo = Todo( testTodo );

  actual = todo.getId();
  expected = testTodo.id;
  t.equal( actual, expected, 'with object, should store the id' );

  actual = todo.getTitle();
  expected = testTodo.title;
  t.equal( actual, expected, 'with object, should store the title' );

  actual = todo.isComplete();
  expected = testTodo.complete;
  t.equal( actual, expected, 'with object, should store the completion' );

  todo = Todo( 'Test' );

  actual = typeof todo.getId();
  expected = 'string';
  t.equal( actual, expected, 'with title, should generate an id' );

  actual = todo.getTitle();
  expected = 'Test';
  t.equal( actual, expected, 'with title, should store the title' );

  actual = todo.isComplete();
  expected = false;
  t.equal( actual, expected, 'with title, should default to not complete' );

  todo = Todo( 'Test' );
  todo.toggleComplete();
  actual = todo.isComplete();
  expected = true;
  t.equal( actual, expected, 'toggleComplete should complete uncompleted todos' );

  todo.toggleComplete();
  actual = todo.isComplete();
  expected = false;
  t.equal( actual, expected, 'toggleComplete should uncomplete completed todos' );

  todo = Todo( 'Test' );
  todo.setTitle( 'New' );
  actual = todo.getTitle();
  expected = 'New';
  t.equal( actual, expected, 'setTitle should change the title' );

  t.end();
});

