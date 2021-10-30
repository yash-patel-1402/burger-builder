import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../Components/Order/CheckoutSummary';
import ContactForm from './ContactForm/ContactForm';
import axios from '../../axios-order';
import Spinner from '../../Components/UI/Spinner/Spinner';
import { connect } from 'react-redux';

export class Checkout extends Component {
  constructor(props) {
    super(props);
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
    // console.log(this.state);
    // console.log(data);
    this.setState({ loading: true });
    axios
      .post('/orders.json', data)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push('/burger');
        // console.log(response);
      })
      .catch((error) => {
        this.setState({ loading: false });
        // console.log(error);
      });
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ingredients}
          onCancelClick={this.onCancelClick}
          onContinueClick={this.onContinueClick}
        />
        {this.state.loading ? (
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
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    price: state.price,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
