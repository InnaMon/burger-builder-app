import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorBoundary from '../../hoc/ErrorBoundary/ErrorBoundary';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        ordering: false, //local UI state
        loading: false, //local UI state
        error: false //local UI state
    }

    // componentDidMount () {
    //     console.log('react-routing props', this.props)
    //     fetch('https://burger-builder-app-ca613.firebaseio.com/ingredients.json')
    //     .then(response=> response.json())
    //     .then(object => {
    //         console.log('ingredients object:', object);
    //         this.setState({
    //             ingredients: object,
    //             purchaseable: true
    //         })
    //     })
    //     .catch(error => {
    //         console.log("Ingredients error found:", error)
    //         this.setState({error: true})
    //     })
    // }

    updatePurchaseState (ingredients) {
        // const sum = Object.keys(ingredients)
        //   .map(igKey => {
        //       return ingredients[igKey]
        //   })
        //   .reduce((accumulator, currentValue) => {
        //       return accumulator + currentValue;
        //   }, 0)
        //   this.setState({purchaseable: sum > 0})

        const sum = Object.values(ingredients)
            .reduce((accumulator, currentValue) => {
                return accumulator + currentValue;
                }, 0);
        return sum > 0;
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({
    //         totalPrice: newPrice, 
    //         ingredients: updatedIngredients
    //     });
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount <= 0) {
    //         return;
    //     } //return nothing is ingredient[type] is at 0
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceSubtraction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceSubtraction;
    //     this.setState({
    //         totalPrice: newPrice, 
    //         ingredients: updatedIngredients
    //     });
    //     this.updatePurchaseState(updatedIngredients);
    // }

    orderHandler = () => {
        this.setState({ordering: true})
    }

    cancelPurchaseHandler = () => {
        this.setState({ordering: false})
    }

    continuePurchaseHandler = () => {

        // ErrorBoundary will not work since we are catch and handling the error here. 
        // TO DO: establish global error handling inside to display a modal with error message if a fetch error occurs; use Lesson 199

        // const queryParam = [];
        // for (let ingredient in this.state.ingredients) {
        //     queryParam.push(encodeURIComponent(ingredient) + '=' + encodeURIComponent(this.state.ingredients[ingredient]));
        // }
        // queryParam.push('price='+this.prop.price);
        
        // const queryString = queryParam.join('&');

        this.props.history.push('/checkout');
    }

    render () {
        const disabledInfo = {...this.props.ings};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0; //return true is 0 or less, disabledInfo[key] is the property (value of eack key-value pair)
        }

        const priceCopy = this.props.price
        let orderSummary = null;
        let burger = (this.state.error) ? <p>Ingredients can't be loaded</p> : <Spinner/>;
        
        if (this.props.ings) {
            burger = 
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        displayPrice={priceCopy}
                        purchaseable={this.updatePurchaseState(this.props.ings)}
                        ordering={this.orderHandler}
                    />
                </Aux>
            
            orderSummary = 
            <OrderSummary   
                ingredients={this.props.ings}
                cancelOrder={this.cancelPurchaseHandler}
                continueOrder={this.continuePurchaseHandler}
                price={this.props.price}
            />
        }

        if (this.state.loading) {
            orderSummary = <Spinner/>;
        } 

        return (
            <ErrorBoundary>
            <Aux>
                <Modal show={this.state.ordering} modalClosed={this.cancelPurchaseHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
            </ErrorBoundary>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);

//TO DO: make total price more manual to that when hardcode any ingredients values they instantly update the total price
// use updating lifecycle hooks 