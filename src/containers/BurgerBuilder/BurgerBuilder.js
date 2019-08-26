import React, { Component } from 'react';
import Aux from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorBoundary from '../../hoc/ErrorBoundary/ErrorBoundary';

const INGREDIENT_PRICES = {
    bacon: 0.70,
    cheese: 0.40,
    meat: 1.30,
    salad: 0.50
    
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        ordering: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        fetch('https://burger-builder-app-ca613.firebaseio.com/ingredients.json')
        .then(response=> response.json())
        .then(object => {
            console.log('ingredients object:', object);
            this.setState({
                ingredients: object,
                purchaseable: true
            })
        })
        .catch(error => {
            console.log("Ingredients error found:", error)
            this.setState({error: true})
        })
        // .catch(error => {console.log('ingredients error found:', error)})

    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log('getDerivedStateFromProps:', nextProps, prevState);
        if (prevState.ingredients !== nextProps.ingredients) {
            return {

            }
        }
        return null;
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
                    ordering: false,
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

        fetchWithBaseUrl('/orders')
        // ErrorBoundary will not work since we are catch and handling the error here. 
        // TO DO: establish global error handling inside to display a modal with error message if a fetch error occurs; use Lesson 199
    }

    render () {
        const disabledInfo = {...this.state.ingredients};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0; //return true is 0 or less, disabledInfo[key] is the property (value of eack key-value pair)
        }

        const priceCopy = {...INGREDIENT_PRICES}
        let orderSummary = null;
        let burger = (this.state.error) ? <p>Ingredients can't be loaded</p> : <Spinner/>;
        
        if (this.state.ingredients) {
            burger = 
                <Aux>
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
            
            orderSummary = 
            <OrderSummary   
                ingredients={this.state.ingredients}
                cancelOrder={this.cancelPurchaseHandler}
                continueOrder={this.continuePurchaseHandler}
                price={this.state.totalPrice}
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

export default BurgerBuilder;

//TO DO: make total price more manual to that when hardcode any ingredients values they instantly update the total price
// use updating lifecycle hooks 