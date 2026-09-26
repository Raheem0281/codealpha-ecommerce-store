import { Link } from "react-router-dom";

// Reusable card used on the Home grid — keeps Home.jsx clean
const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/product/${product._id}`}
      className="bg-[#161616] rounded-xl overflow-hidden border border-smoky/20 hover:border-accent/60 transition-colors group"
    >
      <div className="h-44 overflow-hidden bg-[#1c1c1c]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-warmgray truncate">{product.name}</h3>
        <p className="text-smoky text-sm mt-1">{product.category}</p>
        <p className="text-accent font-bold mt-2">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
