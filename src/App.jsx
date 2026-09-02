import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login/Login";
import Shop from "./pages/Shop/Shop";
import FieldDetails from "./pages/FieldDetails/FieldDetails";
import Home from "./pages/Home/Home";
import Layout from "./components/Layout/Layout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<FieldDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
