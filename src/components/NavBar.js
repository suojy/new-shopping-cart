
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import FavoriteIcon from '@material-ui/icons/Favorite';
import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Popover from '@material-ui/core/Popover';
import Cart from './Cart.js'
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  typography: {
    margin: theme.spacing.unit * 2,
  },
  margin: {
    margin: theme.spacing.unit*2,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  bootstrapRoot: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
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

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    anchorEl: null,
    anchorEl_: null,

  };
  uiConfig={
    signInFlow:"popup",
    signInOptions:[firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccess: () => false
    }
  }
  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };
  handleClick_ = event => {
    this.setState({
      anchorEl_: event.currentTarget,
    });
  };

  handleClose_ = () => {
    this.setState({
      anchorEl_: null,
    });
  };
  calculateNumber = () => {
    let number = 0;
    if (this.props.cartProducts.length !== 0) {
        this.props.cartProducts.forEach(p => {
        number += p.quantity
      });
    }
    return number;
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };


  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const { anchorEl_ } = this.state;
    const open_ = Boolean(anchorEl_);
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
            {this.props.totalCount} Product(s) found. 
            </Typography>
            <form>
            <FormControl variant="filled" className={classes.formControl}>
          <InputLabel htmlFor="filled-age-simple">Order By</InputLabel>
          <Select
            value={this.state.age}
            onChange={this.handleChange}
            input={<FilledInput name="age" id="filled-age-simple" />}
          >
          {this.props.orders.map(o => (
        <MenuItem
          key={o.id}
          value={o.value}
          onclick={() => this.props.onHandleSelected(o)}
        >
        {o.name}
      </MenuItem>
      ))}
         </Select>
        </FormControl>
      </form>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                <FavoriteIcon />
                </Badge>
              </IconButton>
              <IconButton color="inherit" aria-owns={open ? 'simple-popper' : undefined}
                aria-haspopup="true"
                variant="contained"
                onClick={this.handleClick} >
                <Badge badgeContent={this.calculateNumber()} color="secondary" aria-label="Add to shopping cart">
                 <AddShoppingCartIcon />
                </Badge>
              </IconButton>
              <Popover
          id="simple-popper"
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Typography className={classes.typography}></Typography>
          <Cart 
          onDelete={this.props.onDelete}
          onReset={this.props.onReset}
          products={this.props.products}
          cartProducts={this.props.cartProducts}/>
        </Popover>
              <IconButton
                color="inherit" aria-owns={open_ ? 'simple-popper' : undefined}
                aria-haspopup="true"
                variant="contained"
                onClick={this.handleClick_} 
              >
                <AccountCircle />
              </IconButton>
              <Popover
          id="simple-popper"
          open={open_}
          anchorEl={anchorEl_}
          onClose={this.handleClose_}
          anchorReference="anchorPosition"
          anchorPosition={{ top: 60, left: 1100 }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
        {this.props.isSignedIn ? (
          <span>
            <h5  className={classes.margin}>Welcome {firebase.auth().currentUser.displayName}</h5>
            <Button variant="contained"
        color="primary"
        disableRipple
        className={classNames(classes.margin, classes.bootstrapRoot)}
            onClick={() => firebase.auth().signOut()}>Sign out!</Button>
            {/*<img
              alt="profile picture"
              src={firebase.auth().currentUser.photoURL}
            />*/}
          </span>
        ) : (
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}</Popover>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
