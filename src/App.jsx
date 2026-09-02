import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login/Login";
import Shop from "./pages/Shop/Shop";
import FieldDetails from "./pages/FieldDetails/FieldDetails";

const Home = () => (
  <div style={{ padding: "2rem" }}>
    <h1>Главная страница</h1>
    <Link to="/login">Перейти на страницу логина</Link>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<FieldDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
