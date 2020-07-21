import React, { Component } from 'react';

import { ProductConsumer } from "../context";
import { Link } from "react-router-dom";
import { ButtonContainer } from './Button';

import styled from 'styled-components';
import Gallery from './Gallery';
import Loader from './HomePage/loader.js'

class Details extends Component {
    render() {
        const imgUrlId = (window.location.href).split("=")[1];
        return (
            <ProductConsumer>
                {value => {
                    if (value.products[0] != "loading") {
                        const { id, company, img, info, price, title, inCart, itemSize, galleryImg } = value.handleDetail(Number.parseInt(imgUrlId));
                        debugger;
                        return (// py-5 : padding from top and bottom 
                            <DetailsContainer className="container details-container py-5">
                                {/* <div className="row">
                                    <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                                        <h1>{title}</h1>
                                    </div>
                                </div> */}

                                {/* product info*/}
                                <div className="row">
                                    <div className="col-md-4 imgContainer text-capitalize">
                                        <img src={img} className="img-fluid" alt="product" />
                                        <img src={galleryImg[0].src} className="img-fluid" alt="product" />

                                    </div>
                                    <div className="col-md-7 text-capitalize">
                                        <p className="productInfo">{info}</p>
                                        <h4 className="product-price">
                                            price: <span>$</span>{price}
                                        </h4>

                                        <h2>Model: {title}</h2>
                                        <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                                            made by: <span className="text-uppercase">
                                                {company}
                                            </span>
                                        </h4>

                                        <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                                            US Size: <span className="text-uppercase">
                                                {itemSize}
                                            </span>
                                        </h4>
                                        <p className="text-capitalize font-weight-bold mt-3 mb-0">
                                            some info about the product:
                                    </p>

                                        {/*buttons*/}
                                        <div>
                                            {/* <Link to="/">
                                                <ButtonContainer>
                                                    back to product
                                            </ButtonContainer>
                                            </Link> */}
                                            <span className="buyNow">
                                                <ButtonContainer>
                                                    Buy Now
                                            </ButtonContainer>
                                            </span>
                                            <ButtonContainer
                                                cart // passing props: sending cart value to the button container 
                                                // component to change this button color in styled component. look at Button component
                                                disabled={inCart ? true : false}
                                                onClick={() => {
                                                    value.addToCart(id);
                                                    value.openModal(id);
                                                }}
                                            >
                                                {inCart ? 'inCart' : 'add to cart'}
                                            </ButtonContainer>
                                        </div>
                                    </div>
                                    <div className="recomended col-md-1">
                                        Recomended for you
                                    </div>
                                </div>
                            </DetailsContainer>
                        )
                    }
                    else {
                        return <Loader />
                    }
                }}
            </ProductConsumer>
        );
    }
}


const DetailsContainer = styled.div`
background:#fff;

.img-fluid {
    transition: all 0.1s linear;
    cursor: zoom-out;
    width:320px;
}
.img-fluid:hover {
    transform: scale(1.2); 
}
.sizeMenu{
    width: 91px;
    border-radius: 5px;
    cursor: pointer;
    margin: 10px 0px 10px 0px;
}
.sizeMenu:hover{
    border-color: #d4c409;
}
`

export default Details;