import React from 'react';
import styles from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses = [styles.inputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(styles.Invalid)
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}/>
            break;
         case ('textarea'):
            inputElement = <textarea 
                className={inputClasses} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}
                />
            break;
        case ('select'):
            inputElement = (
                <select 
                    className={inputClasses} 
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input 
                className={styles.inputElement} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}/>
    }

    let validationError = null;
    if (props.invalid && props.touched) {
        validationError = <p className={styles.ValidationError}>Please enter a valid {props.valueType}!</p>;
    }

    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
};

export default input;