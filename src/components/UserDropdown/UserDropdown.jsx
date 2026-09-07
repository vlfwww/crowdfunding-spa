import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/usersSlice";
import "./UserDropdown.css";

const UserDropdown = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser: user } = useSelector((state) => state.users) || {};

  if (!isOpen) return null;

  const handleLogout = () => {
    dispatch(logoutUser());
    onClose();
    navigate("/login");
  };

  return (
    <div className="userDropdownOverlay" onClick={onClose}>
      <div className="userDropdownContent" onClick={(e) => e.stopPropagation()}>
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
    </div>
  );
};

export default UserDropdown;
