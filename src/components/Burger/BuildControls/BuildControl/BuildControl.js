import React from 'react';
import styles from './BuildControl.module.css';

const buildControl = (props) => (
    <div className={styles.BuildControl}>
      <div className={styles.Label}>{props.label}</div>
      <button className={styles.More}>Add</button>
      <button className={styles.Less}>Remove</button>
    </div>
);

export default buildControl;