import React, { useEffect, useState } from "react"; 
import toast from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 600, once: true }); // تهيئة AOS
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  const saveOrders = (updated) => {
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
  };

  const updateStatus = (id, newStatus) => {
    const updated = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    saveOrders(updated);
    toast.success(`✅ Order #${id} marked as ${newStatus}`);
  };

  const deleteOrder = (id) => {
    const updated = orders.filter((o) => o.id !== id);
    saveOrders(updated);
    toast.error(`🗑️ Order #${id} deleted`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-orange-600">📦 Manage Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-orange-600 text-white">
            <tr>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Total ($)</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order.id}
                className="border-t hover:bg-gray-50 transition"
                data-aos="fade-up"
                data-aos-delay={index * 100} // تأخير تدريجي لكل صف
              >
                <td className="p-3 font-semibold text-gray-800">{order.id}</td>
                <td className="p-3">{order.customer}</td>
                <td className="p-3">${order.total.toFixed(2)}</td>
                <td className="p-3">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className={`border rounded px-2 py-1 ${
                      order.status === "Delivered"
                        ? "text-green-600"
                        : order.status === "Processing"
                        ? "text-yellow-600"
                        : "text-gray-600"
                    }`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => deleteOrder(order.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Orders;
