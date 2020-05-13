import React, { Component } from 'react';

import { ProductConsumer } from "../../context";
import FlashDealsItem from './FlashDealsItem';
import Loader from './loader';

class FlashDeals extends Component {
    render() {
        return (
            <div className="Top-Selection subContainer col-md-12">
                <div className="header">
                    <img className="CategoryIcon" src="img/icons/flashDeals.png" alt="Shop Flash Deals" />
                    <span className="title">Flash Deals</span>
                    <a className="viewMore">View more</a>
                </div>
                <ProductConsumer>
                    {value => {
                        const { flashDeals } = value;
                        return (
                            flashDeals.map(item => {
                                if (flashDeals[0] == "loading") {
                                    return <Loader />
                                }
                                else {
                                    return <FlashDealsItem value={item} />
                                }
                            })
                        )
                    }}
                </ProductConsumer>
            </div>
        );
    }
}

export default FlashDeals;