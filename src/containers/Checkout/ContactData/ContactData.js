import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import styles from './ContactData.module.css'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log('contact data props', this.props)

        this.setState({ loading: true });

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Inna Monjoseph',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '55379',
                    country: 'USA'
                },
                email: 'test@test.com'
            },
            deliverMethod: 'fastest'
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
                <input type="text" name="name" placeholder="Your name" />
                <input type="email" name="email" placeholder="Your email" />
                <input type="text" name="street" placeholder="Street" />
                <input type="text" name="postal" placeholder="Postal Code" />
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