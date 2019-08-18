import React, { Component } from 'react';
import Aux from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.50,
    cheese: 0.40,
    meat: 1.30,
    bacon: 0.70
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable: false,
        ordering: false
    }

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
        this.setState({purchaseable: sum > 0})
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        console.log('priceAddition', priceAddition)
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: newPrice, 
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        } //return nothing is ingredient[type] is at 0
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceSubtraction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceSubtraction;
        this.setState({
            totalPrice: newPrice, 
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    }

    orderHandler = () => {
        this.setState({ordering: true})
    }

    cancelPurchaseHandler = () => {
        this.setState({ordering: false})
    }

    continuePurchaseHandler = () => {
        alert('You continued!');
    }

    render () {
        const disabledInfo = {...this.state.ingredients};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0; //return true is 0 or less, disabledInfo[key] is the property (value of eack key-value pair)
        }

        const priceCopy = {...INGREDIENT_PRICES}
        console.log('priceCopy', priceCopy);

        return (
            <Aux>
                <Modal show={this.state.ordering} modalClosed={this.cancelPurchaseHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        cancelOrder={this.cancelPurchaseHandler}
                        continueOrder={this.continuePurchaseHandler}
                        price={this.state.totalPrice}/>
                </Modal>
    
                <Burger ingredients={this.state.ingredients}/>
                
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    displayPrice={priceCopy}
                    purchaseable={this.state.purchaseable}
                    ordering={this.orderHandler}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;