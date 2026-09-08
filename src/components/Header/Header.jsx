import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import cartIcon from "../../../public/assets/images/cart.svg";
import dropdownArrow from "../../../public/assets/images/dropdown-arrow.svg";
import CartDropdown from "../CartDropdown/CartDropdown";
import UserDropdown from "../UserDropdown/UserDropdown";
import { useState, useEffect, useRef, useCallback } from "react";
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

  const headerRef = useRef(null);
  const userMenuRef = useRef(null);

  const currentUserData = useSelector((state) => {
    if (!userId || !state.users.users[userId]) {
      return {
        reservedIds: [],
        investedIds: [],
      };
    }
    return state.users.users[userId];
  });
  const cartCount = currentUserData.reservedIds.length;

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    if (isMobileMenuOpen || isUserMenuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isMobileMenuOpen, isUserMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleCartClick = useCallback(() => {
    if (isMobileMenuOpen) return;
    setIsCartOpen((prev) => !prev);
  }, [isMobileMenuOpen]);

  const handleUserMenuClick = useCallback(
    (e) => {
      e.stopPropagation();
      if (isMobileMenuOpen) return;
      setIsUserMenuOpen((prev) => !prev);
    },
    [isMobileMenuOpen],
  );

  const handleBurgerClick = useCallback(() => {
    setIsMobileMenuOpen((prev) => {
      const nextState = !prev;
      if (nextState) {
        setIsCartOpen(false);
        setIsUserMenuOpen(false);
      }
      return nextState;
    });
  }, []);

  return (
    <div className="headerContainer" ref={headerRef}>
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
              <div className="cartIconWrapper" onClick={handleCartClick}>
                <img src={cartIcon} alt="Cart" className="cartIcon" />
                {cartCount > 0 && (
                  <span className="cartBadge">{cartCount}</span>
                )}
              </div>

              <div className="userMenuWrapper" ref={userMenuRef}>
                <div
                  className="userProfileStub"
                  onClick={handleUserMenuClick}
                  style={{ cursor: isMobileMenuOpen ? "default" : "pointer" }}
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

                <UserDropdown
                  isOpen={isUserMenuOpen && !isMobileMenuOpen}
                  onClose={() => setIsUserMenuOpen(false)}
                />
              </div>

              <button
                className={`burgerButton ${isMobileMenuOpen ? "active" : ""}`}
                onClick={handleBurgerClick}
                aria-label="Toggle menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>

            <CartDropdown
              isOpen={isCartOpen && !isMobileMenuOpen}
              onClose={() => setIsCartOpen(false)}
            />
          </>
        )}
      </header>
    </div>
  );
};

export default Header;
