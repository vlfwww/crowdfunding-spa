import React, { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/usersSlice";
import "./UserDropdown.css";

const UserDropdown = React.memo(({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser: user } = useSelector((state) => state.users) || {};

  const handleLogout = useCallback(() => {
    dispatch(logoutUser());
    onClose();
    navigate("/login");
  }, [dispatch, onClose, navigate]);

  if (!isOpen) return null;

  return (
    <div className="userDropdownContent">
      <div className="userDropdownHeader">
        <span className="userDropdownName">
          {user?.firstName} {user?.lastName}
        </span>
        <span className="userDropdownUsername">@{user?.username}</span>
      </div>

      <div className="userDropdownLinks">
        <Link to="/profile" className="userDropdownLink" onClick={onClose}>
          Profile
        </Link>
        <button className="userDropdownLogoutBtn" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  );
});

export default UserDropdown;
