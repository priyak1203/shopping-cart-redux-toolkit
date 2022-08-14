import React from 'react';
import { useDispatch } from 'react-redux';
import {
  decrease,
  increase,
  removeItem,
  toggleAmount,
} from '../features/cart/cartSlice';
import { ChevronDown, ChevronUp } from '../icons';

const CartItem = ({ id, title, price, img, amount }) => {
  const dispatch = useDispatch();

  return (
    <article className="cart-item">
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className="item-price">${price}</h4>
        {/* remove button */}
        <button className="remove-btn" onClick={() => dispatch(removeItem(id))}>
          remove
        </button>
      </div>
      <div className="btn-container">
        {/* increase amount */}
        <button
          className="amount-btn"
          onClick={() => dispatch(increase({ id }))}
          // onClick={() => dispatch(toggleAmount({ id, type: 'inc' }))}
        >
          <ChevronUp />
        </button>
        {/* amount */}
        <p className="amount">{amount}</p>
        {/* decrease amount */}
        <button
          className="amount-btn"
          onClick={() => {
            if (amount === 1) {
              dispatch(removeItem(id));
              return;
            }
            dispatch(decrease({ id }));
            // dispatch(toggleAmount({ id, type: 'dec' }));
          }}
        >
          <ChevronDown />
        </button>
      </div>
    </article>
  );
};

export default CartItem;
