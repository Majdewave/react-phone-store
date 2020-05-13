import React, { Component } from 'react';

class Loader extends Component {
    render() {
        return (
            <div className="loader">
                <img src="img/Shopping Loader_files/shoppingLoader.gif" alt="" />
                <div><h6>loading...</h6></div>
            </div>
        );
    }
}

export default Loader;