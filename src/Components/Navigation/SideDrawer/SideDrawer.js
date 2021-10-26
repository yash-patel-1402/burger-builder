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
      <div className={sidebarClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
      <Backdrop show={props.show} onBackdropClick={props.toggleSideBar} />
    </>
  );
};

export default SideDrawer;
