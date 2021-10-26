import React, { Component } from 'react';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';

class Layout extends Component {
  state = {
    showSideBar: false,
  };

  toggleSideBar = () => {
    console.log('toggleSideBAr');
    this.setState((prevState) => {
      return { showSideBar: !prevState.showSideBar };
    });
  };

  render() {
    return (
      <>
        <Toolbar toggleSideBar={this.toggleSideBar} />
        <SideDrawer
          toggleSideBar={this.toggleSideBar}
          show={this.state.showSideBar}
        />
        <main className={classes.MainContent}>{this.props.children}</main>
      </>
    );
  }
}

export default Layout;
