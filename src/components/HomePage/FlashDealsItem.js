import React, { Component } from 'react';

import { ProductConsumer } from "../../context";

function FlashDealsItem(item) {
    return (
        <React.Fragment>
            <div className="Category col-md-3">
                <div className="CategoryItem">
                    <img src={item.value.img} alt="" />
                    <div className="pro-price">
                        <span className="current-price">{item.value.cost}</span>
                        <span className="discount">{item.value.off} off</span>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default FlashDealsItem;