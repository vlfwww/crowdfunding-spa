import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login/Login";
import Shop from "./pages/Shop/Shop";
import FieldDetails from "./pages/FieldDetails/FieldDetails";
import Home from "./pages/Home/Home";
import Layout from "./components/Layout/Layout";
import Locations from "./pages/Locations/Locations";
import ScrollToTop from "./utils/ScrollToTop";
import MyPlots from "./pages/MyPlots/MyPlots";
import NotificationPortal from "./components/NotificationPortal/NotificationPortal";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<FieldDetails />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/my-plots" element={<MyPlots />} />
        </Route>
      </Routes>

      <NotificationPortal />
    </BrowserRouter>
  );
};

export default App;
