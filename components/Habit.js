import React from 'react';

const Habit = ({ onClick, children, ...other }) => {
  return (
    <li {...other}>
      {children}
      <button onClick={onClick}>Completed Today!</button>
    </li>
  );
};

export default Habit;
