import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = React.memo(() => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="footerContainer">
      <footer className="siteFooter">
        <div className="footerContent">
          <div className="footerCol">
            <span className="logoBadge">Crowdfunding</span>
            <p className="footerDescription">
              Green farming platform: rent your own fields, invest in farming,
              and grow fresh vegetables.
            </p>
          </div>

          <div className="footerCol">
            <p className="mainText">Navigation</p>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/locations">Locations</Link>
              </li>
              <li>
                <Link to="/my-plots">My plots</Link>
              </li>
              <li>
                <Link to="/contacts">Contacts</Link>
              </li>
              <li>
                <Link to="/shop">Shop</Link>
              </li>
              <li>
                <Link to="/wallet">Wallet</Link>
              </li>
            </ul>
          </div>

          <div className="footerCol">
            <p className="mainText">Contacts</p>
            <p className="contactInfo">
              Email: support@crowdfunding-farming.com
            </p>
            <p className="contactInfo">Phone: +375 (29) 000-00-00</p>
          </div>
        </div>

        <div className="footerBottom">
          <p>
            &copy; {currentYear} Crowdfunding Farming Platform. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
});

export default Footer;
