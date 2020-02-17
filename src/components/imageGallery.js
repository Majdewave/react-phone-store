import React, { Component } from 'react';

import ImageGallery from 'react-image-gallery';

import "react-image-gallery/styles/scss/image-gallery.scss";


export default function ProductGallery({ galleryImgSrc }) {
    return <ImageGallery items={galleryImgSrc} />;
}
