import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Catalog from './catalog.js';

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

class catalogPage extends React.Component {
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

    return (
      <Grid container className={classes.root} spacing={24}>
            {this.props.products.map(p => (
                <Grid item xs={3} className={classes.card}>
                  <Catalog product={p}/>
                </Grid>
            ))}
      </Grid>
    );
  }
}

catalogPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(catalogPage);