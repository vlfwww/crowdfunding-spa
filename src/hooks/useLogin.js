import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { createUserData } from "../utils/authHelpers";

export const useLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      const userData = createUserData(username);

      dispatch(login(userData));
      navigate("/");
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    handleSubmit,
  };
};
