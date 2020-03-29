import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import BurgerBuilder from '../../containers/BurgerBuilder/BurgerBuilder';

const burger = (props) => {
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top"/>
      <BurgerIngredient type="cheese"/>
      <BurgerIngredient type="meat"/>
      <BurgerIngredient type="salad"/>
      <BurgerIngredient type="bacon"/>
      <BurgerIngredient type="bread-bottom"/>
    </div>
  );
};

export default burger;