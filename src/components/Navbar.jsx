import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { CartContext } from "../context/CartContext.jsx";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-[#161616] border-b border-smoky/30 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
      <Link to="/" className="text-xl font-bold text-accent">
        CodeAlpha Store
      </Link>

      <div className="flex items-center gap-6 text-sm">
        <Link to="/" className="hover:text-accent transition-colors">
          Home
        </Link>
        <Link to="/cart" className="hover:text-accent transition-colors relative">
          Cart
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>

        {user ? (
          <>
            <Link to="/orders" className="hover:text-accent transition-colors">
              My Orders
            </Link>
            <span className="text-smoky">Hi, {user.name.split(" ")[0]}</span>
            <button
              onClick={handleLogout}
              className="bg-accent hover:bg-orange-600 text-white px-3 py-1.5 rounded-md transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-accent hover:bg-orange-600 text-white px-3 py-1.5 rounded-md transition-colors"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
