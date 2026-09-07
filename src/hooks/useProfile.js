import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserProfile } from "../store/usersSlice";
import { useNotification } from "./useNotification";

export const useProfile = () => {
  const dispatch = useDispatch();
  const notify = useNotification();
  const { currentUser: user } = useSelector((state) => state.users) || {};
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
  const { investedIds, reservedIds } = currentUserData;

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [username, setUsername] = useState(user?.username || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({ firstName, lastName, username }));
    notify("Profile updated successfully!");
  };

  return {
    user,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    username,
    setUsername,
    reservedCount: reservedIds.length,
    investedCount: investedIds.length,
    handleSubmit,
  };
};
