import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Auth.module.css';
import Button from '../../Components/UI/Button/Button';
import Input from '../../Components/UI/Input/Input';
import * as actions from '../../store/actions/index';
import Spinner from '../../Components/UI/Spinner/Spinner';
import { Redirect } from 'react-router';
import axiosAuth from '../../axios-auth';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

export class Auth extends Component {
  state = {
    authForm: {
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
          isEmail: true,
        },
        isValid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        label: 'Password',
        elementConfig: {
          type: 'password',
          placeholder: 'Your Password',
        },
        value: '',
        validationRules: {
          required: true,
          minLength: 6,
        },
        isValid: false,
        touched: false,
      },
    },
    isSignUp: true,
  };

  checkValidity(rules, value) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }

  formInputChangeHandler = (event, id) => {
    let updatedAuthForm = { ...this.state.authForm };
    updatedAuthForm[id].value = event.target.value;
    if (updatedAuthForm[id].hasOwnProperty('validationRules')) {
      updatedAuthForm[id].touched = true;
      updatedAuthForm[id].isValid = this.checkValidity(
        updatedAuthForm[id].validationRules,
        event.target.value
      );
    }
    this.setState({
      authForm: updatedAuthForm,
    });
  };

  formSubmitHandler = (event) => {
    event.preventDefault();
    const email = this.state.authForm.email.value;
    const password = this.state.authForm.password.value;

    this.props.onAuth(email, password, this.state.isSignUp);
  };

  toggleAuthMode = (event) => {
    event.preventDefault();
    this.setState((prevState) => {
      return {
        isSignUp: !prevState.isSignUp,
      };
    });
  };

  componentDidMount = () => {
    if (!this.props.isBurgerMade && this.props.redirectRoute !== '/') {
      this.props.onRedirectAfterRoute();
    }
  };

  render() {
    let form = <Spinner />;

    if (!this.props.loading) {
      form = (
        <form>
          {Object.keys(this.state.authForm).map((inputKey) => {
            const inputEle = this.state.authForm[inputKey];
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
          <Button btnType='Success' onClick={this.formSubmitHandler}>
            {this.state.isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>

          <Button btnType='Danger' onClick={this.toggleAuthMode}>
            Switch to {this.state.isSignUp ? 'Sign In' : 'Sign Up'}
          </Button>
        </form>
      );
    }

    let error = null;
    if (this.props.error) {
      error = (
        <p style={{ color: 'red', fontSize: '1.2rem' }}>
          {this.props.error.message}
        </p>
      );
    }

    return (
      <>
        {this.props.isAuthenticated && (
          <Redirect to={this.props.redirectRoute} />
        )}
        <div className={classes.AuthForm}>
          <h3>{this.state.isSignUp ? 'Register' : 'Login'}</h3>
          {error}
          {form}
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) => {
      dispatch(actions.auth(email, password, isSignUp));
    },
    onRedirectAfterRoute: () => dispatch(actions.setRedirectAfterAuth('/')),
  };
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    redirectRoute: state.auth.redirectAfterAuth,
    isBurgerMade: state.burger.building,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Auth, axiosAuth));
