import React from 'react';
import styles from './NavItems.module.css';
import NavItem from './NavItem/NavItem';

const navItems = () => (
    <ul className={styles.NavItems}>
      <NavItem link="/">Burger Builder</NavItem>
      <NavItem link="/orders">Orders</NavItem>
      <NavItem link="/auth">Log In</NavItem>
    </ul>
)

export default navItems;