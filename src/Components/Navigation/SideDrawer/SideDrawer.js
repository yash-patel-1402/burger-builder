import React from 'react';

import classes from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

const SideDrawer = (props) => {
  const sidebarClasses = [
    classes.SideDrawer,
    props.show ? classes.Open : classes.Close,
  ];
  return (
    <>
      <div className={sidebarClasses.join(' ')} onClick={props.toggleSideBar}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuthenticated} />
        </nav>
      </div>
      <Backdrop show={props.show} onBackdropClick={props.toggleSideBar} />
    </>
  );
};

export default SideDrawer;
