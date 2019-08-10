import React from 'react';
import Aux from '../../../hoc/Auxillary';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (<li style={{margin: '0 150px 0 150px',}} key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span>
                : {props.ingredients[igKey]}
            </li>);
        });

    return (
        <Aux>
            <div style={{textAlign: 'center'}}>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                {ingredientSummary}
                </ul>
                <p>Continue to Checkout?</p>
            </div>
        </Aux>
    )
}

export default orderSummary;