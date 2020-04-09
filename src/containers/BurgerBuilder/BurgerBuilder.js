import React, { Component } from "react";

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    checkoutClicked: false,
    loading: false, 
    error: false
  }

  componentDidMount() {
    axios.get('/ingredients.json')
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(error => {});
  }

  updatePurchaseState(ingredients) {
    let ingredientKeys = Object.keys(ingredients)

    let mappedIngredientKeys = ingredientKeys
      .map(ingredientKey => {
        return ingredients[ingredientKey]
      });

    let reducedIngredientKeys = mappedIngredientKeys
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({ purchasable: reducedIngredientKeys > 0 });
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;
    const ingredientPrice = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + ingredientPrice;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;
    const ingredientPrice = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - ingredientPrice;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  }

  checkoutHandler = () => {
    this.setState({ checkoutClicked: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ checkoutClicked: false });
  }

  purchaseContinueHandler = () => {
    //alert('You continue');
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Ormycita',
        address: {
          street: 'Evaristo Lillo',
          zipCode: '1700000',
          country: 'CL'
        },
        email: 'ormy@test.com'
      },
      deliveryMethod: 'fastest'
    };
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false, checkoutClicked: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false, checkoutClicked: false });
      });
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let burger = this.state.error ? <p>Ingredients cannot be loaded :(</p> : <Spinner />

    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            clicked={this.checkoutHandler}
            price={this.state.totalPrice.toFixed(2)} />
        </Aux>);
    }

    let orderSummary = null;

    if (this.state.ingredients) {
      orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        price={this.state.totalPrice.toFixed(2)}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
      />;
    }

    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <Aux>
        {burger}
        <Modal show={this.state.checkoutClicked}
          modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>

      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);