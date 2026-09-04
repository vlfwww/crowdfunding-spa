import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateProfile } from "../../store/authSlice";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import { useNotification } from "../../hooks/useNotification";
import "./Profile.css";

const Profile = () => {
  const dispatch = useDispatch();
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
  const notify = useNotification();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [username, setUsername] = useState(user?.username || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ firstName, lastName, username }));
    notify("Profile updated successfully!");
  };

  return (
    <div className="profileLayout">
      <div className="profileContainer">
        <div className="profileHeader">
          <div className="profileAvatarCircle">
            {firstName ? firstName[0].toUpperCase() : "U"}
          </div>
          <div className="profileMeta">
            <h1>
              {user?.firstName} {user?.lastName}
            </h1>
            <span className="profileTag">@{user?.username}</span>
          </div>
        </div>

        <div className="profileSummaryText">
          You have {reservedIds.length} reserved plots and {investedIds.length}{" "}
          invested tasks.
        </div>

        <form className="profileForm" onSubmit={handleSubmit}>
          <div className="formGrid">
            <InputField
              label="First Name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <InputField
              label="Last Name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <InputField
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <div className="formActions">
            <Button type="submit">Update profile</Button>
          </div>
        </form>

        <div className="profileQuickLinks">
          <Link to="/my-plots" className="quickLinkRow">
            <span>View my investments</span>
            <span>&rarr;</span>
          </Link>
          <Link to="/shop" className="quickLinkRow">
            <span>Go to shop</span>
            <span>&rarr;</span>
          </Link>
          <Link to="/wallet" className="quickLinkRow">
            <span>Manage wallet</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
