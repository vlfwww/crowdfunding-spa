import map from "../../../public/assets/images/map-location.svg";
import "./FieldInfoCard.css";

const FieldInfoCard = ({
  field,
  isReserved,
  isInvested,
  onInvestClick,
  onReserveClick,
}) => {
  return (
    <div className="fieldDetailsContent">
      <h1 className="fieldDetailsTitle">{field.title}</h1>
      <div className="fieldDetailsLocation">
        <img
          src={map}
          alt="Map location"
          className="fieldDetailsLocationIcon"
        />
        {field.location}
      </div>

      <div className="fieldDetailsMeta">
        <div className="metaRow">
          <span>Plot Size:</span>
          <strong>{field.size}</strong>
        </div>
        <div className="metaRow">
          <span>Guide Price:</span>
          <span className="metaPrice">€{field.price}</span>
        </div>
      </div>

      <p className="fieldDetailsDescription">{field.description}</p>

      <div className="fieldDetailsActions">
        {isInvested ? (
          <div className="alreadyOwnedText">You own this plot</div>
        ) : (
          <>
            <button className="actionInvestBtn" onClick={onInvestClick}>
              Invest Now
            </button>
            <button
              className={`actionReserveBtn ${isReserved ? "activeReserved" : ""}`}
              onClick={onReserveClick}
            >
              {isReserved ? "Unreserve" : "Reserve"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default FieldInfoCard;
