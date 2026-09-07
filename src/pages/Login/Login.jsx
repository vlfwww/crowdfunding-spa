import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import "./Login.css";
import userIcon from "../../../public/assets/images/user-icon.svg";
import passwordIcon from "../../../public/assets/images/password-icon.svg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      const userData = {
        firstName: username,
        lastName: "",
        username: username,
      };

      dispatch(login(userData));
      navigate("/");
    }
  };

  return (
    <div className="loginContainer">
      <form className="loginForm" onSubmit={handleSubmit}>
        <p className="formTitle">Login to your account</p>

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

        <p className="authSwitchText">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
