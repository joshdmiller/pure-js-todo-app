import angular from 'angular';
import TodoApp from './TodoApp';

function TodoController ( app ) {
  this.todos = [];

  const refresh = () => this.todos = app.getTodos();
  app.subscribe( refresh );

  this.toggleFilter = () => app.toggleFilter();
  this.addTodo = title => app.addTodo( title );
  this.toggleComplete = todo => app.toggleComplete( todo.getId() );
}
TodoController.$inject = [ 'app' ];

angular
  .module( 'todoApp', [] )
  .factory( 'app', TodoApp )
  .controller( 'TodoController', TodoController )
  ;

