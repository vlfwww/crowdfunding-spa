import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import cartIcon from "../../../public/assets/images/cart.svg";
import dropdownArrow from "../../../public/assets/images/dropdown-arrow.svg";
import CartDropdown from "../CartDropdown/CartDropdown";
import UserDropdown from "../UserDropdown/UserDropdown";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const location = useLocation();
  const { currentUser: user, isAuth: isAuthenticated } = useSelector(
    (state) => state.users,
  );
  const userId = user?.id;
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentUserData = useSelector((state) => {
    if (!userId || !state.users.users[userId]) {
      return {
        reservedIds: [],
        investedIds: [],
      };
    }
    return state.users.users[userId];
  });
  const { reservedIds } = currentUserData;
  const cartCount = reservedIds.length;

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="headerContainer">
      <header className="siteHeader">
        <div className="headerLeft">
          <Link to="/" className="logoContainer" onClick={closeMobileMenu}>
            <span className="logoBadge">Crowdfunding</span>
          </Link>
        </div>

        {isAuthenticated && (
          <>
            <nav
              className={`headerNav ${isMobileMenuOpen ? "mobileOpen" : ""}`}
            >
              <Link
                to="/"
                className={location.pathname === "/" ? "active" : ""}
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link
                to="/locations"
                className={location.pathname === "/locations" ? "active" : ""}
                onClick={closeMobileMenu}
              >
                Locations
              </Link>
              <Link
                to="/my-plots"
                className={location.pathname === "/my-plots" ? "active" : ""}
                onClick={closeMobileMenu}
              >
                My plots
              </Link>
              <Link
                to="/contacts"
                className={location.pathname === "/contacts" ? "active" : ""}
                onClick={closeMobileMenu}
              >
                Contacts
              </Link>
              <Link
                to="/shop"
                className={location.pathname === "/shop" ? "active" : ""}
                onClick={closeMobileMenu}
              >
                Shop
              </Link>
              <Link
                to="/wallet"
                className={location.pathname === "/wallet" ? "active" : ""}
                onClick={closeMobileMenu}
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
                  {user?.firstName ? user.firstName[0].toUpperCase() : "U"}
                </div>
                <img
                  src={dropdownArrow}
                  alt="Dropdown Arrow"
                  className="dropdownArrow"
                />
              </div>

              <button
                className={`burgerButton ${isMobileMenuOpen ? "active" : ""}`}
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                aria-label="Toggle menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
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
