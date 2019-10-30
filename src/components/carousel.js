import React, { Component } from 'react';

import { Carousel } from 'react-responsive-carousel';

function ProductCarousel({ galleryImgSrc }) {
    console.log(galleryImgSrc);
    return (
        <Carousel>
            {galleryImgSrc.map(img => {
                return (
                    <div key={img.id}>
                        <img src={img.src} alt="imgAlt" />
                        <p className="legend">Legend 1</p>
                    </div>
                )
            })}

        </Carousel>
    );
}

export default ProductCarousel;