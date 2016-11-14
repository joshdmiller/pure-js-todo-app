'use strict';

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _TodoApp = require('./TodoApp');

var _TodoApp2 = _interopRequireDefault(_TodoApp);

var _Stateful = require('./Stateful');

var _Stateful2 = _interopRequireDefault(_Stateful);

var _Todo = require('./Todo');

var _Todo2 = _interopRequireDefault(_Todo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)('TodoApp', function (t) {
  var actual = undefined,
      expected = undefined,
      app = undefined;

  app = new _TodoApp2.default();

  t.ok(app instanceof _Stateful2.default, 'should inherit from Stateful');

  actual = app.getState().filter;
  expected = false;
  t.deepEqual(actual, expected, 'should begin without a filter');

  actual = app.getTodos();
  expected = [];
  t.deepEqual(actual, expected, 'should begin an empty set of todos');

  app.addTodo('Test');

  actual = app.getTodos().length;
  expected = 1;
  t.equal(actual, expected, 'addTodo should add a todo');

  var todo = app.getTodos()[0];
  actual = todo instanceof _Todo2.default;
  t.ok(actual, 'addTodo should add todos as Todo instances');

  actual = todo.getTitle();
  expected = 'Test';
  t.equal(actual, expected, 'addTodo should set the title of the todo to that passed');

  app.toggleFilter();
  todo.toggle();
  actual = app.getTodos().length;
  expected = 0;
  t.equal(actual, expected, 'should use filter to hide todos');

  app.toggleFilter();
  actual = app.getTodos().length;
  expected = 1;
  t.equal(actual, expected, 'should show all todos when filter removed');

  app.rmTodo(todo.getId());
  actual = app.getTodos().length;
  expected = 0;
  t.equal(actual, expected, 'rmTodo should remove a todo by its id');

  app.setTodos([new _Todo2.default('1'), new _Todo2.default('2')]);
  actual = app.getTodos().length;
  expected = 2;
  t.equal(actual, expected, 'setTodos should replace all todos witht those provided');

  t.end();
});

//# sourceMappingURL=TodoApp.spec-compiled.js.map