import React, { Component } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

class Gallery extends Component {
    state = {
        galleryItems: [1, 2, 3].map((i) => <h2 key={i}>{i}</h2>),
    }

    render() {
        return (
            <React.Fragment>

            </React.Fragment>
        )
    }
}
export default Gallery;