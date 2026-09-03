import { useEffect } from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearNotification } from "../../store/userPlotsSlice";
import "./NotificationPortal.css";

const NotificationPortal = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.userPlots.notification);

  useEffect(() => {
    if (!notification) return;

    const timer = setTimeout(() => {
      dispatch(clearNotification());
    }, 3000);

    return () => clearTimeout(timer);
  }, [notification, dispatch]);

  if (!notification) return null;

  return ReactDOM.createPortal(
    <div className="notificationToast">
      <span>{notification}</span>
    </div>,
    document.body,
  );
};

export default NotificationPortal;
