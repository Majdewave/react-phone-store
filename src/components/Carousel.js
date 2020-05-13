import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

class SlickSlider extends Component {
    render() {
        return (
            <Carousel showArrows={true} infiniteLoop={true} autoPlay={true} stopOnHover={true} showIndicators={true} showThumbs={true}>
                <div>
                    <img src="img/homePageSlider/fashionStyle.png" />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="img/homePageSlider/jewelry-business-names-small.png" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="img/homePageSlider/phone-accessories.png" />
                    <p className="legend">Legend 3</p>
                </div>
                <div>
                    <img src="img/homePageSlider/sport.png" />
                    <p className="legend">Legend 3</p>
                </div>
                <div>
                    <img src="img/homePageSlider/fun-in-the-sun-small.gif" />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
        );
    }
};

export default SlickSlider;