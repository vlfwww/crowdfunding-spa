import React from "react";
import { Link } from "react-router-dom";
import { useProfile } from "../../hooks/useProfile";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import "./Profile.css";

const Profile = React.memo(() => {
  const {
    user,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    username,
    setUsername,
    errors,
    reservedCount,
    investedCount,
    handleSubmit,
  } = useProfile();

  return (
    <main className="profileLayout">
      <div className="profileContainer">
        <div className="profileHeader">
          <div className="profileAvatarCircle" aria-hidden="true">
            {firstName ? firstName[0].toUpperCase() : "U"}
          </div>
          <div className="profileMeta">
            <h1 className="profileNameTitle">
              {user?.firstName} {user?.lastName}
            </h1>
            <span className="profileTag">@{user?.username}</span>
          </div>
        </div>

        <div className="profileSummaryText">
          You have {reservedCount} reserved plots and {investedCount} invested
          plots.
        </div>

        <div className="profileFormWrapper">
          <form className="profileForm" onSubmit={handleSubmit} noValidate>
            <p className="profileFormTitle">Update Your Profile</p>

            <div className="formGrid">
              <InputField
                label="First Name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                error={errors.firstName}
                required
              />
              <InputField
                label="Last Name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                error={errors.lastName}
                required
              />
            </div>

            <InputField
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={errors.username}
              required
            />

            <div className="formActions">
              <Button type="submit">Update profile</Button>
            </div>
          </form>
        </div>

        <nav className="profileQuickLinks" aria-label="Quick links">
          <Link to="/my-plots" className="quickLinkRow">
            <span>View my investments</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
          <Link to="/shop" className="quickLinkRow">
            <span>Go to shop</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
          <Link to="/wallet" className="quickLinkRow">
            <span>Manage wallet</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </nav>
      </div>
    </main>
  );
});

export default Profile;
