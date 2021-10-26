import React, { Component } from 'react';
import Backdrop from '../Backdrop/Backdrop';

import classes from './Modal.module.css';

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      this.props.children !== nextProps.children
    );
  }

  render() {
    return (
      <>
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show
              ? 'translateY(0) scale(1)'
              : 'translateY(-100vh) scale(0)',
            opacity: this.props.show ? '1' : '0',
          }}
        >
          {this.props.children}
        </div>
        <Backdrop
          onBackdropClick={this.props.onCloseModalClick}
          show={this.props.show}
        />
      </>
    );
  }
}

export default Modal;
