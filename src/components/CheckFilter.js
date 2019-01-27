import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
});

class CheckFilter extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes } = this.props;
    

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">SELECT SIZE</FormLabel>
          {this.props.sizes.map(s => (
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={s.checked}
                  onChange={this.props.onChecked(s)}
          
                />
              }
              label={s.value}
            />
          </FormGroup>))}
        </FormControl>
      </div>
    );
  }
}

CheckFilter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckFilter);