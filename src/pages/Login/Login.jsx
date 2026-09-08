import React from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import "./Login.css";
import userIcon from "../../../public/assets/images/user-icon.svg";
import passwordIcon from "../../../public/assets/images/password-icon.svg";

const Login = React.memo(() => {
  const { username, setUsername, password, setPassword, errors, handleSubmit } =
    useLogin();

  return (
    <main className="loginContainer">
      <form className="loginForm" onSubmit={handleSubmit} noValidate>
        <h1 className="formTitle">Login to your account</h1>

        <InputField
          label="Username"
          type="text"
          icon={userIcon}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          error={errors.username}
        />

        <InputField
          label="Password"
          type="password"
          icon={passwordIcon}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          error={errors.password}
        />

        <Button type="submit">Login</Button>

        <p className="authSwitchText">
          Don&apos;t have an account? <Link to="/register">Sign up</Link>
        </p>
      </form>
    </main>
  );
});

Login.displayName = "Login";

export default Login;
