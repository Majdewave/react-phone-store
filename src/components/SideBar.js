import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';

import { AiFillEdit } from "react-icons/ai";
import { FiHeart, FiClock, FiShare2, FiArrowUpCircle } from "react-icons/fi";
import { ProductConsumer } from '../context';
import Loader from './HomePage/loader';
class SideBar extends Component {
    state = {
        active: false
    }

    render() {
        return (
            <div className={this.state.active ? "sideBarContainer active" : "sideBarContainer"}>
                <ReactTooltip place="left" type="dark" effect="solid" />

                <div className="sideBarTools">
                    <div className="sale"></div>
                    <div className="ProductsMenu toolItem" data-tip="Products">...</div>

                    <div data-tip="Wish List" className="toolItem" onClick={() => this.setState({ active: !this.state.active })} >
                        <FiHeart></FiHeart>
                    </div>
                    <div className="toolItem" data-tip="Viewed" onClick={() => this.setState({ active: !this.state.active })}>
                        <FiClock></FiClock>
                    </div>
                    <div className="bottom">
                        <div className="toolItem">
                            <FiShare2></FiShare2>
                        </div>

                        <div className="toolItem" data-tip="Feedback">
                            <AiFillEdit></AiFillEdit>
                        </div>
                        <div className="toolItem" data-tip="Back to top">
                            <FiArrowUpCircle></FiArrowUpCircle>
                        </div>
                    </div>
                </div>
                <div className="sideBarContent col-md-12">
                    <ProductConsumer>
                        {value => {
                            var isLogged = value.isLoggedIn;
                            //  if (isLogged == "true") {
                            return value.wishList.map(item => {
                                return value.products.map(product => { // get id from wishlist to get the product from Products obj
                                    if (item.id === product.id) {
                                        return (
                                            <div className="wishListItem col-md-6">
                                                <img src={product.img} alt="" />
                                                <div className="WishListIemCost">{product.price}</div>
                                            </div>
                                        )
                                    }
                                })
                            })
                            //  }
                        }
                        }
                    </ProductConsumer>
                </div>
            </div>
        );
    }
}

export default SideBar;