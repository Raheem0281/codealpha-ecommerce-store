import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import api from "../api/axios.js";

const Cart = () => {
  const { cartItems, removeFromCart, updateQty, clearCart, totalPrice } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState({ address: "", city: "", phone: "" });
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    setPlacing(true);
    setError("");
    try {
      const items = cartItems.map((item) => ({
        product: item._id,
        name: item.name,
        price: item.price,
        quantity: item.qty,
      }));

      await api.post("/orders", {
        items,
        totalPrice,
        shippingAddress: address,
      });

      clearCart();
      navigate("/orders");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong placing the order");
    } finally {
      setPlacing(false);
    }
  };

  if (cartItems.length === 0) {
    return <p className="text-center py-16 text-smoky">Your cart is empty.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
      {/* Cart items list */}
      <div className="md:col-span-2 space-y-4">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-4 bg-[#161616] border border-smoky/20 rounded-lg p-4"
          >
            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-accent text-sm">${item.price.toFixed(2)}</p>
            </div>
            <input
              type="number"
              min="1"
              value={item.qty}
              onChange={(e) => updateQty(item._id, Number(e.target.value))}
              className="w-16 bg-[#0E0E0E] border border-smoky/30 rounded-md px-2 py-1 text-center"
            />
            <button
              onClick={() => removeFromCart(item._id)}
              className="text-smoky hover:text-accent text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Checkout summary + shipping form */}
      <div className="bg-[#161616] border border-smoky/20 rounded-lg p-6 h-fit">
        <h2 className="font-semibold mb-4">Order Summary</h2>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-smoky">Total</span>
          <span className="text-accent font-bold">${totalPrice.toFixed(2)}</span>
        </div>

        <form onSubmit={handlePlaceOrder} className="mt-4 space-y-3">
          <input
            type="text"
            placeholder="Address"
            required
            value={address.address}
            onChange={(e) => setAddress({ ...address, address: e.target.value })}
            className="w-full bg-[#0E0E0E] border border-smoky/30 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-accent"
          />
          <input
            type="text"
            placeholder="City"
            required
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            className="w-full bg-[#0E0E0E] border border-smoky/30 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-accent"
          />
          <input
            type="text"
            placeholder="Phone"
            required
            value={address.phone}
            onChange={(e) => setAddress({ ...address, phone: e.target.value })}
            className="w-full bg-[#0E0E0E] border border-smoky/30 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-accent"
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={placing}
            className="w-full bg-accent hover:bg-orange-600 text-white py-2.5 rounded-md font-medium transition-colors disabled:opacity-50"
          >
            {placing ? "Placing Order..." : user ? "Place Order" : "Login to Checkout"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Cart;
