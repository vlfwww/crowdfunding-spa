import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/usersSlice";

export const useLogin = () => {
  const [username, setUsernameState] = useState("");
  const [password, setPasswordState] = useState("");
  const [errors, setErrors] = useState({});

  const users = useSelector((state) => state.users.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const setUsername = (value) => {
    setUsernameState(value);
    if (errors.username) setErrors((prev) => ({ ...prev, username: "" }));
  };

  const setPassword = (value) => {
    setPasswordState(value);
    if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    const newErrors = {};
    if (!username.trim()) newErrors.username = "Username is required";
    if (!password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const normalizedUsername = username.trim().toLowerCase();
    const existingUser = users[normalizedUsername];

    if (!existingUser || existingUser.password !== password) {
      setErrors({ password: "incorrect password" });
      return;
    }

    dispatch(loginUser({ username: username.trim() }));
    navigate("/");
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    errors,
    handleSubmit,
  };
};
