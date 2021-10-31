import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './Components/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Containers/Checkout/Checkout';
import Orders from './Containers/Orders/Orders';
import * as actions from './store/actions/index';
import Auth from './Containers/Auth/Auth';
import Logout from './Containers/Auth/Logout';

class App extends Component {
  componentDidMount = () => {
    this.props.onAutoAuth();
  };

  render() {
    return (
      <Layout>
        <Switch>
          <Route path='/burger' exact component={BurgerBuilder} />
          <Route path='/orders' exact component={Orders} />
          <Route path='/auth' exact component={Auth} />
          <Route path='/checkout' component={Checkout} />
          <Route path='/logout' component={Logout} />
          <Redirect from='/' to='/burger' />
        </Switch>
      </Layout>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAutoAuth: () => dispatch(actions.autoAuth()),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(App));
