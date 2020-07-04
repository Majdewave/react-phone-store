import React, { Component } from 'react';

import styled from "styled-components";
import { Link } from "react-router-dom";
import { ProductConsumer } from "../context";
import { conditionalExpression } from '@babel/types';

import { FaShoppingCart } from "react-icons/fa";
import PropTypes from 'prop-types';
import './Cart/css/product.css';
import WishList from './WishList';

class Product extends Component {
    render() {
        const { id, title, img, price, inCart, wishListActive } = this.props.product;
        return (
            <div className="col-9 mx-auto com-md-6 col-lg-3 my-3">
                <div className="card" id={id}>
                    <ProductConsumer>
                        {/* productConsuemr is the way to access values globaly. now we are updating product details by click */}
                        {value => (
                            <div className='img-container'
                                onClick={() =>
                                    value.handleDetail(id)
                                }>

                                <Link to={"/details?id=" + id}>
                                    <img src={img} className="card-img-top" alt="product" />
                                </Link>
                                <span className={"wish-List-icon"}
                                    onClick={() =>
                                        value.addToWishList(id)

                                    }
                                >
                                    <WishList storeProduct={this.props.product} wishList={value.wishList} />
                                </span>
                                {/*   <button className="cart-btn" disabled={inCart ? true : false}
                                onClick={() => {
                                    value.addToCart(id);
                                    value.openModal(id);
                                }}>
                                {inCart ? (
                                    <p className="text-capitalize mb-0" disabled>
                                        in Cart </p>) : (<i className="">No font Awesome icon</i> && <FaShoppingCart />)}
                                </button>*/}
                            </div>)}
                    </ProductConsumer>
                    {/* card footer */}
                    <div className="card-footer">
                        <p className="item-title">
                            {title}
                        </p>
                        <h5 className="cost">
                            <span className="mr-1">$</span>
                            {price}
                        </h5>
                        <div className='shipping-value'>FreeShipping</div>
                        <img className="rating-icon" src="img/icons/star-icon.png" alt="" />
                        <div className="rating">4.9</div>
                        <div className="sold-num">
                            <span className="soldItemsNum">279</span>
                            <span>Sold</span>
                        </div>
                        <div className="store-name">Zohra Official Store</div>
                    </div>
                </div>
            </div >
        );
    }
}

export default Product;



Product.propTypes = { // validation by react propTypes
    product: PropTypes.shape({
        id: PropTypes.number,
        img: PropTypes.string,
        price: PropTypes.number,
        inCart: PropTypes.bool

    }).isRequired
}


    // const ProductWrapper = styled.div`
    // .card{
    // border-color:var(--mainWhite);
    // transition: all 1s linear;
    // }
    // .card-footer{
    //     background:transparent;
    //     border-top:transparent;
    //     transition: all 1s linear;
    // }
    // &:hover{
    //     .card{
    //         border:0.04rem solid #ffd400;
    //         box-shadow: 2px 2px 5px 0px #ffd400;
    //     }
    //     .card-footer{
    //         background:rgba(274,274,274);
    //     }
    // }
    // .img-container{
    //     position:relative;
    //     overflow:hidden;
    // }
    // .img-container:hover .card-img-top{
    //     transform: scale(1.2); 
    // }
    // .card-img-top{
    //     transition: all 1s linear;
    // }
    // .cart-btn{
    //     position:absolute;
    //     bottom:0;
    //     right:0;
    //     padding:0.2rem 0.4rem;
    //     background:var(--mainGold);
    //     border:0;
    //     color:var(--mainWhite);
    //     font-size:1.4rem;
    //     border-radius:0.5rem 0 0 0;
    //     transform:translate(100%,100%);
    //     transition: all 1s linear;
    // }
    // .img-container:hover .cart-btn{
    //     transform:translate(0,0);
    // }
    // .cart-btn:hover{
    //     color:var(--mainBlue);
    //     cursor:pointer;
    // }
    //`