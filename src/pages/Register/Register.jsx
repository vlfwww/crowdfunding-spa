import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import "./Register.css";
import userIcon from "../../../public/assets/images/user-icon.svg";
import passwordIcon from "../../../public/assets/images/password-icon.svg";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    if (firstName && lastName && username && password) {
      const userData = {
        firstName,
        lastName,
        username,
      };

      dispatch(login(userData));

      navigate("/locations");
    }
  };

  return (
    <div className="registerContainer">
      <form className="registerForm" onSubmit={handleRegister}>
        <p className="registerTitle">Create an account</p>

        <InputField
          label="First Name"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter first name"
          required
        />

        <InputField
          label="Last Name"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Enter last name"
          required
        />

        <InputField
          label="Username"
          type="text"
          icon={userIcon}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Choose a username"
          required
        />

        <InputField
          label="Password"
          type="password"
          icon={passwordIcon}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Choose a password"
          required
        />

        <Button type="submit">Sign Up</Button>

        <p className="authSwitchText">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
