import React, { Component } from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
      .map(ingredientKey => {
        return (
          <li key={ingredientKey}>
            <span style={{ textTransform: 'capital' }}>{ingredientKey}</span>: {this.props.ingredients[ingredientKey]}
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
        <p><strong>Total Price: {this.props.price}</strong></p>
        <p>Continue to checkout</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
      </Aux>
    );
  }
}

export default OrderSummary;