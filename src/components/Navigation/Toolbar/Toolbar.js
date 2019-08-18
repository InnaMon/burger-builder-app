import React from 'react';
import styles from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';

const toolbar = (props) => (
    <header className={styles.Toolbar}>

        <div 
          className={styles.Menu} 
          onClick={props.clicked}
        >MENU</div>

        <div className={styles.Logo}>
          <Logo />
        </div>

        <nav className={styles.DesktopOnly}>
            <NavItems />
        </nav>
        
    </header>
);

export default toolbar;