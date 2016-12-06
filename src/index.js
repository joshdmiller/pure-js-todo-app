import angular from 'angular';
import TodoApp from './TodoApp';
import Todo from './Todo';

class AppController {
  constructor ( $timeout, app ) {
    this.app = app;
    this.$to = $timeout;
    app.subscribe( ::this._refresh );
    this._refresh();
  }

  _refresh () {
    this.$to( () => {
      this.state = this.app.getState();

      if ( this.state.filter ) {
        this.state.todos = this.state.todos.filter( t => ! t.isComplete() );
      }
    });
  }

  toggleFilter () {
    this.app.toggleFilter();
  }

  toggleTodo ( todo ) {
    this.app.changeTodo( todo.getId(), { complete: ! todo.isComplete() })
  }

  removeTodo ( todo ) {
    this.app.rmTodo( todo.getId() );
  }

  addTodo () {
    this.app.addTodo( this.newTodoText );
    this.newTodoText = '';
  }
}

angular.module( 'TodoApp', [] )
  .service( 'app', TodoApp )
  .controller( 'AppController', AppController )
  ;

