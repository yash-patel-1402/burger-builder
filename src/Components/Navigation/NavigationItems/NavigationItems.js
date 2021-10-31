import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link='/burger'>Burger</NavigationItem>
      {props.isAuthenticated && (
        <NavigationItem link='/orders'>Order</NavigationItem>
      )}
      {props.isAuthenticated ? (
        <NavigationItem link='/logout'>Log out</NavigationItem>
      ) : (
        <NavigationItem link='/auth'>Log In</NavigationItem>
      )}
    </ul>
  );
};

export default NavigationItems;
