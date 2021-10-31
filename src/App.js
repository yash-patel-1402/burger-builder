import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose, combineReducers } from 'redux';

import burgerReducer from './store/reducers/burger';
import orderReducer from './store/reducers/order';
import Layout from './Components/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Containers/Checkout/Checkout';
import Orders from './Containers/Orders/Orders';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({ burger: burgerReducer, order: orderReducer }),
  composeEnhancers(applyMiddleware(thunk))
);

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path='/burger' exact component={BurgerBuilder} />
            <Route path='/orders' exact component={Orders} />
            <Route path='/checkout' component={Checkout} />
            <Redirect from='/' to='/burger' />
          </Switch>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
