import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { logo } from '../homeIcon.png';
import styled from 'styled-components';

import { ButtonContainer } from './Button';
import { FaShoppingCart, FaAngleDown, FaAngleUp } from "react-icons/fa";
import SearchPage from './searchBox';


class Navbar extends Component {
    render() {
        return (
            <header>
                <div className="settingsBar">
                    <ul className="col-md-7">
                        <li className="settingsItem hasDropDown col-md-3">
                            <a className="title" href="">Help</a>
                            <FaAngleDown class="fa AngleDown"></FaAngleDown>
                            <FaAngleUp class="fa AngleUp hide"></FaAngleUp>
                            <ul className="dropdownHover">
                                <li><a className="subTitle" href="">Customer Service</a></li>
                                <li><a className="subTitle" href="">Dispue & Reports</a></li>
                            </ul>
                        </li>
                        <li className="settingsItem col-md-3">
                            <a className="title" href=""> Buyer Protection</a>
                        </li>
                        <li className="settingsItem col-md-3">
                            <a className="title" href="">Flag/English/USD</a>
                        </li>
                        <li className="settingsItem col-md-3">
                            <a className="title" href="">Account</a>
                        </li>
                    </ul>
                </div>
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

                    <SearchPage />

                    <Link to="/Cart" className="ml-auto">
                        <ButtonContainer>
                            <FaShoppingCart className="shoppingCartIcon" />
                            <span className='mr-2 mycartButtonText'>
                                My Cart
                            </span>
                        </ButtonContainer>

                    </Link>
                </NavWrapper>
            </header>
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