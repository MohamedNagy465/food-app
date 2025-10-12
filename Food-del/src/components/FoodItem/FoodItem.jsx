import React, { useContext } from "react";
import { StoreContext } from "../../Context/StorContext";
import { assets } from "../../assets/frontend_assets/assets";

const FoodItem = ({ id, name, price, image, description }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const itemCount = cartItems[id] || 0;

  return (
    <div
      key={id}
      className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl hover:scale-105 transition-transform duration-300
                 w-full sm:w-[250px] mx-auto"
    >
      {/* صورة الوجبة */}
      <img
        src={image}
        alt={name}
        className="w-full h-40 sm:h-48 object-cover"
      />

      {/* المحتوى */}
      <div className="p-3 sm:p-4 text-left">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800">{name}</h3>
          <img src={assets.rating_starts} alt="rating" className="h-3 sm:h-4" />
        </div>

        <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-orange-500 font-bold text-base sm:text-lg">
            ${price}
          </span>

          {/* أزرار العدد */}
          {itemCount === 0 ? (
            <button
              onClick={() => addToCart(id)}
              className="bg-orange-500 text-white text-xs sm:text-sm px-3 py-1 rounded-full hover:bg-orange-600 transition"
            >
              Add
            </button>
          ) : (
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => removeFromCart(id)}
                className="bg-gray-200 text-gray-700 px-2 rounded-full text-xs sm:text-sm font-bold hover:bg-gray-300"
              >
                -
              </button>
              <span className="font-semibold text-sm sm:text-base">{itemCount}</span>
              <button
                onClick={() => addToCart(id)}
                className="bg-gray-200 text-gray-700 px-2 rounded-full text-xs sm:text-sm font-bold hover:bg-gray-300"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
