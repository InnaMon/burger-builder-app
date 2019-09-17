import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {

    // componentWillMount() {
    //     console.log('checkout param', this.props)
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredientsObject = {};
    //     let price = 0;
    //     for (let param of query.entries()) {
    //         console.log('ingredient params', param);
    //         if (param[0] === 'price') {
    //             price = param[1];
    //         } else {
    //             ingredientsObject[param[0]] = +param[1];
    //         }
    //         console.log('ingredient object', ingredientsObject);
    //         this.setState({
    //             ingredients: ingredientsObject,
    //             totalPrice: price
    //         });
    //     }
    // } NO LONGER NEED SINCE REMOVED CODE FROM continuePurchaseHandler() IN BURGERBUILDER COMPONENT  

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
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
                <Route 
                    path={this.props.match.url + '/contact-data'} 
                    component={ContactData}
                    // render={(props) => 
                    //     (<ContactData 
                    //     ingredients={this.state.ingredients} 
                    //     price={this.state.totalPrice}
                    //     {...props} />)} 
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);