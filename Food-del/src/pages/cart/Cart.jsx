import React, { useContext, useEffect } from "react";
import { StoreContext } from "../../Context/StorContext";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function Cart() {
  const navigate = useNavigate();
  const {
    cartItems,
    food_list,
    addToCart,
    removeFromCart,
    getCartTotal,
    user,
    clearCart
  } = useContext(StoreContext);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">🛒 Your Cart</h2>
        <p className="text-gray-500 text-lg">
          Please sign in to see your cart items.
        </p>
      </div>
    );
  }

  const cartProducts = food_list.filter(
    (item) => cartItems[item._id] || cartItems[item.id]
  );

  return (
    <div className="container mx-auto px-4 py-10">
      <h2
        className="text-3xl font-bold text-gray-800 mb-2 text-center"
        data-aos="fade-up"
      >
        🛒 Your Cart
      </h2>
      <p
        className="text-center text-gray-500 mb-6"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        Welcome back, <span className="text-orange-500 font-semibold">{user.name}</span> 👋
      </p>

      {cartProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            alt="Empty cart"
            className="w-32 mb-4 opacity-80"
          />
          <p className="text-gray-500 text-lg">Your cart is currently empty.</p>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-2xl p-6 md:p-8 max-w-3xl mx-auto">
          <div className="flex flex-col gap-6">
            {cartProducts.map((item) => {
              const key = item._id || item.id;
              return (
                <div
                  key={key}
                  data-aos="fade-up"
                  className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-b-0"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-xl object-cover shadow-sm"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-orange-500 font-medium mt-1">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => removeFromCart(key)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 w-8 h-8 rounded-full text-lg flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="font-semibold text-gray-700 text-lg">
                      {cartItems[key]}
                    </span>
                    <button
                      onClick={() => addToCart(key)}
                      className="bg-orange-500 hover:bg-orange-600 text-white w-8 h-8 rounded-full text-lg flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between mt-6 border-t pt-6">
            <h3 className="text-xl font-semibold text-gray-800">Total</h3>
            <span className="text-2xl font-bold text-orange-500">
              ${getCartTotal().toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between mt-6 flex-wrap gap-4">
            <button
              onClick={clearCart}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold"
            >
              Clear Cart
            </button>
            <button
              onClick={() =>
                navigate("/placeOrder", {
                  state: { cartItems, totalPrice: getCartTotal() },
                })
              }
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2 rounded-full font-semibold"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
