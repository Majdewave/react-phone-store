import React, { Component } from 'react';

function FeaturedBrandsItem(item) {
    return (
        <React.Fragment>
            <div className="Category col-md-6">
                <div className="CategoryItem">
                    <img src={item.value.img} alt="" />
                    <ul className="smallPics flex">
                        <li><img src={item.value.smallImg1} alt="" /></li>
                        <li><img src={item.value.smallImg2} alt="" /></li>
                        <li><img src={item.value.smallImg3} alt="" /></li>
                    </ul>
                </div>
                <div>US $7.53</div>
            </div>
        </React.Fragment>
    );
}

export default FeaturedBrandsItem;