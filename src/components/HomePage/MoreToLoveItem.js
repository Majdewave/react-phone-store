import React, { Component } from 'react';

import Loader from './loader';

function MoreToLoveItem(item) {
    if (item.value == "loading") {
        return <Loader />
    }
    else {
        if (item.value.IsInSale) {
            return (
                <li className="item col-md-2" key={item.value.id}>
                    <div>
                        <img src={item.value.img} alt="utomatic Foam Soap Dispenser" />
                        <div className="text">
                            <span className="isSale">SALE</span>
                            <span className="cost">{item.value.cost}</span>
                        </div>
                    </div>
                </li>
            );
        }
        else {
            return (
                <li className="item col-md-2" key={item.value.id}>
                    <div>
                        <img src={item.value.img} alt="utomatic Foam Soap Dispenser" />
                        <div className="text">
                            <span className="cost">{item.value.cost}</span>
                        </div>
                    </div>
                </li>
            );
        }

    }
}

export default MoreToLoveItem;