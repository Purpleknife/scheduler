import React from "react";
import "components/Button.scss";
import classNames from "classnames";

const Button = (props) => {
  const buttonClass = classNames('button', { //To optimize the implementation of our custom classes.
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
}
 
export default Button;
