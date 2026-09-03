import { useDispatch } from "react-redux";
import { addNotification } from "../store/notificationSlice";

export const useNotification = () => {
  const dispatch = useDispatch();

  const notify = (text, duration = 3000) => {
    dispatch(addNotification({ text, duration }));
  };

  return notify;
};
