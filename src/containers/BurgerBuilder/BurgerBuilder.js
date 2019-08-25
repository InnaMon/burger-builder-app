import React, { Component } from 'react';
import Aux from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorBoundary from '../../hoc/ErrorBoundary/ErrorBoundary';

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
        ordering: false,
        loading: false
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
        this.setState({ loading: true });

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
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
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            // .then(response => response.json())
            .then(response => {
                console.log('response', response);
                this.setState({ 
                    loading: false,
                    ordering: false
                 });
            })
            .catch(error => {
                console.log('Error Found!', error);
                this.setState({ 
                    loading: false,
                    ordering: false
                });
            })
        }

        const fetchWithBaseUrl = genFetchWithBaseUrl('https://burger-builder-app-ca613.firebaseio.com/');

        fetchWithBaseUrl('/orders.json')
        // ErrorBoundary will not work since we are catch and handling the error here. 
        // TO DO: establish global error handling inside to display a modal with error message if a fetch error occurs 
    }

    render () {
        const disabledInfo = {...this.state.ingredients};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0; //return true is 0 or less, disabledInfo[key] is the property (value of eack key-value pair)
        }

        const priceCopy = {...INGREDIENT_PRICES}

        let orderSummary =  
            <OrderSummary 
                ingredients={this.state.ingredients}
                cancelOrder={this.cancelPurchaseHandler}
                continueOrder={this.continuePurchaseHandler}
                price={this.state.totalPrice}/>


        if (this.state.loading) {
            orderSummary = <Spinner/>;
        } 

        return (
            <Aux>
                <Modal show={this.state.ordering} modalClosed={this.cancelPurchaseHandler}>
                  <ErrorBoundary>
                    {orderSummary}
                  </ErrorBoundary>
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