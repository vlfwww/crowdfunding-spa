import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import cartIcon from "../../../public/assets/images/cart.svg";
import userAvatar from "../../../public/assets/images/user-circle.svg";
import dropdownArrow from "../../../public/assets/images/dropdown-arrow.svg";

const Header = () => {
  const location = useLocation();
  const isAuthenticated = true;

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
              <div className="cartIconWrapper">
                <img src={cartIcon} alt="Cart" className="cartIcon" />
                <span className="cartBadge">3</span>
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
          </>
        )}
      </header>
    </div>
  );
};

export default Header;
