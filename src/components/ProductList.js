import React, { Component } from 'react';
import Product from './Product';
import { readdirSync } from 'fs';

import Title from './Title';
import { ProductConsumer } from '../context';
import Select from 'react-select';



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
    };
    handleChange = selectedOption => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    };
    handleChecked = isChecked => {
        this.setState({ isChecked: !this.state.isChecked });
    };


    render() {
        const { selectedOption } = this.state;


        const { sortByPrice } = "";
        return (
            <React.Fragment>
                <div className="py-5">
                    <Select
                        value={selectedOption}
                        onChange={this.handleChange}
                        options={options}
                        className="FilterByCatigory col-md-2"
                        isSearchable
                        placeholder="Choose category"
                    />
                    <div className="col-md-2 checkBoxAscending">
                        Ascending
                       <input type="checkbox" defaultChecked={false} onChange={this.handleChecked} />

                    </div>

                    <div className="container">
                        <Title name="Our" title="products" />

                        <div className="row">
                            {/* get data from provider which set in index.js */}
                            <ProductConsumer>
                                {value => {
                                    // looping on Products object to return products
                                    if (this.state.isChecked) {
                                        value.products.sort((a, b) => a.price - b.price);
                                    }
                                    else {
                                        value.products.sort((a, b) => b.price - a.price);
                                    }
                                    return value.products.map(product => {
                                        //  this.test();

                                        if (product.category == this.state.selectedOption.value) {

                                            return <Product key={product.id} product={product} />
                                        }
                                        if (this.state.selectedOption.value == undefined || this.state.selectedOption.value == "0") {
                                            return <Product key={product.id} product={product} />
                                        }

                                    });
                                }}
                            </ProductConsumer>
                        </div>
                    </div>
                </div>
            </React.Fragment>
            // <Product />
        );
    }
}

export default ProductList;