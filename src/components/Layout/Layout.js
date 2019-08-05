import React from 'react';
import Aux from '../../hoc/Auxillary';
import styles from './Layout.module.css';

const layout = (props) => (
    <Aux>
        <div>
          Toolbar, SideDrawer, Dackdrop
        </div>
        <main className={styles.Content}>
          {props.children}
        </main>
    </Aux>
);

export default layout;