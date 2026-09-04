import "./FieldCard.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleReserve,
  investPlot,
  makeSelectUserPlots,
} from "../../store/userPlotsSlice";
import { useMemo } from "react";

const FieldCard = ({ field, onInvest, onReserve }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const userId = user?.id;

  const selectUserPlots = useMemo(() => makeSelectUserPlots(userId), [userId]);
  const userPlots = useSelector(selectUserPlots);
  const { reservedIds = [], investedIds = [] } = userPlots;

  const isReserved = reservedIds.includes(field.id);
  const isInvested = investedIds.includes(field.id);

  const sizeNum = parseInt(field.size) || 0;
  const squareCount = Math.max(1, Math.round(sizeNum / 10));

  const handleInvestClick = (e) => {
    e.stopPropagation();
    if (!userId) return;
    if (onInvest) {
      onInvest(field.id);
    } else {
      dispatch(investPlot({ userId, fieldId: field.id }));
    }
  };

  const handleReserveClick = (e) => {
    e.stopPropagation();
    if (!userId) return;
    if (onReserve) {
      onReserve(field.id);
    } else {
      dispatch(toggleReserve({ userId, fieldId: field.id }));
    }
  };

  return (
    <div className="fieldCard" onClick={() => navigate(`/shop/${field.id}`)}>
      <div className="fieldImageContainer">
        <img src={field.image} alt={field.title} className="fieldImage" />

        {isInvested && (
          <div className="statusBadge investedBadge">Invested</div>
        )}
        {!isInvested && isReserved && (
          <div className="statusBadge reservedBadge">Reserved</div>
        )}
      </div>

      <div className="fieldInfo">
        <p className="fieldTitle">{field.title}</p>
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
            {isInvested ? (
              <div className="alreadyOwnedText">You own this plot</div>
            ) : (
              <>
                <button className="investBtn" onClick={handleInvestClick}>
                  Invest
                </button>
                <button
                  className={`reserveBtn ${isReserved ? "activeReserved" : ""}`}
                  onClick={handleReserveClick}
                >
                  {isReserved ? "Unreserve" : "Reserve"}
                </button>
              </>
            )}
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
