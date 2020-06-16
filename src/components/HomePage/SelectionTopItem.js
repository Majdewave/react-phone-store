import React, { Component } from 'react';

import Loader from './loader';

function SelectionTopItem(item) {
    if (item.value == "loading") {
        return <Loader />
    }
    else {
        return (
            <div className="Category col-md-3">
                <div className="CategoryItem">
                    <img src={item.value.img} alt="" />
                    <div>{item.value.cost}</div>
                </div>
            </div>
        );
    }
}

export default SelectionTopItem;