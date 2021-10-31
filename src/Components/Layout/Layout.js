import React, { Component } from 'react';
import { connect } from 'react-redux';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';

class Layout extends Component {
  state = {
    showSideBar: false,
  };

  toggleSideBar = () => {
    // console.log('toggleSideBAr');
    this.setState((prevState) => {
      return { showSideBar: !prevState.showSideBar };
    });
  };

  render() {
    return (
      <>
        <Toolbar
          isAuthenticated={this.props.isAuthenticated}
          toggleSideBar={this.toggleSideBar}
        />
        <SideDrawer
          toggleSideBar={this.toggleSideBar}
          show={this.state.showSideBar}
          isAuthenticated={this.props.isAuthenticated}
        />
        <main className={classes.MainContent}>{this.props.children}</main>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
