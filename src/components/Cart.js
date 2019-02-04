import React, { Component } from 'react'
import CartProduct from './CartProduct'
import classNames from 'classnames';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
const styles = theme => ({
  margin: {
    margin: theme.spacing.unit*2,
    marginBottom: theme.spacing.unit,
  },
  bootstrapRoot: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
   
    lineHeight: 1.5,
    backgroundColor: '#007bff',
    borderColor: '#007bff',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#0069d9',
      borderColor: '#0062cc',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#005cbf',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  },
});

const Cart = props => {
  const { classes } = props;
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
      <center><h3> Your Cart </h3></center>
      <div className={classes.margin}>{nodes}</div>
      <p className={classes.margin}>Total: &#36;{calculateMoney()}</p>
      <Button 
        variant="contained"
        color="primary"
        disableRipple
        className={classNames(classes.margin, classes.bootstrapRoot)}
        onClick={() => props.onReset()}
        disabled={hasProducts ? '' : 'disabled'}>
        Checkout
      </Button>
    </div>
  )
}
Cart.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Cart);
