import React, { Component } from 'react';
import CatalogPage from './components/CatalogPage.js'
import PopCart from './components/PopCart.js'
import Filter from './components/Filter.js'
import CheckFilter from './components/CheckFilter.js'
import './App.scss'
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import NavBar from './components/NavBar'

firebase.initializeApp({
  apiKey:"AIzaSyDL1xfHHqUaKYRsXhW5VNqBOOAOe4mH-bg",
  authDomain:"new-shopping-cart-742e0.firebaseapp.com"
})
class App extends Component {
  state = {
      products: [],
      cartProducts:[],
      sizes: [
      {id:1,value:"XS",checked:false},
      {id:2,value:"S",checked:false},
      {id:3,value:"M",checked:false},
      {id:4,value:"ML",checked:false},
      {id:5,value:"L",checked:false},
      {id:6,value:"XL",checked:false},
      {id:7,value:"XXL",checked:false}],
      selectedSizes:[],
      isSignedIn:false,
    };
    uiConfig={
      signInFlow:"popup",
      signInOptions:[firebase.auth.GoogleAuthProvider.PROVIDER_ID],
      callbacks: {
        signInSuccess: () => false
      }
    }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user=>{this.setState({isSignedIn:!!user})});
    import('./products.json').then(json => 
      { this.setState({products:json.products})});
  };
  handleIncrement = product => {
    const products = [...this.state.products];
    const cartProducts = [...this.state.cartProducts];
    if (cartProducts.some(p => p.id === product.id)) {
      product["quantity"] += 1;
    } else {
      product["quantity"] = 1;
      cartProducts.push(product);
    }
    this.setState({cartProducts,products});
  };

  handleDelete = product => {
    const products = [...this.state.products];
    const cartProducts = this.state.cartProducts.filter(p => p.id !== product.id);
    product["quantity"]=0;
    this.setState({ cartProducts,products});
  };

  handleReset = () => {
    const products = [...this.state.products];
    const cartProducts = this.state.cartProducts.map(p => {
      p.quantity = 0;
      return p;
    });
    cartProducts.length=0;
    this.setState({ cartProducts, products});
  };
  handleChecked= size=>event=> {
    const sizes = [...this.state.sizes];
    const selectedSizes = [...this.state.selectedSizes];
    size.checked=event.target.checked;
    this.setState({ sizes });
    if(size.checked===true&&selectedSizes.indexOf(size)===-1){
      selectedSizes.push(size)
      this.setState({ selectedSizes});
    }
    if(size.checked===false){
      var index = selectedSizes.indexOf(size);
      selectedSizes.splice(index, 1);
      this.setState({ selectedSizes});
    }
  };

  getPagedData = () => {
    const {
      selectedSizes,
      products: allproducts
    } = this.state;
  
    const filtered= selectedSizes.length>0?
    allproducts.filter(p => p.availableSizes.some((s,i)=> selectedSizes.some((c,j) => c.value === s)))
    :allproducts;
    return { totalCount: filtered.length, data: filtered };
  };
  render(){
    const { totalCount, data: products } = this.getPagedData();
    return(
      <React.Fragment>
      {/*<ButtonContainer>
                <span className="mr-2">
                <i className="fas fa-cart-plus" />
                </span>
                my cart
      </ButtonContainer>*/}
      <NavBar
       totalCount={totalCount}
       onDelete={this.handleDelete}
       onReset={this.handleReset}
       products={products}
       cartProducts={this.state.cartProducts}/>
      <div className="sidebar">  
      <div className="App"> 
      <CheckFilter 
      sizes={this.state.sizes}
      onChecked={this.handleChecked}/>
      <PopCart className="PopCart"  
      onDelete={this.handleDelete}
      onReset={this.handleReset}
      products={products}
      cartProducts={this.state.cartProducts}

/>
      </div>
        <CatalogPage 
        products={products}
        cartProducts={this.state.cartProducts}
        onIncrement={this.handleIncrement} 
        />
      </div>
      </React.Fragment>
    );
  }
}

  

export default App;
