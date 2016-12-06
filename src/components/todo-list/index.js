import React from 'react';
import Todo from '../todo';

export default ({
  todos,
  toggle,
  remove,
}) => {
  const todoEls = todos.map( todo => <Todo
    key={todo.getId()}
    todo={todo}
    toggle={toggle}
    remove={remove}
  /> );

  return (
    <ul>
      { todoEls }
    </ul>
  );
};
