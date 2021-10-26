import React from 'react';

import classes from './Layout.module.css';

const Layout = (props) => {
  return (
    <>
      <header>Sidebar, Toolbar, Backdrop</header>
      <main className={classes.MainContent}>{props.children}</main>
    </>
  );
};

export default Layout;
