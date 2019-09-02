import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    }

    componentDidMount() {
        console.log('checkout param', this.props)
        const query = new URLSearchParams(this.props.location.search);
        const ingredientsObject = {};
        for (let param of query.entries()) {
            console.log('ingredient params', param);
            ingredientsObject[param[0]] = +param[1];
            console.log('ingredient object', ingredientsObject);
            this.setState({ingredients: ingredientsObject});
        }
    }

    checkoutCancelledHandler = () => {
        console.log('checkout router props', this.props);
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
                <Route 
                    path={this.props.match.url + '/contact-data'} 
                    component={ContactData} 
                />
            </div>
        )
    }
}

export default Checkout;