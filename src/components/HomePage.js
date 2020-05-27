import React, { Component } from 'react';

import DropdownList from './DropdownList';
import SlickSlider from './Carousel';
import Countdown from './CountDownTime';
import FeaturedBrands from './HomePage/FeaturedBrands';
import SelectionTop from './HomePage/SelectionTop';
import FlashDeals from './HomePage/FlashDeals';
import MoreToLOve from './HomePage/MoreToLove';
import AuthStatusView from '../AppAuthtest.js'
import firebase from 'firebase';
import { ProductConsumer } from '../context';

import Loader from './HomePage/loader.js'
import IdentityModal, { useIdentityContext, IdentityContextProvider } from 'react-netlify-identity-widget';

const url = "https://majd-react-store.netlify.app";


class HomePage extends Component {
    render() {
        const currentDate = new Date();
        const year = (currentDate.getMonth() === 11 && currentDate.getDate() > 23) ? currentDate.getFullYear() + 1 : currentDate.getFullYear();

        return (
            <div className="homepageContainer">
                <div className="topContainer">
                    <div className="categories dropdownlist subContainer">
                        <div className="dropdownTitles">
                            <span className="catigories">
                                Catigories
                            </span>
                        </div>
                        <DropdownList />
                    </div>
                    <div className="subContainer slider">
                        <SlickSlider />
                        <div className="crowd-entrance">
                            <ul className="productList">
                                <li className="product">
                                    <img src="img/lifestyle/1.jpg" className="croudImg" alt="lifestyle" />
                                    <div className="croudPrice">US $7.38</div>
                                    <div className="croudTitle"></div>
                                </li>
                                <li className="product">
                                    <img src="img/lifestyle/2.jpeg" className="croudImg" alt="lifestyle" />
                                    <div className="croudPrice">US $7.38</div>
                                    <div className="croudTitle">Neck Massager</div>
                                </li>
                                <li className="product">
                                    <img src="img/lifestyle/3.jpeg" className="croudImg" alt="lifestyle" />
                                    <div className="croudPrice">US $7.38</div>
                                    <div className="croudTitle"></div>
                                </li>
                                <li className="product">
                                    <img src="img/lifestyle/4.jpeg" className="croudImg" alt="lifestyle" />
                                    <div className="croudPrice">US $7.38</div>
                                    <div className="croudTitle"></div>
                                </li>
                                <li className="product">
                                    <img src="img/lifestyle/5.jpeg" className="croudImg" alt="lifestyle" />
                                    <div className="croudPrice">US $7.38</div>
                                    <div className="croudTitle"></div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="userDetails subContainer">
                        <span className="avatar">
                            <img src="img/icons/avatar.png" alt="avatar" />
                        </span>
                        <ProductConsumer>
                            {value => {
                                var isLogged = value.isLoggedIn;
                                var userName = value.userName;
                                if (userName == "loading") {
                                    return (
                                        <Loader />
                                    )
                                }
                                if (isLogged == true) {
                                    return (
                                        <React.Fragment>
                                            <span className="text">Hi, {userName}</span>
                                            <div className="login-status">
                                                <span className="join-btn">
                                                    <IdentityContextProvider url={url}>
                                                        { // authontication login
                                                            <AuthStatusView>
                                                            </AuthStatusView>
                                                        }
                                                    </IdentityContextProvider>
                                                </span>
                                            </div>
                                            <div className="userFeatures col-md-12">
                                                <div className="col-md-4 icon">
                                                    <img src="img/icons/account.png" />
                                                    <span>Account</span>
                                                </div>
                                                <div className="col-md-4 icon">
                                                    <img src="img/icons/chat.png" />
                                                    <span>Messages</span>
                                                </div>
                                                <div className="col-md-4 icon">
                                                    <img src="img/icons/orders.png" />
                                                    <span>Orders</span>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    )
                                }
                                else {
                                    return (
                                        <React.Fragment>
                                            <span className="text">Welcome to iExpress {userName}</span>
                                            <div className="login-status">
                                                <span className="join-btn">
                                                    <IdentityContextProvider url={url}>
                                                        { // authontication login
                                                            <AuthStatusView>
                                                            </AuthStatusView>
                                                        }
                                                    </IdentityContextProvider>
                                                </span>
                                            </div>
                                        </React.Fragment>
                                    )
                                }
                            }}
                        </ProductConsumer>
                    </div>
                </div>



                {/* <div className="SaleContainer">
                    <div className="bgSaleAnimation">
                        <Countdown date={`${year}-12-24T00:00:00`} />
                    </div>
                </div> */}
                <div className="middleContainer">
                    <FlashDeals />
                </div>
                <div className="bottomContainer">
                    <SelectionTop />
                    <FeaturedBrands />
                    <MoreToLOve />
                </div>

            </div>
        );
    }
}

export default HomePage;