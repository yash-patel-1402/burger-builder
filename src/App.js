import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducer from './store/reducer';
import Layout from './Components/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Containers/Checkout/Checkout';
import Orders from './Containers/Orders/Orders';

const store = createStore(reducer);

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
