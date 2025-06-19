import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StorContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow flex items-center justify-between px-4 md:px-12 py-4">
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="w-36 md:w-40 transition-transform hover:scale-105" />
      </Link>
      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6 text-lg font-medium">
        <li>
          <Link to="/" onClick={() => setMenu("home")}
            className={`px-4 py-2 rounded-full transition ${menu === "home" ? "bg-primary/10 text-primary" : "hover:bg-primary/5 hover:text-primary"}`}>Home</Link>
        </li>
        <li>
          <a href="#explore-menu" onClick={() => setMenu("menu")}
            className={`px-4 py-2 rounded-full transition ${menu === "menu" ? "bg-primary/10 text-primary" : "hover:bg-primary/5 hover:text-primary"}`}>Menu</a>
        </li>
        <li>
          <a href="#app-download" onClick={() => setMenu("mobile-app")}
            className={`px-4 py-2 rounded-full transition ${menu === "mobile-app" ? "bg-primary/10 text-primary" : "hover:bg-primary/5 hover:text-primary"}`}>Mobile App</a>
        </li>
        <li>
          <a href="#footer" onClick={() => setMenu("contact-us")}
            className={`px-4 py-2 rounded-full transition ${menu === "contact-us" ? "bg-primary/10 text-primary" : "hover:bg-primary/5 hover:text-primary"}`}>Contact Us</a>
        </li>
      </ul>
      {/* Mobile Hamburger */}
      <button className="md:hidden flex items-center" onClick={() => setMobileOpen(!mobileOpen)}>
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
      </button>
      {/* Right Side */}
      <div className="flex items-center gap-4 ml-4">
        <Link to="/cart" className="relative">
          <img src={assets.basket_icon} alt="Cart" className="w-7 h-7" />
          {getTotalCartAmount() > 0 && <span className="absolute -top-2 -right-2 w-4 h-4 bg-primary text-white text-xs flex items-center justify-center rounded-full">{getTotalCartAmount()}</span>}
        </Link>
        {!token ? (
          <button onClick={() => setShowLogin(true)} className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-semibold shadow transition">Sign In</button>
        ) : (
          <div className="relative group">
            <img src={assets.profile_icon} alt="Profile" className="w-9 h-9 rounded-full cursor-pointer border-2 border-primary" />
            <ul className="hidden group-hover:flex flex-col absolute right-0 top-12 bg-white border border-gray-200 shadow-lg rounded-xl min-w-[180px] z-50">
              <li onClick={() => navigate("/myorders")}
                className="flex items-center gap-2 px-4 py-3 hover:bg-primary/10 cursor-pointer rounded-t-xl">
                <img src={assets.bag_icon} alt="Orders" className="w-5 h-5" />
                <span>Orders</span>
              </li>
              <hr />
              <li onClick={logout}
                className="flex items-center gap-2 px-4 py-3 hover:bg-primary/10 cursor-pointer rounded-b-xl">
                <img src={assets.logout_icon} alt="Logout" className="w-5 h-5" />
                <span>Logout</span>
              </li>
            </ul>
          </div>
        )}
      </div>
      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 md:hidden" onClick={() => setMobileOpen(false)}>
          <div className="absolute top-0 right-0 w-64 h-full bg-white shadow-lg flex flex-col p-8 gap-6 animate-slide-in">
            <button className="self-end mb-4" onClick={() => setMobileOpen(false)}>
              <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <Link to="/" onClick={() => { setMenu("home"); setMobileOpen(false); }} className={`px-4 py-2 rounded-full transition ${menu === "home" ? "bg-primary/10 text-primary" : "hover:bg-primary/5 hover:text-primary"}`}>Home</Link>
            <a href="#explore-menu" onClick={() => { setMenu("menu"); setMobileOpen(false); }} className={`px-4 py-2 rounded-full transition ${menu === "menu" ? "bg-primary/10 text-primary" : "hover:bg-primary/5 hover:text-primary"}`}>Menu</a>
            <a href="#app-download" onClick={() => { setMenu("mobile-app"); setMobileOpen(false); }} className={`px-4 py-2 rounded-full transition ${menu === "mobile-app" ? "bg-primary/10 text-primary" : "hover:bg-primary/5 hover:text-primary"}`}>Mobile App</a>
            <a href="#footer" onClick={() => { setMenu("contact-us"); setMobileOpen(false); }} className={`px-4 py-2 rounded-full transition ${menu === "contact-us" ? "bg-primary/10 text-primary" : "hover:bg-primary/5 hover:text-primary"}`}>Contact Us</a>
            <Link to="/cart" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-primary/5 hover:text-primary transition">
              <img src={assets.basket_icon} alt="Cart" className="w-6 h-6" />
              <span>Cart</span>
            </Link>
            {!token ? (
              <button onClick={() => { setShowLogin(true); setMobileOpen(false); }} className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-semibold shadow transition">Sign In</button>
            ) : (
              <>
                <button onClick={() => { navigate("/myorders"); setMobileOpen(false); }} className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-primary/5 hover:text-primary transition">
                  <img src={assets.bag_icon} alt="Orders" className="w-5 h-5" />
                  <span>Orders</span>
                </button>
                <button onClick={() => { logout(); setMobileOpen(false); }} className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-primary/5 hover:text-primary transition">
                  <img src={assets.logout_icon} alt="Logout" className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 