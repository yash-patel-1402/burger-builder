import React from 'react';
import Logo from '../../Logo/Logo';
import MenuButton from '../../UI/MenuButton/MenuButton';
import NavigationItems from '../NavigationItems/NavigationItems';

import classes from './Toolbar.module.css';

const Toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <div className={classes.MobileOnly}>
        <MenuButton onClick={props.toggleSideBar} />
      </div>
      <div className={classes.Logo}>
        <Logo />
      </div>
      <div className={classes.DesktopOnly}>
        <NavigationItems />
      </div>
    </header>
  );
};

export default Toolbar;
