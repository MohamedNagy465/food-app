import React, { useEffect, useState, useContext } from "react";
import { StoreContext } from "../../Context/StorContext";
import AOS from "aos";
import "aos/dist/aos.css";

function TrackOrders() {
  const { user, food_list } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);

  const statusOptions = ["Pending", "Preparing", "Shipped", "Delivered"];

  // 🧠 Fetch orders from localStorage
  const fetchOrders = () => {
    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];

    if (!user) return setOrders([]);

    if (user.role === "admin") {
      setOrders(allOrders);
    } else {
      const userOrders = allOrders.filter(
        (order) =>
          order.customerEmail?.toLowerCase() === user.email?.toLowerCase()
      );
      setOrders(userOrders);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchOrders();

    const handleOrdersChange = () => fetchOrders();
    window.addEventListener("ordersUpdated", handleOrdersChange);

    return () => window.removeEventListener("ordersUpdated", handleOrdersChange);
  }, [user]);

  // ⚙️ Update order status (for admin)
  const updateStatus = (orderId, newStatus) => {
    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const updatedOrders = allOrders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    window.dispatchEvent(new Event("ordersUpdated"));
    fetchOrders();
  };

  // ❌ Cancel order (for user)
  const cancelOrder = (orderId) => {
    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const updatedOrders = allOrders.filter((order) => order.id !== orderId);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    window.dispatchEvent(new Event("ordersUpdated"));
    fetchOrders();
  };

  // ➕ Open Add Product Modal
  const openAddModal = (order) => {
    setSelectedOrder(order);
    setShowAddModal(true);
  };

  // ✅ Handle Add Product
  const handleAddProduct = () => {
    if (!selectedProduct) return alert("Please select a product first.");
    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];

    const updatedOrders = allOrders.map((order) => {
      if (order.id === selectedOrder.id) {
        const product = food_list.find((item) => item.name === selectedProduct);
        const newItem = {
          id: product.id,
          name: product.name,
          price: product.price || 10,
          quantity: Number(quantity),
        };

        const updatedItems = [...order.items, newItem];
        const newTotal = updatedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        return { ...order, items: updatedItems, total: newTotal };
      }
      return order;
    });

    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    setShowAddModal(false);
    setSelectedProduct("");
    setQuantity(1);
    window.dispatchEvent(new Event("ordersUpdated"));
    fetchOrders();
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <p className="text-red-500 mb-4 text-lg font-semibold">
          ⚠️ Please log in to track your orders.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-orange-600">
        🧾 Order Tracking
      </h2>

      {orders.length === 0 ? (
        <p className="text-gray-600 text-center text-lg">
          You haven't placed any orders yet. Please create a new order to start
          tracking.
        </p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              data-aos="fade-up"
              className="border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-lg transition-all"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-lg text-gray-800">
                  Order ID: {order.id}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    order.status === "Pending"
                      ? "bg-gray-400 text-white"
                      : order.status === "Preparing"
                      ? "bg-yellow-500 text-white"
                      : order.status === "Shipped"
                      ? "bg-blue-500 text-white"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <p className="text-gray-600 mb-2">
                👤 <strong>Customer:</strong> {order.customer}
              </p>

              <div className="mt-3 border-t pt-3">
                <h4 className="font-semibold mb-2 text-gray-700">📦 Products:</h4>
                {order.items?.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-gray-700 border-b py-1"
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>${item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-4">
                <p className="font-bold text-orange-600 text-lg">
                  Total: ${order.total}
                </p>

                {user.role !== "admin" && order.status === "Pending" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => openAddModal(order)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition"
                    >
                      ➕ Add Product
                    </button>
                    <button
                      onClick={() => cancelOrder(order.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition"
                    >
                      Cancel Order
                    </button>
                  </div>
                )}
              </div>

              {user.role === "admin" && (
                <div className="mt-4 flex items-center gap-2">
                  <label className="font-semibold text-gray-700">
                    Change Status:
                  </label>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 🧩 Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              Add Product to Order #{selectedOrder?.id}
            </h3>

            <div className="flex flex-col gap-3">
              <label className="font-semibold">Select Product:</label>
              <select
                className="border rounded-lg p-2"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
              >
                <option value="">-- Select --</option>
                {food_list.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>

              <label className="font-semibold">Quantity:</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="border rounded-lg p-2"
              />
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={handleAddProduct}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold"
              >
                Confirm Add
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TrackOrders;
