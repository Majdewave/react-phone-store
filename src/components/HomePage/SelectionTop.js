import React, { Component } from 'react';

import { ProductConsumer } from "../../context";
import SelectionTopItem from './SelectionTopItem';

class SelectionTop extends Component {
    render() {
        return (
            <div className="Top-Selection subContainer">
                <div className="header">
                    <img className="CategoryIcon" src="img/icons/topSelection.png" alt="Shop our Top Selection" />
                    <span className="title">Selection Top</span>
                    <a className="viewMore">View more</a>
                </div>
                <ProductConsumer>
                    {value => {
                        const { selectionTop } = value;
                        return (
                            selectionTop.map(item => {
                                return <SelectionTopItem value={item} />
                            })
                        )
                    }}
                </ProductConsumer>
            </div>
        );
    }
}

export default SelectionTop;