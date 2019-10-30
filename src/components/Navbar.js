import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { logo } from '../homeIcon.png';
import styled from 'styled-components';

import { ButtonContainer } from './Button';

import { FaShoppingCart } from "react-icons/fa";

class Navbar extends Component {
    render() {
        return (
            <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5" >
                <Link to="/">
                    {/* <img src={logo} alt="store" className="navbar-brfand" /> */}
                    <img src={require('../logo.svg')} className="navbar-brfand" />
                </Link>

                <ul className="navbar-nav align-items-center">
                    <li className="nav-items ml-5">
                        <Link to="/" className="nav-link">
                            Product
                    </Link>
                    </li>
                </ul>
                <Link to="/Cart" className="ml-auto">
                    <ButtonContainer>
                        <FaShoppingCart className="shoppingCartIcon" />
                        <span className='mr-2 mycartButtonText'>
                            My Cart
                    </span>
                    </ButtonContainer>
                </Link>
            </NavWrapper>
        );
    }
}

const NavWrapper = styled.nav`
background:var(--mainBlue);
border-bottom:2px solid var(--mainYellow);
.nav-link{
    color:var(--mainYellow) !important;
    font-size:1.3rem;
    text-transfrom: capitalize;
}
.mycartButtonText{
    padding-left:10px;
    color:#fff;
}
.shoppingCartIcon{
    color:#ffd400;
}
`

export default Navbar;