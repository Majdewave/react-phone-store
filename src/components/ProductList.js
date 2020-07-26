import React, { Component } from 'react';
import Product from './Product';
import { readdirSync } from 'fs';

import Title from './Title';
import { ProductConsumer } from '../context';
import Select from 'react-select';
import './Cart/css/productList.css';

import SideBar from './SideBar';


const options = [
    { value: '0', label: 'All categories' },
    { value: 'rings', label: 'Rings' },
    { value: 'necklace', label: 'Necklace' },
    { value: 'Earrings', label: 'Earrings' },
    { value: 'bracelet', label: 'Bracelet' }
];

class ProductList extends Component {
    // constructor() {
    //     super();
    //     this.state = {isChecked: false};
    //     this.handleChecked = this.handleChecked.bind(this); // set this, because you need get methods from CheckBox 
    //   }

    state = {
        selectedOption: 1,
        isChecked: false,
        isCheckedSize: false,
        itemSize: "false",
    };
    handleChange = selectedOption => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    };
    handleChecked = isChecked => {
        this.setState({ isChecked: !this.state.isChecked });
        // this.handleCheckedXXS();
    };
    handleCheckedSize = (size) => {
        this.setState({ isCheckedSize: !this.state.isCheckedSize, itemSize: size });
    };



    render() {
        const { selectedOption } = this.state;
        const { sortByPrice } = "";
        return (
            <React.Fragment>
                <div className="py-5 container custom-category col-md-12">
                    <SideBar />
                    <div className='row'>
                        <div className="FilteringContainer col-md-2">
                            <Select
                                value={selectedOption}
                                onChange={this.handleChange}
                                options={options}
                                className="FilterByCatigory"
                                isSearchable
                                placeholder="Choose category"
                            />
                            <div className="checkBoxAscending">
                                Sort by the low price
                               <input type="checkbox" defaultChecked={false} onChange={this.handleChecked} />
                            </div>

                            <div className="sizeFilter">
                                Size
                               <ul className="sizeOrder">
                                    <li><input type="checkbox" defaultChecked={false} onChange={() => this.handleCheckedSize("XXS")} /> XXS </li>
                                    <li><input type="checkbox" defaultChecked={false} onChange={() => this.handleCheckedSize("XS")} /> XS </li>
                                    <li><input type="checkbox" defaultChecked={false} onChange={() => this.handleCheckedSize("S")} /> S </li>
                                    <li><input type="checkbox" defaultChecked={false} onChange={() => this.handleCheckedSize("M")} /> M</li>
                                    <li><input type="checkbox" defaultChecked={false} onChange={() => this.handleCheckedSize("L")} /> L</li>
                                    <li><input type="checkbox" defaultChecked={false} onChange={() => this.handleCheckedSize("XL")} /> XL</li>
                                    <li><input type="checkbox" defaultChecked={false} onChange={() => this.handleCheckedSize("XXL")} /> XXL</li>
                                </ul>
                            </div>
                            <div className="colorFilter">
                                Color
                                <ul className="colorOrder">
                                    <li>  <input type="checkbox" defaultChecked={false} onChange={this.handleChecked} /> Black</li>
                                    <li>  <input type="checkbox" defaultChecked={false} onChange={this.handleChecked} /> Blue</li>
                                    <li>  <input type="checkbox" defaultChecked={false} onChange={this.handleChecked} /> Brown</li>
                                    <li>  <input type="checkbox" defaultChecked={false} onChange={this.handleChecked} /> Yellow</li>
                                    <li>  <input type="checkbox" defaultChecked={false} onChange={this.handleChecked} /> Red</li>
                                    <li>  <input type="checkbox" defaultChecked={false} onChange={this.handleChecked} /> Gray</li>
                                    <li>  <input type="checkbox" defaultChecked={false} onChange={this.handleChecked} /> Green</li>
                                    <li>  <input type="checkbox" defaultChecked={false} onChange={this.handleChecked} /> Orange</li>
                                    <li>  <input type="checkbox" defaultChecked={false} onChange={this.handleChecked} /> Pink</li>
                                    <li>  <input type="checkbox" defaultChecked={false} onChange={this.handleChecked} /> Purple</li>
                                    <li>  <input type="checkbox" defaultChecked={false} onChange={this.handleChecked} /> Navy blue</li>
                                    <li>  <input type="checkbox" defaultChecked={false} onChange={this.handleChecked} /> Sky blue</li>
                                    <li>  <input type="checkbox" defaultChecked={false} onChange={this.handleChecked} /> Rose red</li>
                                    <li>  <input type="checkbox" defaultChecked={false} onChange={this.handleChecked} /> Purple</li>
                                </ul>
                            </div>
                            Dresses Length
                            <ul className="sleeveLengthOrder">
                                <li className="sleeveOrderIcon">
                                    <img src="img/icons/floor_length.png" alt="" />
                                </li>
                                <li className="sleeveOrderIcon">
                                    <img src="img/icons/ankle_length.png" alt="" />
                                </li>
                                <li className="sleeveOrderIcon">
                                    <img src="img/icons/aboveKnee_mini.png" alt="" />
                                </li>
                                <li className="sleeveOrderIcon">
                                    <img src="img/icons/knee_length.png" alt="" />
                                </li>
                                <li className="sleeveOrderIcon">
                                    <img src="img/icons/med_calf.png" alt="" />
                                </li>
                            </ul>

                        </div>
                        <div className="padding"></div>
                        <div className="ProductsContainer col-md-9">
                            <Title name="Our" title="products" />
                            <div className="row">
                                {/* get data from provider which set in index.js */}
                                <ProductConsumer>
                                    {(value) => {
                                        var filteredProducts = value.products;
                                        // looping on Products object to return products
                                        if (this.state.isChecked) {
                                            value.products.sort((a, b) => a.price - b.price);
                                        }
                                        else {
                                            value.products.sort((a, b) => b.price - a.price);
                                        }

                                        if (this.state.isCheckedSize) {
                                            debugger;
                                            filteredProducts = value.filteredItems(this.state.itemSize);
                                            return filteredProducts.map(product => {
                                                //  this.test();
                                                if (product.category == this.state.selectedOption.value) {

                                                    return <Product key={product.id} product={product} />
                                                }
                                                if (this.state.selectedOption.value == undefined || this.state.selectedOption.value == "0") {
                                                    return <Product key={product.id} product={product} />
                                                }
                                            });
                                        }
                                        if (!this.state.isCheckedSize) {
                                            return value.products.map(product => {
                                                //  this.test();
                                                if (product.category == this.state.selectedOption.value) {

                                                    return <Product key={product.id} product={product} />
                                                }
                                                if (this.state.selectedOption.value == undefined || this.state.selectedOption.value == "0") {
                                                    return <Product key={product.id} product={product} />
                                                }
                                            });
                                        }
                                    }
                                    }
                                </ProductConsumer>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment >
            // <Product />
        );
    }
}

export default ProductList;