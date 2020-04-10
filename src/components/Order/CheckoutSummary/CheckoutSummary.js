import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {
  return (
    <div className="ChechoutSummary">
      <h1>We hope you enjoy your burger!</h1>
      <div style={{ width: '100%', margin: 'auto', textAlign: 'center'}}>
        <Burger ingredients={props.ingredients} />
        <Button
          btnType="Danger"
          clicked={props.checkoutCancelled}>CANCEL</Button>
        <Button
          btnType="Success"
          clicked={props.checkoutContinued}>CONTINUE</Button>
      </div>
    </div>
  );
}

export default checkoutSummary;