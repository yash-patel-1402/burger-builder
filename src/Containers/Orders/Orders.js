import React, { Component } from 'react';

import axios from '../../axios-order';
import Order from '../../Components/Order/Order';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

export class Orders extends Component {
  state = {
    orders: null,
    loading: true,
    error: false,
  };

  componentDidMount = () => {
    this.setState({ loading: true });
    axios
      .get('/orders.json')
      .then((response) => {
        this.setState({ orders: response.data });
        this.setState({ loading: false });
      })
      .catch((error) => {
        this.setState({ loading: false, error: true });
      });
  };

  render() {
    let orders = <Spinner />;
    if (!this.state.loading) {
      if (this.state.error) {
        orders = (
          <p style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}>
            Something gone wrong!
          </p>
        );
      } else {
        orders = Object.keys(this.state.orders).map((orderKey) => {
          const order = this.state.orders[orderKey];
          return (
            <Order
              key={orderKey}
              ingredients={order.ingredients}
              price={order.price}
            />
          );
        });
      }
    }
    return <div>{orders}</div>;
  }
}

export default withErrorHandler(Orders, axios);
