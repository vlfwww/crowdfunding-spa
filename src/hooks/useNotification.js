import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { addNotification } from "../store/notificationSlice";

export const useNotification = () => {
  const dispatch = useDispatch();

  const notify = useCallback(
    (text, duration = 3000, type = "success") => {
      dispatch(addNotification({ text, duration, type }));
    },
    [dispatch],
  );

  return notify;
};
