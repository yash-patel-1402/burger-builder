import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Layout from './Components/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Containers/Checkout/Checkout';
import Orders from './Containers/Orders/Orders';

const App = () => {
  return (
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
  );
};

export default App;
