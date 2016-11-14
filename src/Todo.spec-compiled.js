'use strict';

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _Todo = require('./Todo');

var _Todo2 = _interopRequireDefault(_Todo);

var _Stateful = require('./Stateful');

var _Stateful2 = _interopRequireDefault(_Stateful);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

(0, _tape2.default)('Todo', function (t) {
  var actual = undefined,
      expected = undefined,
      todo = undefined;
  var testTodo = {
    id: 'test',
    title: 'Test',
    complete: true
  };

  todo = new _Todo2.default(testTodo);

  t.ok(todo instanceof _Stateful2.default, 'should inherit from Stateful');

  actual = todo.getId();
  expected = testTodo.id;
  t.equal(actual, expected, 'with object, should store the id');

  actual = todo.getTitle();
  expected = testTodo.title;
  t.equal(actual, expected, 'with object, should store the title');

  actual = todo.isComplete();
  expected = testTodo.complete;
  t.equal(actual, expected, 'with object, should store the completion');

  todo = new _Todo2.default('Test');

  actual = _typeof(todo.getId());
  expected = 'string';
  t.equal(actual, expected, 'with title, should generate an id');

  actual = todo.getTitle();
  expected = 'Test';
  t.equal(actual, expected, 'with title, should store the title');

  actual = todo.isComplete();
  expected = false;
  t.equal(actual, expected, 'with title, should default to not complete');

  todo = new _Todo2.default('Test');
  todo.toggle();
  actual = todo.isComplete();
  expected = true;
  t.equal(actual, expected, 'toggle should complete uncompleted todos');

  todo.toggle();
  actual = todo.isComplete();
  expected = false;
  t.equal(actual, expected, 'toggle should uncomplete completed todos');

  todo = new _Todo2.default('Test');
  todo.setTitle('New');
  actual = todo.getTitle();
  expected = 'New';
  t.equal(actual, expected, 'setTitle should change the title');

  t.end();
});

//# sourceMappingURL=Todo.spec-compiled.js.map