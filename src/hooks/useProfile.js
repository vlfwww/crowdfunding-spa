import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../store/authSlice";
import { useNotification } from "./useNotification";

export const useProfile = () => {
  const dispatch = useDispatch();
  const notify = useNotification();
  const { user } = useSelector((state) => state.auth);
  const userId = user?.id;

  const userPlots = useSelector(
    (state) =>
      state.userPlots.userDataByUser[userId] || {
        reservedIds: [],
        investedIds: [],
      },
  );
  const { investedIds, reservedIds } = userPlots;

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [username, setUsername] = useState(user?.username || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ firstName, lastName, username }));
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
