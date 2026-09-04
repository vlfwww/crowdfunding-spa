import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import cartIcon from "../../../public/assets/images/cart.svg";
import userAvatar from "../../../public/assets/images/user-circle.svg";
import dropdownArrow from "../../../public/assets/images/dropdown-arrow.svg";
import CartDropdown from "../CartDropdown/CartDropdown";
import { useState } from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuth);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const reservedIds = useSelector((state) => state.userPlots.reservedIds);
  const cartCount = reservedIds.length;

  return (
    <div className="headerContainer">
      <header className="siteHeader">
        <div className="headerLeft">
          <Link to="/" className="logoContainer">
            <span className="logoBadge">Crowdfunding</span>
          </Link>
        </div>

        {isAuthenticated && (
          <>
            <nav className="headerNav">
              <Link
                to="/"
                className={location.pathname === "/" ? "active" : ""}
              >
                Home
              </Link>
              <Link
                to="/locations"
                className={location.pathname === "/locations" ? "active" : ""}
              >
                Locations
              </Link>
              <Link
                to="/my-plots"
                className={location.pathname === "/my-plots" ? "active" : ""}
              >
                My plots
              </Link>
              <Link
                to="/contacts"
                className={location.pathname === "/contacts" ? "active" : ""}
              >
                Contacts
              </Link>
              <Link
                to="/shop"
                className={location.pathname === "/shop" ? "active" : ""}
              >
                Shop
              </Link>
              <Link
                to="/wallet"
                className={location.pathname === "/wallet" ? "active" : ""}
              >
                Wallet
              </Link>
            </nav>

            <div className="headerRight">
              <div
                className="cartIconWrapper"
                onClick={() => setIsCartOpen(true)}
              >
                <img src={cartIcon} alt="Cart" className="cartIcon" />
                {cartCount > 0 && (
                  <span className="cartBadge">{cartCount}</span>
                )}
              </div>

              <div className="userProfileStub">
                <img
                  src={userAvatar}
                  alt="User Avatar"
                  className="userAvatar"
                />
                <img
                  src={dropdownArrow}
                  alt="Dropdown Arrow"
                  className="dropdownArrow"
                />
              </div>
            </div>
            <CartDropdown
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
            />
          </>
        )}
      </header>
    </div>
  );
};

export default Header;
