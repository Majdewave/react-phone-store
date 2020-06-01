import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { logo } from '../homeIcon.png';
import styled from 'styled-components';

import { ButtonContainer } from './Button';
import { FaShoppingCart, FaAngleDown, FaAngleUp } from "react-icons/fa";
import SearchPage from './searchBox';
import AuthStatusView from '../AppAuthtest.js'
import { Dropdown, Button } from 'react-bootstrap';
import DropdownList from './DropdownList.js';
import { ProductConsumer } from '../context';
import IdentityModal, { useIdentityContext, IdentityContextProvider } from 'react-netlify-identity-widget';

const url = "https://majd-react-store.netlify.app"; // supply the url of your Netlify site instance with Identity enabled. VERY IMPORTANT

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
                                    <ProductConsumer>
                                        {value => {
                                            var isLogged = value.isLoggedIn;
                                            var userName = value.userName;
                                            if (isLogged == "true") {
                                                return (
                                                    <React.Fragment>
                                                        <div className="userDetails subContainer">
                                                            <span className="avatar">
                                                                <img src="img/icons/avatar.png" alt="avatar" />
                                                            </span>
                                                            <span className="text">Welcome Back,{userName}</span>
                                                        </div>
                                                        {/* <Button className="button redButton">Join</Button> */}
                                                        {/* <Button className="button TransparentButton">Login</Button> */}
                                                    </React.Fragment>
                                                )
                                            }
                                            else {
                                                return <Button className="button TransparentButton">Login</Button>
                                            }
                                        }}
                                    </ProductConsumer>

                                    <IdentityContextProvider url={url}>
                                        { // authontication login
                                            <AuthStatusView>
                                            </AuthStatusView>
                                        }
                                    </IdentityContextProvider>
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
                <NavWrapper className="navbar navbar-expand-sm navbar-dark" >
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
                                <DropdownList />
                            </li>
                        </ul>
                    </div>
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
                    {/* <IdentityContextProvider url={url}>
                        { // authontication login
                            <AuthStatusView>
                            </AuthStatusView>
                        }
                    </IdentityContextProvider> */}
                </NavWrapper>
            </header>
        );
    }
}

const NavWrapper = styled.nav`
        background:#fff;
        box-shadow: 0 1px 4px rgba(0,0,0,.08);
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

