import { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/usersSlice";

export const useLogin = () => {
  const [username, setUsernameState] = useState("");
  const [password, setPasswordState] = useState("");
  const [errors, setErrors] = useState({});

  const users = useSelector((state) => state.users?.users) || {};
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const fromPage = location.state?.from?.pathname || "/";

  const setUsername = useCallback((value) => {
    setUsernameState(value);
    setErrors((prev) => (prev.username ? { ...prev, username: "" } : prev));
  }, []);

  const setPassword = useCallback((value) => {
    setPasswordState(value);
    setErrors((prev) => (prev.password ? { ...prev, password: "" } : prev));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
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

      const existingUser = Object.values(users).find(
        (user) => (user.username || "").toLowerCase() === normalizedUsername,
      );

      if (!existingUser) {
        setErrors({ password: "Incorrect password" });
        return;
      }

      dispatch(loginUser({ username: username.trim() }));
      navigate(fromPage, { replace: true });
    },
    [username, password, users, dispatch, navigate, fromPage],
  );

  return {
    username,
    setUsername,
    password,
    setPassword,
    errors,
    handleSubmit,
  };
};
