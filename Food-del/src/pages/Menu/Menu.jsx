import React, { useContext, useState, useMemo, useEffect } from "react";
import { StoreContext } from "../../Context/StorContext";
import toast from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";

function Menu() {
  const { food_list = [], addToCart } = useContext(StoreContext);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [loadingItem, setLoadingItem] = useState(null);

  const allCategories = ["All", ...new Set(food_list.map((i) => i.category || "Others"))];

  const filteredFood = useMemo(
    () =>
      food_list.filter(
        (i) =>
          i.name.toLowerCase().includes(search.toLowerCase()) &&
          (category === "All" || i.category === category) &&
          i.price >= priceRange[0] &&
          i.price <= priceRange[1]
      ),
    [food_list, search, category, priceRange]
  );

  const handleSearch = (e) => {
    const val = e.target.value;
    if (/^[a-zA-Z\u0600-\u06FF\s]*$/.test(val)) setSearch(val);
    else toast.error("❌ Letters only!");
  };

  const handleAddToCart = async (id) => {
    setLoadingItem(id);
    await new Promise((res) => setTimeout(res, 1000));
    addToCart(id);
    setLoadingItem(null);
  };

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    // Cleanup عند unmount لتجنب مشاكل destroy
    return () => {
      if (AOS && typeof AOS.refreshHard === "function") {
        AOS.refreshHard();
      }
    };
  }, []);

  return (
    <section className="container mx-auto px-6 py-30">
      <h2 className="text-3xl font-bold text-center mb-8 text-orange-500" data-aos="fade-up">
        🍽️ Our Menu
      </h2>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 flex-wrap" data-aos="fade-up">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleSearch}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/3 focus:outline-none focus:border-orange-500"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
        >
          {allCategories.map((c, i) => (
            <option key={i} value={c}>{c}</option>
          ))}
        </select>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-500">💲 Max:</label>
          <input
            type="range"
            min="0"
            max="100"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, +e.target.value])}
            className="w-40 accent-orange-500"
          />
          <span className="text-sm text-gray-600">${priceRange[1]}</span>
        </div>
        <button
          onClick={() => {
            setSearch("");
            setCategory("All");
            setPriceRange([0, 100]);
            toast.success("✅ Reset done!");
          }}
          className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          Reset
        </button>
      </div>

      <p className="text-gray-600 text-sm mb-4 text-center" data-aos="fade-up">
        Showing {filteredFood.length} dishes
      </p>

      {filteredFood.length === 0 ? (
        <p className="text-center text-gray-500 mt-10" data-aos="fade-up">
          😔 No dishes found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFood.map((i, idx) => (
            <div
              key={i.id || i._id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <img
                src={i.image}
                alt={i.name}
                className="rounded-lg h-48 w-full object-cover mb-3"
              />
              <h3 className="text-lg font-semibold">{i.name}</h3>
              <p className="text-gray-500 text-sm">{i.category}</p>
              <p className="text-orange-500 font-bold mt-2">${i.price}</p>

              <button
                onClick={() => handleAddToCart(i.id || i._id)}
                disabled={loadingItem === (i.id || i._id)}
                className={`mt-3 w-full bg-orange-500 text-white py-2 rounded-lg transition ${
                  loadingItem === (i.id || i._id)
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-orange-600"
                }`}
              >
                {loadingItem === (i.id || i._id) ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Adding...
                  </span>
                ) : (
                  "Add to Cart 🛒"
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Menu;
