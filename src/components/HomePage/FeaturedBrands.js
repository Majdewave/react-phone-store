
import React, { Component } from 'react';

import { ProductConsumer } from "../../context";
import FeaturedBrandsItem from './FeaturedBrandsItem.js';
import Loader from './loader';

class FeaturedBrands extends Component {
    render() {
        return (
            <div className="Featured-Brands subContainer">
                <div className="header">
                    <img className="CategoryIcon" src="img/icons/brands.png" alt="Featured Brands" />
                    <span className="title">Featured Brands</span>
                    <a className="viewMore">View more</a>
                </div>
                <ProductConsumer>
                    {value => {
                        const { FeaturedBrands } = value;
                        return (
                            FeaturedBrands.map(item => {
                                return <FeaturedBrandsItem value={item} />
                            })
                        )
                    }}
                </ProductConsumer>
            </div>
        );
    }
}

export default FeaturedBrands;