import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = location.state?.orderId;
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (orderId) {
      const orders = JSON.parse(localStorage.getItem("orders")) || [];
      const foundOrder = orders.find((o) => o.id === orderId);
      setOrder(foundOrder);
    }
  }, [orderId]);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-md text-center">
          <p className="text-red-500 mb-4">No order found to display.</p>
          <button
            onClick={() => navigate("/")}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-green-500 mb-4">
          🎉 Order Placed Successfully!
        </h2>
        <p className="text-gray-700 mb-4">
          Order ID: <span className="font-semibold">{order.id}</span>
        </p>

        <div className="text-left mb-4">
          <h3 className="font-semibold text-lg mb-2">Customer:</h3>
          <p>{order.customer}</p>

          <h3 className="font-semibold text-lg mt-4 mb-2">Products:</h3>
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between mb-1">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>${item.price * item.quantity}</span>
            </div>
          ))}

          <h3 className="font-semibold text-lg mt-4">Total:</h3>
          <p className="text-orange-500 font-bold">${order.total}</p>
        </div>

        <button
          onClick={() => navigate("/")}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default OrderSuccess;
