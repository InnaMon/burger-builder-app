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
    // it does not matter what kind of data we store inside each nested array, all that matters is the lenght of the array 
    // map through each individual ingKey array in order to spit out BurgerIngredient comp based on how many undefined items are in each array
    // all of the BurgerIngredient comp are stored in an array 'transformedIngredients'
    // key={ingKey + i} stores a unique value string for each ingredients key-value pair/item EX) => salad0, cheese0, cheese1

    let transformedIngredients = Object.keys(props.ingredients)
        .map(ingKey => {
            return [...Array(props.ingredients[ingKey])]
            .map((_, i) => {
                return <BurgerIngredient key={ingKey + i} type={ingKey} />;
            });
        }).reduce((prevValue, currentValue) => {
            return prevValue.concat(currentValue);
        }, []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Let's build a delicious burger!</p>;
    }

    console.log('transformedIngredients:', transformedIngredients)

    return (
        <div className={styles.Burger}>
          <BurgerIngredient type="bread-top"/>
          {transformedIngredients}
          <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default burger;