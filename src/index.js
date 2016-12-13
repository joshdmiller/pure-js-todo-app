// TODO
//   x prototypes (delegate)
//   x constructor functions
//   x new keyword
//   - es2015 sugar: class keyword


export const todoPrototype = {
  title: 'hello',
  complete: false,

  getTitle () {
    return this.title;
  },

  setTitle ( newTitle ) {
    this.title = newTitle;
  },
};

todoPrototype.toggleComplete = function () {
  this.toggleComplete = ! this.toggleComplete;
};

export const Todo = function ( title ) {
  // const todo = Object.create( todoPrototype );

  this.title = title;

  // return todo;
}

Todo.prototype = todoPrototype;

export class TodoClass {
  constructor ( title ) {
    this.title = title;
    this.complete = false;
  }

  getTitle () {
    return this.title;
  }

  setTitle ( newTitle ) {
    this.title = newTitle;
  }
}

