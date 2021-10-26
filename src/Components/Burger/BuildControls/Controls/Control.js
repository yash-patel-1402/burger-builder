import React from 'react';

import classes from './Control.module.css';
import PropTypes from 'prop-types';

const Control = (props) => {
  return (
    <div className={classes.Control}>
      <div className={classes.Label}>{props.label}</div>
      <button className={classes.Less} onClick={props.add}>
        Add
      </button>
      <div className={classes.Count}>{props.count}</div>
      <button
        className={classes.More}
        disabled={props.disabled}
        onClick={props.remove}
      >
        Remove
      </button>
    </div>
  );
};

Control.propTypes = {
  label: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};

export default Control;
