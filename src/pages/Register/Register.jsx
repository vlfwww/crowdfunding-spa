import { Link } from "react-router-dom";
import { useRegister } from "../../hooks/useRegister";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import "./Register.css";
import userIcon from "../../../public/assets/images/user-icon.svg";
import passwordIcon from "../../../public/assets/images/password-icon.svg";

const Register = () => {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    username,
    setUsername,
    password,
    setPassword,
    errors,
    handleRegister,
  } = useRegister();

  return (
    <div className="registerContainer">
      <form className="registerForm" onSubmit={handleRegister} noValidate>
        <p className="registerTitle">Create an account</p>

        <InputField
          label="First Name"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter first name"
          error={errors.firstName}
        />

        <InputField
          label="Last Name"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Enter last name"
          error={errors.lastName}
        />

        <InputField
          label="Username"
          type="text"
          icon={userIcon}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Choose a username"
          error={errors.username}
        />

        <InputField
          label="Password"
          type="password"
          icon={passwordIcon}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Choose a password"
          error={errors.password}
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
