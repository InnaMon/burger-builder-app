import React from 'react';
import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    // takes in props.ingredients object and extracts all of the keys into an array => [salad, bacon, cheese, meat]
    // ingKey = each ingredient key within the ingredients object OR each index item of new array
    // perform function on each inKey and return an undefined index in an array for each ingredient item value
    // all of these empty arrays are stored within another array
    // so props.ingredients[ingKey] gives us the number (or value) of the ingredient object
    // [...Array(props.ingredients[ingKey])] gives us => [[undefined], [undefined], [unedfined, undefined], [undefiend, undefined]]
    // map through each individual ingKey array in order to spit out BurgerIngredient comp based on how many undefined items are in each array
    // all of the BurgerIngredient comp are stored in an array 'transformedIngredients'

    const transformedIngredients = Object.keys(props.ingredients)
        .map(ingKey => {
            console.log('ingKey', ingKey);
            return [...Array(props.ingredients[ingKey])]
            .map((_, i) => {
                return <BurgerIngredient key={ingKey + i} type={ingKey} />;
            });
        });

    return (
        <div className={styles.Burger}>
          <BurgerIngredient type="bread-top"/>
          {transformedIngredients}
          <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default burger;