import React, { Component } from 'react';

import styled from "styled-components";
import {Link} from "react-router-dom";
import {ProductConsumer} from "../context";
import { conditionalExpression } from '@babel/types';

import { FaShoppingCart } from "react-icons/fa";
import PropTypes from 'prop-types';


class Product extends Component {
    render() {
        const{id,title,img,price,inCart}=this.props.product;
        return (
            <ProductWrapper className="col-9 mx-auto com-md-6 col-lg-3 my-3">
                <div className="card">
                    <ProductConsumer>
                        {/* productConsuemr is the way to access values globaly. now we are updating product details by click */}
                    {(value)=>(<div className="img-container p-5" 
                    onClick={()=>
                        value.handleDetail(id)
                    }>
                        <Link to="/details">
                            <img src={img} className="card-img-top" alt="product" />
                        </Link>
                        {/* if inCart value from data.js tre then return true(means disabled = true), if it false then return false */}
                        <button className="cart-btn" disabled={inCart?true:false}
                             onClick={()=>{
                                value.addToCart(id);
                                value.openModal(id);
                             }}>
                            {/* if inCart = true */}
                            {inCart?(
                            <p className="text-capitalize mb-0" disabled> 
                                in Cart </p>):(<i className="">No font Awesome icon</i>&&<FaShoppingCart />)}
                        </button>
                    </div>)}
                    </ProductConsumer>
                    {/* card footer */}
                    <div className="card-footer d-flex justify-content-between">
                            <p className="align-left-center mb-0">
                                {title}
                            </p>
                            <h5 className="text-blue font-italic mb-0">
                                <span className="mr-1">$</span>
                                {price}
                            </h5>
                    </div>
                </div>
            </ProductWrapper>
        );
    }
}

export default Product;



Product.propTypes={ // validation by react propTypes
    product:PropTypes.shape({
        id:PropTypes.number,
        img:PropTypes.string,
        price:PropTypes.number,
        inCart:PropTypes.bool
    }).isRequired
}

const ProductWrapper = styled.div`
.card{
border-color:var(--mainWhite);
transition: all 1s linear;
}
.card-footer{
    background:transparent;
    border-top:transparent;
    transition: all 1s linear;
}
&:hover{
    .card{
        border:0.04rem solid #ffd400;
        box-shadow: 2px 2px 5px 0px #ffd400;
    }
    .card-footer{
        background:rgba(274,274,274);
    }
}
.img-container{
    position:relative;
    overflow:hidden;
}
.img-container:hover .card-img-top{
    transform: scale(1.2); 
}
.card-img-top{
    transition: all 1s linear;
}
.cart-btn{
    position:absolute;
    bottom:0;
    right:0;
    padding:0.2rem 0.4rem;
    background:var(--mainGold);
    border:0;
    color:var(--mainWhite);
    font-size:1.4rem;
    border-radius:0.5rem 0 0 0;
    transform:translate(100%,100%);
    transition: all 1s linear;
}
.img-container:hover .cart-btn{
    transform:translate(0,0);
}
.cart-btn:hover{
    color:var(--mainBlue);
    cursor:pointer;
}
`