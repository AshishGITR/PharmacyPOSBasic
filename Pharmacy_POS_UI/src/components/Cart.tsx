import React from "react";
import type { CartItem } from "../models/model";

interface Props {
  cart: CartItem[];
}

const Cart: React.FC<Props> = ({ cart }) => {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h3>Cart</h3>
      {cart.map((c, i) => (
        <div key={i}>
          <strong>{c.medicineName} </strong>{c.batchNumber} x {c.quantity} = ₹{c.price * c.quantity}
        </div>
      ))}
      <h3>Total: ₹{total}</h3>
    </div>
  );
};

export default Cart;