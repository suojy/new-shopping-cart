import React, { Component } from 'react';
import {ButtonContainer} from './components/Button';
import NavBar from './components/navBar.js'
import ProductList from './components/ProductList'
import Size from './components/size.js'
import FloatCart from './components/FloatCart'
import CatalogPage from './components/catalogPage.js'
import 'bootstrap/dist/css/bootstrap.min.css';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }
  componentDidMount() {
    import('./products.json').then(json => 
      { this.setState({products:json.products})});
  }
  render(){
    return(
      <React.Fragment>
      {/*<ButtonContainer>
                <span className="mr-2">
                <i className="fas fa-cart-plus" />
                </span>
                my cart
      </ButtonContainer>*/}
      <div className="App">
      <CatalogPage products={this.state.products} /></div>
      </React.Fragment>
    );
  }
}

  

export default App;
