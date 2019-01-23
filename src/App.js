import React, { Component } from 'react';
import CatalogPage from './components/CatalogPage.js'
import PopCart from './components/PopCart.js'
import Filter from './components/Filter.js'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    };
  }
  componentDidMount() {
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
    console.log("size");
    this.setState({ selectedSize: size});
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
      selectedSize
        ?  allproducts.filter(p => 
          {
            for(var i =0;i<p.availableSizes.length;i++){
              if(p.availableSizes[i] === selectedSize)
                return p;
            }
          })
        :  allproducts;

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
      <div className="App">
      <Filter 
      sizes={this.state.sizes}
      selectedSize={this.state.selectedSize}
      onSizeSelect={this.handleSizeSelect}/>
      <PopCart className="PopCart" 
        onDelete={this.handleDelete}
        onReset={this.handleReset}
        products={this.state.products}
        cartProducts={this.state.cartProducts}
        />
        <CatalogPage 
        products={this.state.products}
        cartProducts={this.state.cartProducts}
        onIncrement={this.handleIncrement} 
        />
      </div>
      </React.Fragment>
    );
  }
}

  

export default App;
