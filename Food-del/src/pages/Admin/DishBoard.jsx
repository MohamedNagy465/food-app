import React, { useContext, useState, useMemo, useEffect } from "react"; 
import { StoreContext } from "../../Context/StorContext";
import AOS from "aos";
import "aos/dist/aos.css";

function DishBoard() {
  const { food_list, addToCart } = useContext(StoreContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const filteredDishes = useMemo(() => {
    let filtered = food_list.filter((dish) =>
      dish.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (sortBy === "price") filtered = filtered.sort((a, b) => a.price - b.price);
    else filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    return filtered;
  }, [food_list, searchTerm, sortBy]);

  const effects = ["fade-up", "zoom-in", "flip-left"];

  return (
    <div className="container mx-auto px-4 py-10 overflow-hidden">
      <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">
        🍽️ Dish Dashboard
      </h1>

      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search dishes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-4 py-2 w-full sm:w-1/2"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded px-4 py-2 w-full sm:w-1/4"
        >
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
        </select>
      </div>

      {filteredDishes.length === 0 ? (
        <p className="text-gray-500 text-center">No dishes found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredDishes.map((dish, index) => (
            <div
              key={dish.id || dish._id}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center hover:scale-105 transition-transform"
              data-aos={effects[index % effects.length]} // تأثير متناوب
              data-aos-delay={index * 100}
            >
              <img
                src={dish.image}
                alt={dish.name}
                className="w-40 h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">{dish.name}</h3>
              <p className="text-orange-500 font-bold mt-2">${dish.price.toFixed(2)}</p>
              <button
                onClick={() => addToCart(dish.id || dish._id)}
                className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DishBoard;
