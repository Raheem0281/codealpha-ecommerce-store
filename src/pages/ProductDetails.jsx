import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { CartContext } from "../context/CartContext.jsx";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    api.get(`/products/${id}`).then(({ data }) => setProduct(data));
  }, [id]);

  if (!product) return <p className="text-center py-10 text-smoky">Loading...</p>;

  const handleAddToCart = () => {
    addToCart(product, qty);
    navigate("/cart");
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-10">
      <div className="bg-[#161616] rounded-xl overflow-hidden h-80">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>

      <div>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-smoky mt-2">{product.category}</p>
        <p className="text-3xl font-bold text-accent mt-4">${product.price.toFixed(2)}</p>
        <p className="mt-4 text-warmgray/80 leading-relaxed">{product.description}</p>
        <p className="mt-2 text-sm text-smoky">
          {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
        </p>

        <div className="flex items-center gap-3 mt-6">
          <label className="text-sm text-smoky">Qty</label>
          <input
            type="number"
            min="1"
            max={product.stock}
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            className="w-20 bg-[#161616] border border-smoky/30 rounded-md px-3 py-2 focus:outline-none focus:border-accent"
          />
        </div>

        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="mt-6 bg-accent hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed text-white px-6 py-3 rounded-md font-medium transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
