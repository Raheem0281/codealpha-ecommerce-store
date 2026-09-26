import { useEffect, useState } from "react";
import api from "../api/axios.js";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/orders/myorders")
      .then(({ data }) => setOrders(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center py-16 text-smoky">Loading orders...</p>;
  if (orders.length === 0)
    return <p className="text-center py-16 text-smoky">You haven't placed any orders yet.</p>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-[#161616] border border-smoky/20 rounded-lg p-5">
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm text-smoky">Order #{order._id.slice(-6)}</p>
              <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full">
                {order.status}
              </span>
            </div>
            <ul className="text-sm text-warmgray/80 space-y-1 mb-3">
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.name} × {item.quantity} — ${(item.price * item.quantity).toFixed(2)}
                </li>
              ))}
            </ul>
            <p className="font-bold text-accent">Total: ${order.totalPrice.toFixed(2)}</p>
            <p className="text-xs text-smoky mt-2">
              Ship to: {order.shippingAddress.address}, {order.shippingAddress.city}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
