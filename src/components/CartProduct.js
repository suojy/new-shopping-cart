import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  card: {
    display: 'flex',
    marginBottom:theme.spacing.unit*2,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  margin: {
    margin: theme.spacing.unit,

  },
});

function CartProduct (props){
  const { classes, theme } = props;

  return (
    <Card className={classes.card}>
    <CardMedia
        className={classes.cover}
        image={require(`../static/data/products/${props.product.sku}_1.jpg`)}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {props.product.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Quantity:{props.product.quantity}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Price:&#36;{props.product.price}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
        <IconButton aria-label="Delete" className={classes.margin}>
          <DeleteIcon onClick={() => props.onDelete(props.product)}/>
        </IconButton>
        </div>
      </div>
      
    </Card>
  );
  }
  CartProduct.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles, { withTheme: true })(CartProduct);