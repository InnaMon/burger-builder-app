import React from 'react';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import styles from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxillary';

const sideDrawer = (props) => {
  let attachedStyles = [styles.SideDrawer, styles.Close];

  if (props.open) {
    attachedStyles = [styles.SideDrawer, styles.Open];
  }

    return (
      <Aux>

        <Backdrop show={props.open} clicked={props.closed}/>

        <div className={attachedStyles.join(' ')}>
          <div className={styles.Logo}>
            <Logo />
          </div>
          <nav>
            <NavItems />
          </nav>
        </div>

      </Aux>
    );
};

export default sideDrawer;