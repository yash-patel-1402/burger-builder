import React from 'react';

import classes from './Input.module.css';

const Input = (props) => {
  let inputElement = null;
  let inputElementClasses = [classes.Input];

  if (props.shouldValidate && props.touched && props.isInvalid) {
    inputElementClasses.push(classes.Invalid);
  }

  switch (props.inputtype) {
    case 'input':
      inputElement = (
        <input
          className={inputElementClasses.join(' ')}
          value={props.value}
          {...props.config}
          onChange={props.onChange}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={classes.Input}
          value={props.value}
          {...props.config}
          onChange={props.onChange}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={classes.Input}
          value={props.value}
          onChange={props.onChange}
        >
          {props.config.options.map((option, index) => {
            return (
              <option
                key={`${option.value + index.toString()}`}
                value={option.value}
              >
                {option.label}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      inputElement = <input className={classes.Input} {...props.config} />;
  }

  return (
    <div className={classes.InputDiv}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
