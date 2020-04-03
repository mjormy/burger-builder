import React from 'react';

import Aux from '../../../hoc/Aux'


const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map(ingredientKey => {
      return (
        <li key={ingredientKey}>
          <span style={{textTransform: 'capital'}}>{ingredientKey}</span>: {props.ingredients[ingredientKey]}
        </li>
      );
    });
  return (
    <Aux>
      <h3>Your order </h3>
      <p> A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Continue to checkout</p>
    </Aux>
  );
}

export default orderSummary;