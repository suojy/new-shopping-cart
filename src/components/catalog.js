import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
const styles = {
    card: {
      width: 300,
      height:400,
    },
    media: {
      width:300,
      height: 300,
      backgroundSize: 'contain'
    },
  };
const catalog =(props)=>{
    const { classes } = props;
    return(
     <Card className="classes.card">
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={require(`../static/data/products/${props.product.sku}_1.jpg`)}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography font-size={16}>
             {props.product.title}
            </Typography>
            <Typography textAlign="center">
             {props.product.price}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Add to cart 
          </Button>
        </CardActions>
      </Card>  
      );
  }
  catalog.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  export default withStyles(styles)(catalog); 
