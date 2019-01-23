import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Catalog from './Catalog.js';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width:1000,
    margin:'0 auto',
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  card: {
  }
});

class CatalogPage extends React.Component {
  state = {
    spacing: '16',
  };

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value,
    });
  };

  render() {
    const { classes } = this.props;
    const { spacing } = this.state;
    const {products, addToCart} = this.props;

    return (
      <Grid container className={classes.root} spacing={24}>
            {products.map(p => (
                <Grid item xs={3} className={classes.card}>
                  <Catalog 
                  product={p} 
                  key={p.id}
                  products={this.props.products}
                  cartProducts={this.props.cartProducts}
                  onIncrement={this.props.onIncrement} />
                </Grid>
            ))}
      </Grid>
    );
  }
}

CatalogPage.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(CatalogPage);

/*
const mapStateToProps = state => ({
products: getVisibleProducts(state.products) //products的来源
})

export default connect(
mapStateToProps,
{ addToCart }
)(ProductsContainer*/ 