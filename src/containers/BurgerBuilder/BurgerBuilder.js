import React, { Component } from "react";
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actionTypes from '../../store/actions';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    totalPrice: 4,
    purchasable: false,
    checkoutClicked: false,
    loading: false, 
    error: false
  }

  componentDidMount() {
    console.log(this.props);
    // axios.get('/ingredients.json')
    //   .then(response => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch(error => {});
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
    const queryParams = [];
    for (let ing in this.state.ingredients) {
      queryParams.push(encodeURIComponent(ing) + '=' + encodeURIComponent(this.state.ingredients[ing]));
    }
    queryParams.push('price=' + this.state.totalPrice);
    
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?'+ queryString
    });
  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let burger = this.state.error ? <p>Ingredients cannot be loaded :(</p> : <Spinner />

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemovedr}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            clicked={this.checkoutHandler}
            price={this.state.totalPrice.toFixed(2)} />
        </Aux>);
    }

    let orderSummary = null;

    if (this.props.ings) {
      orderSummary = <OrderSummary
        ingredients={this.props.ings}
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

const mapStateToProps = state => {
  return{
    ings: state.ingredients
  };
} 

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
    onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})

  }
}

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios));