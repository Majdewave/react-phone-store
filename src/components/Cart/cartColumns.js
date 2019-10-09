import React, { Component } from 'react';

function CartColumns() {

        return ( //d-none : display-none, d-lg-block: display only in large screen
            <div className="container-flued text-center d-none d-lg-block">
                <div className="row">
                    <div className="col-10 mx-auto col-lg-2">
                        <p className="text-appercase">products</p>
                    </div>
                    <div className="col-10 mx-auto col-lg-2">
                          <p className="text-appercase">product name</p>
                    </div>
                    <div className="col-10 mx-auto col-lg-2">
                        <p className="text-appercase">price</p>
                    </div>
                    <div className="col-10 mx-auto col-lg-2">
                        <p className="text-appercase">quantity</p>
                    </div>
                    <div className="col-10 mx-auto col-lg-2">
                        <p className="text-appercase">remove</p>
                    </div>
                    <div className="col-10 mx-auto col-lg-2">
                        <p className="text-appercase">Total</p>
                    </div>
                </div>
            </div>
        );
    }


export default CartColumns;