import React, { Component } from 'react';
import Product from './Product';
import { readdirSync } from 'fs';

import Title from './Title';
import { ProductConsumer } from '../context';
import Select from 'react-select';


const options = [
    { value: '0', label: 'כל הקטיגוריות' },
    { value: 'rings', label: 'rings' },
    { value: 'necklace', label: 'necklace' },
    { value: 'Earrings', label: 'Earrings' },
    { value: 'bracelet', label: 'bracelet' }
];

class ProductList extends Component {
    state = {
        selectedOption: 1,
    };
    handleChange = selectedOption => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    };

    render() {
        const { selectedOption } = this.state;

        return (
            <React.Fragment>
                <div className="py-5">
                    <Select
                        value={selectedOption}
                        onChange={this.handleChange}
                        options={options}
                        className="FilterByCatigory col-md-3"
                        isSearchable
                        placeholder="Filter by key"
                    />
                    <div className="container">
                        <Title name="Our" title="products" />

                        <div className="row">
                            {/* get data from provider which set in index.js */}
                            <ProductConsumer>
                                {value => {
                                    // looping on Products object to return products
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