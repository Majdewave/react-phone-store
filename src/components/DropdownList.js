import React, { Component } from 'react';

import { Link } from 'react-router-dom';
class DropdownList extends Component {
    render() {
        return (
            <ul className="dropdownHover">
                {/* <Link to="/" className="nav-link"></Link> */}
                <li><div className="icon womenFashion"></div><Link to="ProductList" className="subTitle womenFashion">Women's Fashion</Link></li>
                <li><div className="icon menFashion"></div><a className="subTitle menFashion" href="">Men's Fashion</a></li>
                <li><div className="icon jewelry"></div><a className="subTitle jewelry" href="">Jewelry</a></li>
                <li><div className="icon bagsShoes"></div><a className="subTitle bagsShoes" href="">Bags & Shoes</a></li>
                <li><div className="icon Electronics"></div><a className="subTitle Electronics" href="">Consumer Electronics</a></li>
                <li><div className="icon Security"></div><a className="subTitle Security & Protection" href="">Security & Protection</a></li>
                <li><div className="icon Sports"></div><a className="subTitle Sports & Entertainment" href="">Sports & Entertainment</a></li>
                <li><div className="icon Home"></div><a className="subTitle Home & Garden" href="">Home & Garden</a></li>
                <li><div className="icon Phones"></div><a className="subTitle Phones-Accessories" href="">Phones & Accessories</a></li>



            </ul >
        );
    }
}

export default DropdownList;