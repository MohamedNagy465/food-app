import React, { useState, useMemo, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StorContext";
import toast from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";

function PlaceOrder() {
  const { setCartItems, food_list = [] } = useContext(StoreContext);
  const location = useLocation();
  const navigate = useNavigate();

  const { cartItems = {}, totalPrice } = location.state || {};

  // 🔁 Redirect if cart is empty
  useEffect(() => {
    if (!cartItems || Object.keys(cartItems).length === 0) {
      navigate("/");
    }
  }, [cartItems, navigate]);

  const productsInCart = useMemo(
    () => food_list.filter((item) => cartItems[item._id] || cartItems[item.id]),
    [cartItems, food_list]
  );

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // ✅ Allow only letters in the name
    if (name === "name") {
      if (/^[a-zA-Z\s]*$/.test(value)) {
        setCustomer({ ...customer, [name]: value });
      }
    } else {
      setCustomer({ ...customer, [name]: value });
    }

    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const newErrors = {};

    if (!customer.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(customer.name)) {
      newErrors.name = "Name must contain letters only";
    }

    if (!customer.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!customer.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^01[0|1|2|5][0-9]{8}$/.test(customer.phone)) {
      newErrors.phone = "Enter a valid Egyptian phone number";
    }

    if (!customer.address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validate()) return;

    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedUser) {
      toast.error("⚠️ Please log in to confirm your order.");
      return;
    }

    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {
      id: Date.now(),
      customer: loggedUser.name || loggedUser.email.split("@")[0],
      customerEmail: loggedUser.email,
      total: totalPrice,
      status: "Pending",
      items: productsInCart.map((item) => ({
        id: item._id || item.id,
        name: item.name,
        price: item.price,
        quantity: cartItems[item._id] || cartItems[item.id],
      })),
    };

    localStorage.setItem("orders", JSON.stringify([...savedOrders, newOrder]));
    setCartItems({});
    toast.success("✅ Order placed successfully!");
    navigate("/OrderSuccess", { state: { orderId: newOrder.id } });
    window.dispatchEvent(new Event("ordersUpdated"));
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-2xl mt-10 border border-gray-100">
      <h2 className="text-3xl font-bold mb-8 text-center text-orange-600">
        🛒 Confirm Your Order
      </h2>

      {productsInCart.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {productsInCart.map((item) => {
              const quantity = cartItems[item._id] || cartItems[item.id];
              return (
                <div
                  key={item._id || item.id}
                  data-aos="fade-up"
                  className="border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-lg transition-all bg-gray-50"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-32 object-cover rounded-lg mx-auto mb-4"
                  />
                  <h3 className="font-semibold text-lg text-center text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-orange-500 font-bold text-center">
                    ${item.price}
                  </p>
                  <p className="text-center text-gray-600">Qty: {quantity}</p>
                  <p className="text-center font-semibold mt-2 text-gray-700">
                    Total: ${item.price * quantity}
                  </p>
                </div>
              );
            })}
          </div>

          <h3 className="text-xl font-bold mb-6 text-right text-gray-800">
            Grand Total:{" "}
            <span className="text-orange-600">${totalPrice}</span>
          </h3>

          <div className="space-y-5 mb-8">
            {["name", "email", "phone", "address"].map((field) => (
              <div key={field}>
                {field !== "address" ? (
                  <input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    placeholder={
                      field === "name"
                        ? "Full Name (letters only)"
                        : field === "email"
                        ? "Email Address"
                        : "Phone Number (Egypt only)"
                    }
                    value={customer[field]}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors[field]
                        ? "border-red-500 focus:ring-red-400"
                        : "focus:ring-orange-400"
                    }`}
                  />
                ) : (
                  <textarea
                    name="address"
                    placeholder="Shipping Address"
                    value={customer.address}
                    onChange={handleChange}
                    rows="3"
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.address
                        ? "border-red-500 focus:ring-red-400"
                        : "focus:ring-orange-400"
                    }`}
                  />
                )}
                {errors[field] && (
                  <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full py-3 rounded-lg font-semibold text-white bg-orange-500 hover:bg-orange-600 transition-colors shadow-md"
          >
            Confirm Order
          </button>
        </>
      ) : (
        <p className="text-center text-gray-600 text-lg">
          You have not placed any orders yet. Please add items to your cart.
        </p>
      )}
    </div>
  );
}

export default PlaceOrder;
