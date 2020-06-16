import React, { Component } from 'react';

function WishList({ returnIcon }) {
    if (returnIcon == true) {
        debugger;
        return (
            <img alt="" className="submit12" src="img/icons/wishList-submit.png" />
        );
    }
    else {
        return (
            <React.Fragment>
                <img alt="" className="hover" src="img/icons/wishList-hover.png" />
                <img alt="" className="cartHover" src="img/icons/wishList.png" />
                <img alt="" className="submit hide" src="img/icons/wishList-submit.png" />
            </React.Fragment>
        );
    }

}

export default WishList;