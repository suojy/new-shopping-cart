import React, { Component } from 'react';
import CatalogPage from './components/CatalogPage.js'
import PopCart from './components/PopCart.js'
import Filter from './components/Filter.js'
import './App.scss'
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
firebase.initializeApp({
  apiKey:"AIzaSyDL1xfHHqUaKYRsXhW5VNqBOOAOe4mH-bg",
  authDomain:"new-shopping-cart-742e0.firebaseapp.com"
})
class App extends Component {
  state = {
      products: [],
      cartProducts:[],
      sizes: [
      {id:1,value:"XS"},
      {id:2,value:"S"},
      {id:3,value:"M"},
      {id:4,value:"ML"},
      {id:5,value:"L"},
      {id:6,value:"XL"},
      {id:7,value:"XXL"}],
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

  handleSizeSelect = size => {
    this.setState({ selectedSize: size.value});
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

  getPagedData = () => {
    const {
      selectedSize,
      products: allproducts
    } = this.state;
    const filtered =
      selectedSize? allproducts.filter(p => p.availableSizes.some( (size,i) => (size===selectedSize) ))
        :  allproducts;
    return { totalCount: filtered.length, data: filtered };
  };
  render(){
    const { totalCount, data: products } = this.getPagedData();
    console.log({products});
    return(
      <React.Fragment>
      {/*<ButtonContainer>
                <span className="mr-2">
                <i className="fas fa-cart-plus" />
                </span>
                my cart
      </ButtonContainer>*/}
      <div className="App">
      <div className="Login">
      {this.state.isSignedIn?(<span><div>Signed In!</div><button onclivk={()=>firebase.auth.signOut()}>Sign Out</button>
       <h1>Welcome{firebase.auth().currentUser.displayName}</h1>
       <img alt="profile picture" src={firebase.auth().currentUser.photoURL}/>
       </span>):(<StyledFirebaseAuth 
       uiConfig={this.uiConfig} firebaeAuth={firebase.auth()}/>)}
      </div>
      <p>{totalCount}</p>
      <div className="sidebar"><Filter 
      sizes={this.state.sizes}
      onSizeSelect={this.handleSizeSelect}/>
      <PopCart className="PopCart" 
        onDelete={this.handleDelete}
        onReset={this.handleReset}
        products={products}
        cartProducts={this.state.cartProducts}
        /></div>
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
