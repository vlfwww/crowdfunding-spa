import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/usersSlice";
import {
  validateName,
  validateUsername,
  validatePassword,
} from "../utils/validation";
import { hashPassword } from "../utils/passwordHash";

export const useRegister = () => {
  const [firstName, setFirstNameState] = useState("");
  const [lastName, setLastNameState] = useState("");
  const [username, setUsernameState] = useState("");
  const [password, setPasswordState] = useState("");

  const [errors, setErrors] = useState({});

  const users = useSelector((state) => state.users?.users) || {};
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const setFirstName = useCallback((value) => {
    setFirstNameState(value);
    setErrors((prev) => (prev.firstName ? { ...prev, firstName: "" } : prev));
  }, []);

  const setLastName = useCallback((value) => {
    setLastNameState(value);
    setErrors((prev) => (prev.lastName ? { ...prev, lastName: "" } : prev));
  }, []);

  const setUsername = useCallback((value) => {
    setUsernameState(value);
    setErrors((prev) => (prev.username ? { ...prev, username: "" } : prev));
  }, []);

  const setPassword = useCallback((value) => {
    setPasswordState(value);
    setErrors((prev) => (prev.password ? { ...prev, password: "" } : prev));
  }, []);

  const handleRegister = useCallback(
    async (e) => {
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

      const passwordHash = await hashPassword(password);
      dispatch(
        registerUser({
          username: username.trim(),
          passwordHash,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
        }),
      );

      navigate("/locations", { replace: true });
    },
    [username, users, firstName, lastName, password, dispatch, navigate],
  );

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
