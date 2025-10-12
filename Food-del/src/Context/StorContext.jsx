import React, { createContext, useState, useEffect, useMemo } from "react";
import { food_list as defaultFoodList } from "../assets/frontend_assets/assets";
import toast from "react-hot-toast";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [foodList, setFoodList] = useState(defaultFoodList);

  // تحميل منتجات الأدمن
  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(savedProducts);
  }, []);

  const saveProducts = (updated) => {
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
  };

  const generateUniqueId = () => `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

  const addProduct = (product) => {
    const exists = products.find((p) => p.name.toLowerCase() === product.name.toLowerCase());
    if (exists) {
      toast.error("⚠️ This product already exists!");
      return;
    }
    const newProduct = { ...product, id: generateUniqueId() };
    saveProducts([...products, newProduct]);
    toast.success("✅ Product added successfully!");
  };

  const deleteProduct = (id) => {
    saveProducts(products.filter((p) => p.id !== id));
    toast.success("🗑️ Product deleted!");
  };

  const updateProduct = (id, updatedData) => {
    saveProducts(products.map((p) => (p.id === id ? { ...p, ...updatedData } : p)));
    toast.success("✅ Product updated!");
  };

  const updateFoodItem = (id, updatedData) => {
    setFoodList((prev) =>
      prev.map((item) => (item.id === id || item._id === id ? { ...item, ...updatedData } : item))
    );
    toast.success("✅ Food item updated!");
  };

  // دمج foodList و products بشكل آمن لكل عنصر فريد
  const allFoodItems = useMemo(() => {
    const map = new Map();

    // أضف كل عناصر foodList
    foodList.forEach((item) => {
      map.set(item.id || item._id || generateUniqueId(), { ...item });
    });

    // أضف أو حدث منتجات الأدمن
    products.forEach((p) => {
      const key = p.id || generateUniqueId();
      map.set(key, { ...p });
    });

    return Array.from(map.values());
  }, [foodList, products]);

  // مزامنة السلة عند تغير المستخدم
  useEffect(() => {
    if (!user) {
      setCartItems({});
      return;
    }
    const savedCarts = JSON.parse(localStorage.getItem("userCarts")) || {};
    setCartItems(savedCarts[user.email] || {});
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const savedCarts = JSON.parse(localStorage.getItem("userCarts")) || {};
    savedCarts[user.email] = cartItems;
    localStorage.setItem("userCarts", JSON.stringify(savedCarts));
  }, [cartItems, user]);

  const addToCart = (id) => {
    if (!user) {
      toast.error("❌ Please sign in to add items to your cart!");
      return;
    }
    setCartItems((prev) => ({ ...prev, [id]: prev[id] ? prev[id] + 1 : 1 }));
    toast.success("✅ Item added to cart!");
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => {
      if (!prev[id]) return prev;
      const newCart = { ...prev };
      newCart[id] -= 1;
      if (newCart[id] <= 0) delete newCart[id];
      toast.error("🗑️ Item removed from cart!");
      return newCart;
    });
  };

  const getCartCount = () => Object.values(cartItems).reduce((acc, curr) => acc + curr, 0);

  const getCartTotal = () =>
    Object.entries(cartItems).reduce((total, [id, count]) => {
      const item = allFoodItems.find((f) => f.id === id || f._id === id);
      return total + (item ? item.price * count : 0);
    }, 0);

  const login = (email, role = "user") => {
    const newUser = { email, role };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    toast.success(`👋 Welcome ${role === "admin" ? "Admin" : "User"}!`);
  };

  const logout = () => {
    if (user) {
      const savedCarts = JSON.parse(localStorage.getItem("userCarts")) || {};
      savedCarts[user.email] = cartItems;
      localStorage.setItem("userCarts", JSON.stringify(savedCarts));
    }
    setUser(null);
    setCartItems({});
    localStorage.removeItem("user");
    toast.success("✅ Logged out successfully!");
  };

  return (
    <StoreContext.Provider
      value={{
        food_list: allFoodItems, // هذا الآن ديناميكي ويحدث render في Home و Menu
        foodList,
        updateFoodItem,
        products,
        addProduct,
        deleteProduct,
        updateProduct,
        cartItems,
        addToCart,
        removeFromCart,
        getCartCount,
        getCartTotal,
        user,
        setUser,
        login,
        logout,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
