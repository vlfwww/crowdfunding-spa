import { lazy, Suspense } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Layout from "./components/Layout/Layout";
import ScrollToTop from "./utils/ScrollToTop";
import NotificationPortal from "./components/NotificationPortal/NotificationPortal";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const Register = lazy(() => import("./pages/Register/Register"));
const Home = lazy(() => import("./pages/Home/Home"));
const Shop = lazy(() => import("./pages/Shop/Shop"));
const FieldDetails = lazy(() => import("./pages/FieldDetails/FieldDetails"));
const Locations = lazy(() => import("./pages/Locations/Locations"));
const MyPlots = lazy(() => import("./pages/MyPlots/MyPlots"));
const Contacts = lazy(() => import("./pages/Contacts/Contacts"));
const Wallet = lazy(() => import("./pages/Wallet/Wallet"));
const Profile = lazy(() => import("./pages/Profile/Profile"));

const PageLoading = () => <main aria-live="polite">Loading page...</main>;

const App = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <Suspense fallback={<PageLoading />}>
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
      </Suspense>

      <NotificationPortal />
    </HashRouter>
  );
};

export default App;
