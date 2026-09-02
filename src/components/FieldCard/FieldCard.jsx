import "./FieldCard.css";
import { useNavigate } from "react-router-dom";

const FieldCard = ({ field, onInvest, onReserve }) => {
  const navigate = useNavigate();

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
              <span className="sizeSquare"></span>
              <span className="sizeSquare"></span>
            </div>
          </div>
          <div className="fieldSizeRow">
            <div className="fieldPrice">
              Guide Price: <span className="detailValue">€{field.price}</span>
            </div>
          </div>
        </div>

        <div className="fieldActions">
          <button className="investBtn" onClick={() => onInvest(field.id)}>
            Invest
          </button>
          <button className="reserveBtn" onClick={() => onReserve(field.id)}>
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
};

export default FieldCard;
