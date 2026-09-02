import "./FieldCard.css";
import { useLocation, useNavigate } from "react-router-dom";

const FieldCard = ({ field, onInvest, onReserve }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const sizeNum = parseInt(field.size) || 0;
  const squareCount = Math.max(1, Math.round(sizeNum / 10));

  return (
    <div className="fieldCard" onClick={() => navigate(`/shop/${field.id}`)}>
      <div className="fieldImageContainer">
        <img src={field.image} alt={field.title} className="fieldImage" />
      </div>
      <div className="fieldInfo">
        <h3 className="fieldTitle">{field.title}</h3>
        <p className="fieldLocation">{field.location}</p>

        <div className="fieldDetails">
          <div className="fieldSizeRow">
            <div className="fieldSize">
              Size: <span className="detailValue">{field.size}</span>
            </div>
            <div className="sizeIcons">
              {Array.from({ length: squareCount }).map((_, index) => (
                <span key={index} className="sizeSquare"></span>
              ))}
            </div>
          </div>
          <div className="fieldSizeRow">
            <div className="fieldPrice">
              Guide Price: <span className="detailValue">€{field.price}</span>
            </div>
          </div>
        </div>

        {location.pathname === "/shop" && (
          <div className="fieldActions">
            <button
              className="investBtn"
              onClick={(e) => {
                e.stopPropagation();
                onInvest(field.id);
              }}
            >
              Invest
            </button>
            <button
              className="reserveBtn"
              onClick={(e) => {
                e.stopPropagation();
                onReserve(field.id);
              }}
            >
              Reserve
            </button>
          </div>
        )}

        {location.pathname === "/locations" && (
          <div className="shopBtnWrapper">
            <button
              className="shopBtn"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/shop");
              }}
            >
              Shop
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FieldCard;
