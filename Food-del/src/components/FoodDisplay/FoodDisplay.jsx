import React, { useContext } from "react";
import { StoreContext } from "../../Context/StorContext";
import FoodItem from "../FoodItem/FoodItem";

function FoodDisplay() {
  const { food_list } = useContext(StoreContext);

  return (
    <div className="px-6 py-10">
      <h2 className="text-2xl font-bold text-orange-600 mb-6">🍽️ Our Delicious Menu</h2>

      {food_list.length === 0 ? (
        <p className="text-gray-500 text-lg">No meals available.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {food_list.map((item) => (
            <FoodItem
              key={item.id || item._id}
              id={item.id || item._id}
              name={item.name}
              image={item.image}
              price={item.price}
              description={item.description || ""}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FoodDisplay;
