import React from 'react';
import classes from './Navbar.module.css'
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className={classes.nav}>
        <img src="https://img.freepik.com/premium-vector/online-shopping-logo-design-vector-template_712837-74.jpg" width={70} height={50} alt="Logo" />
      <Link to="/" className={classes.siteTitle}>Main page</Link>
      <Link to="/order-list" className={classes.siteTitle}>Order List</Link>
      <Link to="/favorit-list" className={classes.siteTitle}>Favorite List</Link>
      <Link to="/login" className={classes.siteTitle}>Login</Link>
      <Link to="/register" className={classes.siteTitle}>Sign Up</Link>
      <Link to="/logout" className={classes.siteTitle}>Logout</Link>
      
    </nav>
  );
}

export default Navbar;