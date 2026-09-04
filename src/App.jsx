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
import Contacts from "./pages/Contacts/Contacts";
import Wallet from "./pages/Wallet/Wallet";
import Register from "./pages/Register/Register";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Profile from "./pages/Profile/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:id" element={<FieldDetails />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/my-plots" element={<MyPlots />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>

      <NotificationPortal />
    </BrowserRouter>
  );
};

export default App;
