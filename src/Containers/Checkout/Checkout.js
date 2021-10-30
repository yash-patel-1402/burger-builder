import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../Components/Order/CheckoutSummary';
import ContactForm from './ContactForm/ContactForm';
import axios from '../../axios-order';
import Spinner from '../../Components/UI/Spinner/Spinner';

export class Checkout extends Component {
  constructor(props) {
    super(props);
    const queryParams = new URLSearchParams(this.props.location.search);
    const initialIngredients = {};
    let price = 0;
    for (let param of queryParams.entries()) {
      if (param[0] === 'price') {
        price = parseFloat(param[1]);
        continue;
      }
      initialIngredients[param[0]] = parseInt(param[1]);
    }
    // console.log(initialIngredients);
    // console.log(this.props);
    this.state = {
      ingredients: { ...initialIngredients },
      price: price,
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
      ingredients: { ...this.state.ingredients },
      price: this.state.price,
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
          ingredients={this.state.ingredients}
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

export default Checkout;
