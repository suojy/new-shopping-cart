import React, { Component } from 'react';
import '../App.scss';
import Checkbox from './checkbox.js';
const availableSizes = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'];



class size extends Component{
    createCheckbox = label => (
        <Checkbox
          classes="filters-available-size"
        />
      );
    
    createCheckboxes = () => availableSizes.map(this.createCheckbox);
    render(){
        return(
        <div className="filters">
        <h4 className="title">Sizes:</h4>
        {this.createCheckboxes()}
        </div>
        );
    }
}

export default size;

