import React from 'react';

import classes from './Backdrop.module.css';

const Backdrop = (props) => {
  if (props.show) {
    return (
      <div onClick={props.onBackdropClick} className={classes.Backdrop}></div>
    );
  }
  return null;
};

export default Backdrop;
