import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import styles from './ContactData.module.css'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                }
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP CODE'
                },
                value: '',
                validation: {
                    required: true, 
                    minLength: 5,
                    maxLength: 5
                },
                valid: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            deliverMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: ''
            }
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log('contact data props', this.props)

        this.setState({ loading: true });

        const formData = {}
        for (let formElId in this.state.orderForm) {
            formData[formElId] = this.state.orderForm[formElId].value; //adds the formElId to the formData object and has the key equal to state formElId value
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderDate: formData
        }

        const genFetchWithBaseUrl = (baseUrl) => {
            return (restOfUrl) => fetch((baseUrl + restOfUrl), {
                method: 'POST',
                body: JSON.stringify(order),
                mode: 'no-cors',
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(response => {
                console.log('response', response);
                this.setState({ 
                    loading: false
                 });
                 this.props.history.push('/')
            })
            .catch(error => {
                console.log('Error Found!', error);
                this.setState({ 
                    loading: false
                });
            })
        }

        const fetchWithBaseUrl = genFetchWithBaseUrl('https://burger-builder-app-ca613.firebaseio.com/');

        fetchWithBaseUrl('/orders.json')
        // NO LONGER WANT TO STORE CODE IN FIRBEASE, INSTEAD GO TO CHECKOUT PAGE!!!

        // ErrorBoundary will not work since we are catch and handling the error here. 
        // TO DO: establish global error handling inside to display a modal with error message if a fetch error occurs; use Lesson 199
    }

    checkValidity(value, validation) {
        // if (validation.required && value.trim() == '') return false; 
        // //return false if validtaion is true AND value is equal to an empty string 
        // if (validation.minLength && value.length > validation.minLength) return false;
        // if (validation.maxLength && value.length < validation.maxLength) return false;

        // return true;

        let isValid = [];
 
        if (validation.required) {
            isValid.push(value.trim() !== '');
        }
    
        if (validation.minLength) {
            isValid.push(value.length >= validation.minLength);
        }
    
        if (validation.maxLength) {
            isValid.push(value.length <= validation.maxLength);
        }
    
        console.log('isValid array', isValid);
        return isValid.indexOf(false) > -1 ? false : true;
        //while searching if false exists inside array, if false does NOT exist, will return -1
        //if false DOES exist will return a vallue > -1
        //if if false exists, return false AND if false does not exist return true 
        }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {...this.state.orderForm}; //shallow clone of orderForm (state object)
        const updatedFormElement = {...updatedOrderForm[inputIdentifier]}; //deep clone of selected key in orderForm
        updatedFormElement.value = event.target.value; //assign event to the selected key value
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation); //updated valid property by passing the value and a true statement to handler
        updatedOrderForm[inputIdentifier] =  updatedFormElement; //selected key equal to the updatedFormElement which now holds the event.target.value
        console.log('updatedFormElement', updatedFormElement);
        this.setState({orderForm: updatedOrderForm}); //orderForm (state object) updated to copy, immutably updated any affected form elements
        
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            console.log('order key:', key, 'order value:', this.state.orderForm[key]);
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]

            });
            console.log('formElementsArray', formElementsArray);
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                <Input elementType="..." elementConfig="..." value="..."/>

                {formElementsArray.map((formElement) => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig} 
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                ))}

                <Button btnType="Success" >ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={styles.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;