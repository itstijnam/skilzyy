import React from 'react';
import './uiStyle/Button.scss';

function Button({ name, onClick }) {
  return (
    <button className='Button' onClick={onClick}>
      {name}
    </button>
  );
}

export default Button;
