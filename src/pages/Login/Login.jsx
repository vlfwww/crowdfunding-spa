import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import "./Login.css";
import userIcon from "../../../public/assets/images/user-icon.svg";
import passwordIcon from "../../../public/assets/images/password-icon.svg";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      navigate("/locations");
    }
  };

  return (
    <>
      <Header />
      <div className="loginContainer">
        <form className="loginForm" onSubmit={handleSubmit}>
          <p>Login to your account</p>

          <InputField
            label="Username"
            type="text"
            icon={userIcon}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
          />

          <InputField
            label="Password"
            type="password"
            icon={passwordIcon}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />

          <Button type="submit">Login</Button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Login;
