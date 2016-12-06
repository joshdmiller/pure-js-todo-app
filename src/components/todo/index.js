import React from 'react';

export default ({
  todo,
  remove,
  toggle,
}) => (
  <li
    key={todo.getId()}
    className={todo.isComplete() ? 'todo--complete' : ''}
  >
    <span
      onClick={() => toggle( todo )}
    >
      { todo.getTitle() }
    </span>
    <span
      className="todo__remove"
      onClick={() => remove( todo )}
    >
      x
    </span>
  </li>
);

