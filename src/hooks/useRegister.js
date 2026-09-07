import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/usersSlice";
import {
  validateName,
  validateUsername,
  validatePassword,
} from "../utils/validation";

export const useRegister = () => {
  const [firstName, setFirstNameState] = useState("");
  const [lastName, setLastNameState] = useState("");
  const [username, setUsernameState] = useState("");
  const [password, setPasswordState] = useState("");

  const [errors, setErrors] = useState({});

  const users = useSelector((state) => state.users.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const setFirstName = (value) => {
    setFirstNameState(value);
    if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: "" }));
  };

  const setLastName = (value) => {
    setLastNameState(value);
    if (errors.lastName) setErrors((prev) => ({ ...prev, lastName: "" }));
  };

  const setUsername = (value) => {
    setUsernameState(value);
    if (errors.username) setErrors((prev) => ({ ...prev, username: "" }));
  };

  const setPassword = (value) => {
    setPasswordState(value);
    if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const normalizedUsername = username.trim().toLowerCase();
    const existingUser = users[normalizedUsername]
      ? { username: users[normalizedUsername].username }
      : null;

    const firstNameError = validateName(firstName);
    const lastNameError = validateName(lastName);
    const usernameError = validateUsername(username, existingUser);
    const passwordError = validatePassword(password);

    if (firstNameError || lastNameError || usernameError || passwordError) {
      setErrors({
        firstName: firstNameError,
        lastName: lastNameError,
        username: usernameError,
        password: passwordError,
      });
      return;
    }

    setErrors({});

    dispatch(
      registerUser({
        username: username.trim(),
        password,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      }),
    );

    navigate("/locations");
  };

  return {
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
  };
};
