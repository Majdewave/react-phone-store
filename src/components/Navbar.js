import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { logo } from '../homeIcon.png';
import styled from 'styled-components';

import { ButtonContainer } from './Button';
import { FaShoppingCart, FaAngleDown, FaAngleUp } from "react-icons/fa";
import SearchPage from './searchBox';
import AuthStatusView from '../AppAuthtest.js'
import { Dropdown, Button } from 'react-bootstrap';
import { ProductConsumer } from '../context';
import IdentityModal, { useIdentityContext, IdentityContextProvider } from 'react-netlify-identity-widget';
import x from '../context';

const url = "https://majd-react-store.netlify.com/"; // supply the url of your Netlify site instance with Identity enabled. VERY IMPORTANT

class Navbar extends Component {

    render() {
        return (
            <header>
                <div className="settingsBar">
                    <ul className="col-md-7">
                        <li className="settingsItem hasDropDown col-md-3">
                            <a className="title" href="">Help</a>
                            <FaAngleDown className="fa AngleDown"></FaAngleDown>
                            <FaAngleUp className="fa AngleUp hide"></FaAngleUp>
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
                        <li className="settingsItem col-md-2">
                            <a className="title" href="">Account</a>
                            <FaAngleDown className="fa AngleDown"></FaAngleDown>
                            <FaAngleUp className="fa AngleUp hide"></FaAngleUp>
                            <ul className="dropdownHover">
                                <li className="loginUser">
                                    <Button className="button redButton">Join</Button>
                                    <Button className="button TransparentButton">Login</Button>
                                </li>
                                <i className="flyout-line">&nbsp;</i>
                                <li><a className="subTitle" href="">My Orders</a></li>
                                <li><a className="subTitle" href="">Message Center</a></li>
                                <li><a className="subTitle" href="">Wish List</a></li>
                                <li><a className="subTitle" href="">My Favorite Stores</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5" >
                    <Link to="/">
                        {/* <img src={logo} alt="store" className="navbar-brfand" /> */}
                        <img src={require('../logo.PNG')} className="navbar-brfand" />
                    </Link>
                    <div className="settingsBar">
                        <ul className="">
                            <li className="settingsItem hasDropDown">
                                <a className="title" href="">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </a>
                                <FaAngleDown className="fa AngleDown"></FaAngleDown>
                                <FaAngleUp className="fa AngleUp hide"></FaAngleUp>
                                <ul className="dropdownHover">
                                    <li><div className="icon womenFashion"></div> <a className="subTitle womenFashion" href="">Women's Fashion</a></li>
                                    <li><div className="icon menFashion"></div><a className="subTitle menFashion" href="">Men's Fashion</a></li>
                                    <li><div className="icon jewelry"></div><a className="subTitle jewelry" href="">Jewelry</a></li>
                                    <li><div className="icon bagsShoes"></div><a className="subTitle bagsShoes" href="">Bags & Shoes</a></li>
                                    <li><div className="icon Electronics"></div><a className="subTitle Electronics" href="">Consumer Electronics</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <ul className="navbar-nav align-items-center">
                        <li className="nav-items ml-5">
                            <Link to="/" className="nav-link">
                                Product
                    </Link>
                        </li>
                    </ul>

                    <SearchPage />

                    <Link to="/Cart" className="myCart">
                        <i className="myCartIcon"></i>
                        <div className="counterContainer">
                            <ProductConsumer>
                                {value => {
                                    const x = value.cartItemsNum;
                                    return (
                                        <div className="counter">{x}</div>
                                    )
                                }}

                            </ProductConsumer>

                        </div>
                    </Link>
                    <IdentityContextProvider url={url}>
                        { // authontication login
                            <AuthStatusView>
                            </AuthStatusView>
                        }
                    </IdentityContextProvider>
                </NavWrapper>
            </header>
        );
    }
}

const NavWrapper = styled.nav`
        background:#fff;
        border-bottom:2px solid var(--mainYellow);
.nav-link{
                    color:var(--mainYellow) !important;
                font-size:1.3rem;
                text-transfrom: capitalize;
            }
.mycartButtonText{
                    padding - left:10px;
                color:#fff;
            }
.shoppingCartIcon{
                    color:#ffd400;
            }
            `

export default Navbar;

