import React, { Component } from 'react';

import { ProductConsumer } from "../context";
import { Link } from "react-router-dom";
import { ButtonContainer } from './Button';

import styled from 'styled-components';
import ProductGallery from './imageGallery';


class Details extends Component {
    render() {
        return (
            <ProductConsumer>
                {value => {
                    // console.log(value.detailProduct);
                    const { id, company, img, info, price, title, inCart, itemSize, galleryImg } = value.detailProduct; // detailProduct from data.js
                    console.log(galleryImg);
                    return (// py-5 : padding from top and bottom 
                        <DetailsContainer className="container py-5">
                            {/*title*/}
                            <div className="row">
                                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                                    <h1>{title}</h1>

                                </div>
                            </div>
                            {/*End title */}

                            {/* product info*/}
                            <div className="row">
                                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                    {/* <img src={img} className="img-fluid" alt="product" /> */}
                                    <ProductGallery galleryImgSrc={galleryImg} />

                                </div>
                                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                    <h2>Model: {title}</h2>
                                    <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                                        made by: <span className="text-uppercase">
                                            {company}
                                        </span>
                                    </h4>

                                    <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                                        Sizes: <span className="text-uppercase">
                                            {itemSize}
                                        </span>
                                    </h4>

                                    <h4 className="text-blue">
                                        price: <span>$</span>{price}
                                    </h4>
                                    <p className="text-capitalize font-weight-bold mt-3 mb-0">
                                        some info about the product:
                                    </p>
                                    <p className="text-muted lead">{info}</p>

                                    {/*buttons*/}
                                    <div>
                                        <Link to="/">
                                            <ButtonContainer>
                                                back to product
                                            </ButtonContainer>
                                        </Link>
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

                            </div>
                        </DetailsContainer>
                    )
                }}
            </ProductConsumer>
        );
    }
}


const DetailsContainer = styled.div`
background:#fff;

.img-fluid {
    transition: all 0.5s linear;
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