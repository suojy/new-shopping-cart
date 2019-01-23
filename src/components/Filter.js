import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/Face';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 60,
    backgroundColor: theme.palette.background.paper,
  },
});

function Filter(props) {
  const { classes } = props;
  return (
    <List className={classes.root}>
    {props.sizes.map(s => (
        <ListItem
          key={s.id}
        >
        <button onClick={() => props.onSizeSelect(s)}>{s.value}</button>
      </ListItem>
      ))}
    </List>
  );
}

Filter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Filter);