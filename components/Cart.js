import React from "react";

const Cart = ({ bgimage, count }) => {
  return (
    <div  >
      <h3>Cart</h3>
      <hr />
      <div>
        {count > 0 ? (
          <div >
            <div >
              {/* {bgimage.map(({ image, id }) => (
                <img src={image} key={id} alt="bg-img" />
              ))} */}
              <div>
                <p>Fall Limited Edition Sneakers</p>
                <p>
                  $125 x {count} <span>${125 * count}</span>
                </p>
              </div>
            </div>
            <button> Checkout</button>
          </div>
        ) : (
          <p >Your cart is empty</p>
        )}
      </div>
    </div>
  );
};

export default Cart;