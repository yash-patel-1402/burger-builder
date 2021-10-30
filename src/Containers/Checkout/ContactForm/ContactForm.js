import React, { Component } from 'react';

import Button from '../../../Components/UI/Button/Button';
import classes from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    address: {
      street: '',
      zipCode: '',
    },
    email: '',
  };

  render() {
    return (
      <div className={classes.ContactForm}>
        <form>
          <input type='text' placeholder='Your name' />
          <input type='text' placeholder='Your email' />
          <input type='text' placeholder='Your street' />
          <input type='text' placeholder='Your zipcode' />
          <Button btnType='Success' onClick={this.props.onContactFormSubmit}>
            Order
          </Button>
        </form>
      </div>
    );
  }
}

export default ContactForm;
