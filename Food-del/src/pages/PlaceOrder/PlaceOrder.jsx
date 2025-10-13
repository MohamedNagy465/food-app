import React, { useState, useContext, useMemo, useEffect } from "react"; 
import { StoreContext } from "../../Context/StorContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";

function PlaceOrder() {
  const { cartItems, food_list, setCartItems } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const productsInCart = useMemo(() => {
    return food_list.filter((item) => cartItems[item._id] || cartItems[item.id]);
  }, [cartItems, food_list]);

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState({});

  const totalPrice = productsInCart.reduce((total, item) => {
    const quantity = cartItems[item._id] || cartItems[item.id];
    return total + item.price * quantity;
  }, 0);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!customer.name) newErrors.name = "الاسم مطلوب";
    if (!customer.email) newErrors.email = "البريد الإلكتروني مطلوب";
    else if (!/\S+@\S+\.\S+/.test(customer.email)) newErrors.email = "البريد الإلكتروني غير صالح";
    if (!customer.phone) newErrors.phone = "رقم الهاتف مطلوب";
    if (!customer.address) newErrors.address = "العنوان مطلوب";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (productsInCart.length === 0) {
      toast.error("❌ لا توجد منتجات في العربة، لا يمكن تقديم الطلب!");
      return;
    }

    if (!validate()) return;

    // ✅ Toast confirm
    const confirm = await new Promise((resolve) => {
      toast.custom((t) => (
        <div className="bg-white p-4 rounded shadow flex flex-col gap-2">
          <p className="font-semibold">هل أنت متأكد من تقديم الطلب؟</p>
          <div className="flex gap-2 justify-end mt-2">
            <button
              onClick={() => { toast.dismiss(t.id); resolve(true); }}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              نعم
            </button>
            <button
              onClick={() => { toast.dismiss(t.id); resolve(false); }}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              لا
            </button>
          </div>
        </div>
      ), { duration: Infinity });
    });

    if (!confirm) return;

    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const newOrder = {
      id: Date.now(),
      customer: customer.name,
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
    toast.success("✅ تم تقديم الطلب بنجاح!");
    setCartItems({});
    navigate("/dashboard/orders");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">تأكيد الطلب</h2>

      <button
        onClick={() => navigate("/")}
        className="mb-6 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition"
      >
        ← الرجوع للموقع
      </button>

      {productsInCart.length === 0 ? (
        <p className="text-center text-red-500 font-semibold">
          لا توجد منتجات في العربة للطلب.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {productsInCart.map((item) => {
              const quantity = cartItems[item._id] || cartItems[item.id];
              return (
                <div
                  key={item._id || item.id}
                  data-aos="fade-up"
                  className="border rounded-lg p-4 shadow hover:shadow-lg transition flex flex-col items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-32 object-cover rounded-lg mb-3"
                  />
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-orange-500 font-bold">{formatter.format(item.price)}</p>
                  <p>الكمية: {quantity}</p>
                  <p className="mt-2 font-semibold">
                    الإجمالي: {formatter.format(item.price * quantity)}
                  </p>
                </div>
              );
            })}
          </div>

          <h3 className="text-xl font-bold mb-6 text-right">
            الإجمالي الكلي: {formatter.format(totalPrice)}
          </h3>

          <div className="space-y-4 mb-6">
            {["name", "email", "phone", "address"].map((field) => (
              <div key={field}>
                {field !== "address" ? (
                  <input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    placeholder={
                      field === "name"
                        ? "الاسم الكامل"
                        : field === "email"
                        ? "البريد الإلكتروني"
                        : field === "phone"
                        ? "رقم الهاتف"
                        : "العنوان"
                    }
                    value={customer[field]}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors[field] ? "border-red-500 focus:ring-red-400" : "focus:ring-green-400"
                    }`}
                  />
                ) : (
                  <textarea
                    name="address"
                    placeholder="العنوان"
                    value={customer.address}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.address ? "border-red-500 focus:ring-red-400" : "focus:ring-green-400"
                    }`}
                    rows="3"
                  />
                )}
                {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
              </div>
            ))}
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={productsInCart.length === 0}
            className={`w-full py-3 rounded-lg font-semibold transition-colors cursor-pointer text-white ${
              productsInCart.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            تأكيد الطلب
          </button>
        </>
      )}
    </div>
  );
}

export default PlaceOrder;
