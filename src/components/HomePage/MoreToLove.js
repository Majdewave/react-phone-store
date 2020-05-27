import React, { Component } from 'react';

import { ProductConsumer } from "../../context";
import Loader from './loader';
import MoreToLoveItem from './MoreToLoveItem';

class MoreToLove extends Component {

    render() {
        return (
            <div className="moreToLoveContainer col-md-12">
                <div className="header">
                    <span className="title">More To Love</span>
                </div>
                <ul>
                    <ProductConsumer>
                        {value => {
                            const { MoreToLove } = value;
                            return (
                                MoreToLove.map(item => {
                                    if (MoreToLove[0] == "loading") {
                                        return <Loader />
                                    }
                                    else {
                                        return <MoreToLoveItem value={item} />
                                    }
                                })
                            )
                        }}
                    </ProductConsumer>

                </ul>
            </div>
        );
    }
}

export default MoreToLove;