import React, { Component } from 'react';

class checkbox extends Component {
  
  state = {
    isChecked: false
  };


  render() {
    const { classes } = this.props; 
    const { isChecked } = this.state;

    return (
      <div className={classes}>
        <label>
          <input
            type="checkbox"
            checked={isChecked}
          />
          <span className="checkmark"></span>
        </label>
      </div>
    );
  }
}

export default checkbox;
