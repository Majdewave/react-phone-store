import React, { Component } from 'react';
import Product from './Product';
import { readdirSync } from 'fs';

import Title from './Title';
import {ProductConsumer} from '../context';

class ProductList extends Component {

    render() {

        return (
            <React.Fragment>
                <div className="py-5">
                    <div className="container">
                        <Title name="Our" title="products" />

                        <div className="row">
                            {/* get data from provider which set in index.js */}
                            <ProductConsumer>
                            {value=>{
                                // return <h1>{value}</h1> // the value is an object we can't get it like that
                                console.log(value);
                                // looping on Products object to return products
                                return value.products.map(product=>{
                                    return <Product key={product.id} product={product}/>
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