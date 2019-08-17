import React from 'react';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import styles from './SideDrawer.module.css';

const sideDrawer = (props) => {
    return (
        <div className={styles.SideDrawer}>
          <div className={styles.Logo}>
            <Logo />
          </div>
          <nav>
            <NavItems />
          </nav>
        </div>
    );
};

export default sideDrawer;