import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoBag } from "react-icons/io5";
import { CiHeart, CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { HiMenu, HiX } from "react-icons/hi";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [firstletter, setFirstLetter] = useState("");

  const links = [
    { label: "Man", path: "/man" },
    { label: "Womann", path: "/womann" },
    { label: "Childrean", path: "/childrean" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Fetch full name from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.name && user.name.length > 0) {
        setFirstLetter(user.name.charAt(0).toUpperCase());
      } else if (user.email) {
        setFirstLetter(user.email.charAt(0).toUpperCase()); // fallback
      }
    }
  }, []);

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    setFirstLetter("");
    navigate("/login");
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 ease-in-out ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      } bg-transparent py-3`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4">
       
        <Link to="/">
          <div className="text-[#0f172a] text-2xl tracking-tight font-extrabold">
            <span className="mr-1 text-white">F1</span>
            <span className="text-violet-400">StreetWare</span>
          </div>
        </Link>

        
        <ul className="hidden md:flex gap-6 text-[#475569] text-[16px] font-medium">
          {links.map((link, index) => (
            <li key={index}>
              <Link
                to={link.path}
                className="hover:text-[#1e293b] transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

       
        <div className="relative w-full max-w-sm hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black bg-blue-50"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>

       
        <div className="hidden md:flex gap-4 text-[#475569] text-xl">
          <Link to="/cartPage">
            <div className="flex flex-col items-center justify-center">
              <IoBag className="hover:text-[#1e293b] cursor-pointer" />
              <h1 className="text-[13px] font-semibold">Cart</h1>
            </div>
          </Link>

          <div className="flex flex-col items-center justify-center">
            <CiHeart className="hover:text-[#1e293b] cursor-pointer" />
            <h3 className="text-[13px] font-semibold">Wishlist</h3>
          </div>

          {firstletter ? (
            <div
              className="flex flex-col items-center justify-center cursor-pointer"
              onClick={handleLogout}
              title="Logout"
            >
              <CgProfile className="hover:text-[#1e293b]" />
              <h1 className="text-[13px] font-semibold">{firstletter}</h1>
            </div>
          ) : (
            <Link to="/login">
              <div className="flex flex-col items-center justify-center">
                <CgProfile className="hover:text-[#1e293b] cursor-pointer" />
                <h1 className="text-[13px] font-semibold">Profile</h1>
              </div>
            </Link>
          )}
        </div>

        
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? (
              <HiX className="text-2xl text-[#334155]" />
            ) : (
              <HiMenu className="text-2xl text-[#334155]" />
            )}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden px-4 overflow-hidden transition-all duration-300 ease-in-out bg-green-50 rounded-sm p-4${
          mobileMenuOpen
            ? "max-h-60 opacity-100 scale-100"
            : "max-h-0 opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col gap-4 text-[#334155] font-medium pt-2">
          {links.map((link, index) => (
            <li key={index}>
              <Link
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex gap-4 text-[#334155] text-xl mt-4">
          <IoBag />
          <CiSearch />
          <CiHeart />
          {firstletter ? (
            <span
              className="text-sm cursor-pointer"
              onClick={handleLogout}
              title="Logout"
            >
              {firstletter}
            </span>
          ) : (
            <Link to="/login">
              <CgProfile />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
