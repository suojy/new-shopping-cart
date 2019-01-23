import React, { Component } from 'react'
import CartProduct from './CartProduct'


const Cart = props => {
  const hasProducts = props.cartProducts.length > 0;
  const nodes = hasProducts ? (
    props.cartProducts.map( p =>
      <CartProduct
        product={p}
        onDelete={props.onDelete}
        products={props.products}
        cartProducts={props.cartProducts}
      />
    )
  ) : (
    <em>Please add some products to cart.</em>
  )
  const calculateMoney = () => {
    let money = 0;
    if (props.cartProducts.length !== 0) {
        props.cartProducts.forEach(p => {
        money += p.quantity * p.price
      });
    }
    return money;
  }
  return (
    <div>
      <h3> Your Cart </h3>
      <div>{nodes}</div>
      <p>Total: &#36;{calculateMoney()}</p>
      <button 
        onClick={() => props.onReset()}
        disabled={hasProducts ? '' : 'disabled'}>
        Checkout
      </button>
    </div>
  )
}
  
  export default Cart;
