import React from 'react';
import styles from './Button.module.css';

const button = (props) => (
    <button
      disabled={props.disabled}
      className={[styles.Button, styles[props.btnType]].join(' ')}
      onClick={props.clicked}>
        {props.children}
    </button>
);

export default button;

// className has to take in a string
// in order to pass multiple values into className here and make it dynamic, are passing multiple values in an array. 
// styles.Button and style[props.btnType] are both using property accessors (dot or bracket notation)
// btnType will be an outside value we can set and pass into this component
// we are then using the join() method to make the className value a proper string in order to be utilized 