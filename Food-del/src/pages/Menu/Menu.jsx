import React, { useContext, useState, useMemo, useEffect } from "react";
import { StoreContext } from "../../Context/StorContext";
import toast from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";

function Menu() {
  const { food_list, addToCart } = useContext(StoreContext);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 100]);

  const allItems = food_list;
  const allCategories = ["All", ...new Set(allItems.map((item) => item.category || "Others"))];

  const filteredFood = useMemo(() => {
    return allItems.filter((item) => {
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === "All" || item.category === category;
      const matchPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
      return matchSearch && matchCategory && matchPrice;
    });
  }, [allItems, search, category, priceRange]);

  const handleAddToCart = (id) => {
    addToCart(id);
  };

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setPriceRange([0, 100]);
    toast("🔄 Filters reset!", {
      icon: "✅",
      style: { background: "#333", color: "#fff", borderRadius: "10px" },
    });
  };

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="container mx-auto px-6 py-30">
      <h2 className="text-3xl font-bold text-center mb-8 text-orange-500" data-aos="fade-up">
        🍽️ Our Menu
      </h2>

      {/* الفلاتر */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 flex-wrap" data-aos="fade-up">
        <input
          type="text"
          placeholder="Search for a dish..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/3 focus:outline-none focus:border-orange-500"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
        >
          {allCategories.map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </select>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-500">💲 Max Price:</label>
          <input
            type="range"
            min="0"
            max="100"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
            className="w-40 accent-orange-500"
          />
          <span className="text-sm text-gray-600">${priceRange[1]}</span>
        </div>
        <button
          onClick={resetFilters}
          className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          Reset Filters
        </button>
      </div>

      {/* عدد النتائج */}
      <p className="text-gray-600 text-sm mb-4 text-center" data-aos="fade-up">
        Showing {filteredFood.length} dishes
      </p>

      {/* عرض النتائج */}
      {filteredFood.length === 0 ? (
        <p className="text-center text-gray-500 mt-10" data-aos="fade-up">
          😔 No dishes match your filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFood.map((item, index) => (
            <div
              key={item.id || item._id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <img
                src={item.image}
                alt={item.name}
                className="rounded-lg h-48 w-full object-cover mb-3"
              />
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-500 text-sm">{item.category}</p>
              <p className="text-orange-500 font-bold mt-2">${item.price}</p>
              <button
                onClick={() => handleAddToCart(item.id || item._id)}
                className="mt-3 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
              >
                Add to Cart 🛒
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Menu;
