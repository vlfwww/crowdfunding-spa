import { useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeNotification } from "../../store/notificationSlice";
import "./NotificationPortal.css";

const NotificationPortal = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.items);

  const handleClose = useCallback(
    (id) => {
      dispatch(removeNotification(id));
    },
    [dispatch],
  );

  useEffect(() => {
    if (notifications.length === 0) return;

    const timers = notifications.map((item) =>
      setTimeout(() => {
        dispatch(removeNotification(item.id));
      }, item.duration || 3000),
    );

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [notifications, dispatch]);

  if (notifications.length === 0) return null;

  return ReactDOM.createPortal(
    <div className="notificationContainer">
      {notifications.map((item) => (
        <div
          key={item.id}
          className={`notificationToast ${item.type || "success"}`}
        >
          <span>{item.text}</span>
          <button
            className="notificationCloseBtn"
            onClick={() => handleClose(item.id)}
            aria-label="Close notification"
          >
            &times;
          </button>
        </div>
      ))}
    </div>,
    document.body,
  );
};

export default NotificationPortal;
