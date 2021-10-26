import React from 'react';
import Backdrop from '../Backdrop/Backdrop';

import classes from './Modal.module.css';

const Modal = (props) => {
  return (
    <>
      <div
        className={classes.Modal}
        style={{
          transform: props.show
            ? 'translateY(0) scale(1)'
            : 'translateY(-100vh) scale(0)',
          opacity: props.show ? '1' : '0',
        }}
      >
        {props.children}
      </div>
      <Backdrop onBackdropClick={props.onCloseModalClick} show={props.show} />
    </>
  );
};

export default Modal;
