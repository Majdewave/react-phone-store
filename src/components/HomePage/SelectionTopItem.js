import React, { Component } from 'react';


function SelectionTopItem(item) {
    return (
        <div className="Category col-md-3">
            <div className="CategoryItem">
                <img src={item.value.img} alt="" />
                <div>{item.value.cost}</div>
            </div>
        </div>
    );
}

export default SelectionTopItem;