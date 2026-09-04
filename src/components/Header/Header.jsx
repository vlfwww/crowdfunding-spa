import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import cartIcon from "../../../public/assets/images/cart.svg";
import dropdownArrow from "../../../public/assets/images/dropdown-arrow.svg";
import CartDropdown from "../CartDropdown/CartDropdown";
import UserDropdown from "../UserDropdown/UserDropdown";
import { useState } from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const userId = user?.id;
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const isAuthenticated = useSelector((state) => state.auth.isAuth);

  const userPlots = useSelector(
    (state) =>
      state.userPlots.userDataByUser[userId] || {
        reservedIds: [],
        investedIds: [],
      },
  );
  const { reservedIds } = userPlots;
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

              <div
                className="userProfileStub"
                onClick={() => setIsUserMenuOpen((prev) => !prev)}
                style={{ cursor: "pointer" }}
              >
                <div className="profileAvatarCircle">
                  {user.firstName ? user.firstName[0].toUpperCase() : "U"}
                </div>
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

            <UserDropdown
              isOpen={isUserMenuOpen}
              onClose={() => setIsUserMenuOpen(false)}
            />
          </>
        )}
      </header>
    </div>
  );
};

export default Header;
