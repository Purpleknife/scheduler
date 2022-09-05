import React from "react"; //Optional since we have a newer version of React (above v17).
import classNames from "classnames"; //To optimize the implementation of our custom classes.

import "components/Button.scss";

const Button = (props) => {
  const buttonClass = classNames('button', {
    'button--confirm': props.confirm,
    'button--danger': props.danger
  });

  return ( 
    <button 
      onClick={props.onClick} 
      disabled={props.disabled} 
      className={buttonClass}>
      {props.children}
    </button>
  );
};
 
export default Button;
