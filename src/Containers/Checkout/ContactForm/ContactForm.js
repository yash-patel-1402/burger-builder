import React, { Component } from 'react';

import Button from '../../../Components/UI/Button/Button';
import Input from '../../../Components/UI/Input/Input';
import classes from './ContactForm.module.css';
import { checkValidity } from '../../../shared/utility';

class ContactForm extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        label: 'Name',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name',
        },
        value: '',
        validationRules: {
          required: true,
        },
        isValid: false,
        touched: false,
      },

      street: {
        elementType: 'input',
        label: 'Street',
        elementConfig: {
          type: 'text',
          placeholder: 'Your street',
        },
        value: '',
        validationRules: {
          required: true,
        },
        isValid: false,
        touched: false,
      },
      zipCode: {
        elementType: 'input',
        label: 'Zipcode',
        elementConfig: {
          type: 'text',
          placeholder: 'Your zipcode',
        },
        value: '',
        validationRules: {
          required: true,
          minLength: 5,
          maxLength: 10,
        },
        isValid: false,
        touched: false,
      },

      email: {
        elementType: 'input',
        label: 'Email',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-mail',
        },
        value: '',
        validationRules: {
          required: true,
        },
        isValid: false,
        touched: false,
      },
      delivery: {
        label: 'Delivery method',
        elementType: 'select',
        elementConfig: {
          options: [
            { label: 'Fastest', value: 'fastest' },
            { label: 'Normal', value: 'normal' },
          ],
        },
        value: 'fastest',
      },
    },
  };

  formInputChangeHandler = (event, id) => {
    let newOrderForm = { ...this.state.orderForm };
    newOrderForm[id].value = event.target.value;
    if (newOrderForm[id].hasOwnProperty('validationRules')) {
      newOrderForm[id].touched = true;
      newOrderForm[id].isValid = checkValidity(
        newOrderForm[id].validationRules,
        event.target.value
      );
      // console.log(newOrderForm[id].isValid);
    }
    // console.log(this.checkFormValidity(newOrderForm));
    this.setState({
      orderForm: newOrderForm,
      isFormValid: this.checkFormValidity(newOrderForm),
    });
  };

  formSubmitHandler = (event) => {
    let data = {};
    for (let inputName in this.state.orderForm) {
      data[inputName] = this.state.orderForm[inputName].value;
    }

    this.props.onContactFormSubmit(event, data);
  };

  checkFormValidity(updatedFormState) {
    for (let inputKey in updatedFormState) {
      let input = updatedFormState[inputKey];
      if (input.hasOwnProperty('isValid') && !input.isValid) {
        return false;
      }
    }
    return true;
  }

  render() {
    return (
      <div className={classes.ContactForm}>
        <form>
          {Object.keys(this.state.orderForm).map((inputKey) => {
            const inputEle = this.state.orderForm[inputKey];
            return (
              <Input
                key={inputKey}
                label={inputEle.label}
                value={inputEle.value}
                config={inputEle.elementConfig}
                inputtype={inputEle.elementType}
                onChange={(event) =>
                  this.formInputChangeHandler(event, inputKey)
                }
                shouldValidate={inputEle.hasOwnProperty('validationRules')}
                touched={inputEle.touched}
                isInvalid={!inputEle.isValid}
              />
            );
          })}
          <Button
            btnType='Success'
            disabled={!this.state.isFormValid}
            onClick={this.formSubmitHandler}
          >
            Order
          </Button>
        </form>
      </div>
    );
  }
}

export default ContactForm;
