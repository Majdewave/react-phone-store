import React, { Component } from 'react';

import { Carousel } from 'react-responsive-carousel';

function ProductCarousel({ galleryImgSrc }) {
    return (
        <Carousel>
            <div>
                <img src={galleryImgSrc} />
                <p className="legend">Legend 1</p>
            </div>
            <div>
                <img src={galleryImgSrc} />
                <p className="legend">Legend 2</p>
            </div>
            <div>
                <img src={galleryImgSrc} />
                <p className="legend">Legend 3</p>
            </div>
        </Carousel>
    );
}

export default ProductCarousel;