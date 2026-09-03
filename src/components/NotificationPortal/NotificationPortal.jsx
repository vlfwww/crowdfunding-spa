import { useEffect } from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeNotification } from "../../store/notificationSlice";
import "./NotificationPortal.css";

const NotificationPortal = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.items);

  useEffect(() => {
    if (notifications.length === 0) return;

    const timers = notifications.map((item) =>
      setTimeout(() => {
        dispatch(removeNotification(item.id));
      }, item.duration),
    );

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [notifications, dispatch]);

  if (notifications.length === 0) return null;

  return ReactDOM.createPortal(
    <div className="notificationContainer">
      {notifications.map((item) => (
        <div key={item.id} className="notificationToast">
          <span>{item.text}</span>
        </div>
      ))}
    </div>,
    document.body,
  );
};

export default NotificationPortal;
