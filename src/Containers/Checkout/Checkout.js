import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import CheckoutSummary from '../../Components/Order/CheckoutSummary';
import ContactForm from './ContactForm/ContactForm';
import axios from '../../axios-order';
import * as actionCreator from '../../store/actions/index';
import Spinner from '../../Components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

export class Checkout extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      loading: false,
    };
  }

  onCancelClick = () => {
    this.props.history.goBack();
  };

  onContinueClick = () => {
    this.props.history.push({ pathname: '/checkout/contact-data' });
  };

  onContactFormSubmit = (e, customerData) => {
    e.preventDefault();
    const data = {
      ingredients: { ...this.props.ingredients },
      price: this.props.price,
      customer: customerData,
    };
    this.props.onOrderConfirm(data, this.props.token);
  };

  render() {
    let checkoutSummary = <Redirect to='/burger' />;
    if (this.props.ingredients) {
      checkoutSummary = (
        <div>
          {this.props.purchased && <Redirect to='/' />}
          <CheckoutSummary
            ingredients={this.props.ingredients}
            onCancelClick={this.onCancelClick}
            onContinueClick={this.onContinueClick}
          />
          {this.props.loading ? (
            <Spinner />
          ) : (
            <Route
              path='/checkout/contact-data'
              exact
              render={() => (
                <ContactForm onContactFormSubmit={this.onContactFormSubmit} />
              )}
            />
          )}
        </div>
      );
    }
    return checkoutSummary;
  }
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    ingredients: state.burger.ingredients,
    price: state.burger.price,
    loading: state.order.loading,
    purchased: state.order.purchased,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderConfirm: (orderData, token) =>
      dispatch(actionCreator.purchasePost(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Checkout, axios));
