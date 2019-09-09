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
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP CODE'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: ''
            },
            deliverMethod: {
                elementType: 'select',
                elementConfig: {
                    option: [
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

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price
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

    render() {
        let form = (
            <form>
                <Input elementType="..." elementConfig="..." value="..."/>
                <Input inputtype="input" type="email" name="email" placeholder="Your email" />
                <Input inputtype="input" type="text" name="street" placeholder="Street" />
                <Input inputtype="input" type="text" name="postal" placeholder="Postal Code" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
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