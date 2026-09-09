import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Layout.css";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="wrapper">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
