import React, { Component, Suspense } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './Components/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import * as actions from './store/actions/index';
import Auth from './Containers/Auth/Auth';
import Logout from './Containers/Auth/Logout';
import Spinner from './Components/UI/Spinner/Spinner';

const Orders = React.lazy(() => import('./Containers/Orders/Orders'));
const Checkout = React.lazy(() => import('./Containers/Checkout/Checkout'));

class App extends Component {
  state = {
    autoSignUpDone: false,
  };

  componentDidMount = () => {
    this.props.onAutoAuth();
    this.setState({ autoSignUpDone: true });
  };

  render() {
    let routes = null;

    if (this.state.autoSignUpDone && !this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/burger' exact component={BurgerBuilder} />
          <Route path='/auth' exact component={Auth} />
          <Redirect from='/' exact to='/burger' />
          <Redirect to='/burger' />
        </Switch>
      );
    }

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/burger' exact component={BurgerBuilder} />
          <Route
            path='/orders'
            exact
            render={(props) => {
              return (
                <Suspense fallback={<Spinner />}>
                  <Orders {...props} />
                </Suspense>
              );
            }}
          />
          <Route
            path='/checkout'
            render={(props) => {
              return (
                <Suspense fallback={<Spinner />}>
                  <Checkout {...props} />
                </Suspense>
              );
            }}
          />
          <Route path='/auth' exact component={Auth} />
          <Route path='/logout' component={Logout} />
          <Redirect from='/' to='/burger' />
        </Switch>
      );
    }
    return <Layout>{routes}</Layout>;
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAutoAuth: () => dispatch(actions.autoAuth()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
