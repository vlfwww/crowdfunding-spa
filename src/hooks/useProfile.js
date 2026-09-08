import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserProfile } from "../store/usersSlice";
import { useNotification } from "./useNotification";
import { validateName, validateUsername } from "../utils/validation";

export const useProfile = () => {
  const dispatch = useDispatch();
  const notify = useNotification();
  const { currentUser: user, users } =
    useSelector((state) => state.users) || {};
  const userId = user?.id;

  const currentUserData = useSelector((state) => {
    if (!userId || !state.users.users[userId]) {
      return {
        reservedIds: [],
        investedIds: [],
      };
    }
    return state.users.users[userId];
  });
  const { investedIds = [], reservedIds = [] } = currentUserData;

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [username, setUsername] = useState(user?.username || "");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setUsername(user.username || "");
    }
  }, [user]);

  const validate = useCallback(() => {
    const newErrors = {};

    const firstNameError = validateName(firstName);
    if (firstNameError) {
      newErrors.firstName = firstNameError;
    }

    const lastNameError = validateName(lastName);
    if (lastNameError) {
      newErrors.lastName = lastNameError;
    }

    const trimmedUsername = username.trim();
    if (!trimmedUsername) {
      newErrors.username = "Username is required";
    } else {
      const allUsers = users ? Object.values(users) : [];
      const isTaken = allUsers.some(
        (u) => u.username === trimmedUsername && u.id !== userId,
      );
      if (isTaken) {
        newErrors.username = "This username is already taken";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [firstName, lastName, username, users, userId]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!validate()) return;

      dispatch(
        updateUserProfile({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          username: username.trim(),
        }),
      );
      setErrors({});
      notify("Profile updated successfully!");
    },
    [validate, dispatch, firstName, lastName, username, notify],
  );

  return {
    user,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    username,
    setUsername,
    errors,
    reservedCount: reservedIds.length,
    investedCount: investedIds.length,
    handleSubmit,
  };
};
