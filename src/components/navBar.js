import React, { Component } from 'react';
import styled from 'styled-components';
import {ButtonContainer} from './Button';
export default class navBar extends Component{
    render(){
        return(
            <NavWrapper className="navbar navbar-expand-sm  navbar-dark px-sm-5">
            <ButtonContainer>
                <span className="mr-2">
                <i className="fas fa-cart-plus" />
                </span>
                my cart
            </ButtonContainer>
            </NavWrapper>
        );
    }
}

const NavWrapper=styled.nav`
    background:var(--mainBlue);

`