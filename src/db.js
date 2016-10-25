import shortid from 'shortid';

export default {
  todos: [
    {
      id: '1',
      title: 'First todo',
      complete: false,
    },
    {
      id: '2',
      title: 'Second todo',
      complete: true,
    },
    {
      id: '3',
      title: 'Third todo',
      complete: false,
    },
  ],

  getTodos () {
    return new Promise( res => res( this.todos ) );
  },

  createTodo ( title ) {
    return new Promise( res => {
      const todo = {
        id: shortid.generate(),
        title,
        complete: false,
      };

      this.todos.push( todo );

      res( todo );
    });
  },

  rmTodo ( id ) {
    return new Promise( res => {
      this.todos = this.todos.filter( t => t.id !== id );

      res();
    });
  },

  changeTodo ( id, todo ) {
    return new Promise( res => {
      let newTodo;

      this.todos = this.todos.map( oldTodo => {
        if ( oldTodo.id !== id ) return oldTodo;

        newTodo = {
          ...oldTodo,
          ...todo,
          id: id,
        };

        return newTodo;
      });

      res( newTodo );
    });
  }
};

