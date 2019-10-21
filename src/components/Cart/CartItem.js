import React from 'react';
import ReactDOM from 'react-dom';
import { FaTrashAlt } from 'react-icons/fa'


function CartItem({ item, value }) {
    const { id, title, img, price, total, count, itemSize } = item;
    const { increment, decrement, removeItem } = value;


    return (
        <div className="orderedItemContainer row my- text-capitalize text-center">
            <div className="col-10 max-auto col-lg-2">
                <img src={img}
                    style={{ width: "5rem", height: "5rem" }}
                    className="img-fluid"
                    alt="product" />
            </div>
            <div className="col-10 max-auto col-lg-2">
                <span className="d-lg-none">product : </span>
                {title}
            </div>
            <div className="col-10 max-auto col-lg-1">
                <span className="d-lg-none">size : </span>

                <select className="sizeMenu" onChange={(e) => {
                    value.selectHandleChange(e.target.value)
                }}>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>

            </div>




            <div className="col-10 max-auto col-lg-1">
                <span className="d-lg-none">price : </span>
                {price}
            </div>
            <div className="col-10 max-auto col-lg-2 my-2 my-lg-0">
                <div className="d-flex justify-content-around">
                    <div>
                        <span className="btn btn-black mx-1" onClick={() => decrement(id)}>-</span>
                        <span className="btn btn-black mx-1" >{count}</span>
                        <span className="btn btn-black mx-1" onClick={() => increment(id)}>+</span>
                    </div>
                </div>
            </div>
            <div className="col-10 max-auto col-lg-2">
                <div className="cart-icon" onClick={() => removeItem(id)}>
                    <FaTrashAlt />
                </div>
            </div>
            <div className="col-10 max-auto col-lg-2">
                <strong>item total :  {total}</strong>
            </div>
        </div>

    );
}


export default CartItem;