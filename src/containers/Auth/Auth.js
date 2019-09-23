import React, { Component } from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import styles from './Auth.module.css';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        }
    }

    checkValidity(value, validation) {
        let isValid = [];
 
        if (validation.required) {
            isValid.push(value.trim() !== '');
        }
    
        if (validation.minLength) {
            isValid.push(value.length >= validation.minLength);
        }
    
        // if (validation.maxLength) {
        //     isValid.push(value.length <= validation.maxLength);
        // }
    
        console.log('isValid array', isValid);
        return isValid.indexOf(false) > -1 ? false : true;
        //while searching if false exists inside array, if false does NOT exist, will return -1
        //if false DOES exist will return a vallue > -1
        //if if false exists, return false AND if false does not exist return true 
        }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }; 
        this.setState({controls: updatedControls});
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            console.log('order key:', key, 'order value:', this.state.controls[key]);
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]

            });
            console.log('formElementsArray', formElementsArray);
        }

        const form = formElementsArray.map(formElement => (
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig} 
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                valueType={formElement.id}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
        ));
        return (
            <div className={styles.Auth}>
                <form>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
            </div>
        );
    }
}

export default Auth; 