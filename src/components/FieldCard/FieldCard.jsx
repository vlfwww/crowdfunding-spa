import React, { useMemo, useCallback } from "react";
import "./FieldCard.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleReserve,
  investPlot,
  makeSelectUserPlots,
} from "../../store/usersSlice";

const FieldCard = React.memo(
  ({ field, onInvest, onReserve, isPriority = false }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const { currentUser: user } = useSelector((state) => state.users) || {};
    const userId = user?.id;

    const selectUserPlots = useMemo(
      () => makeSelectUserPlots(userId),
      [userId],
    );
    const userPlots = useSelector(selectUserPlots);
    const { reservedIds = [], investedIds = [] } = userPlots;

    const isReserved = reservedIds.includes(field.id);
    const isInvested = investedIds.includes(field.id);

    const squareCount = useMemo(() => {
      const sizeNum = parseInt(field.size) || 0;
      return Math.max(1, Math.round(sizeNum / 10));
    }, [field.size]);

    const handleInvestClick = useCallback(
      (e) => {
        e.stopPropagation();
        if (!userId) return;
        if (onInvest) {
          onInvest(field.id);
        } else {
          dispatch(investPlot({ userId, fieldId: field.id }));
        }
      },
      [dispatch, userId, field.id, onInvest],
    );

    const handleReserveClick = useCallback(
      (e) => {
        e.stopPropagation();
        if (!userId) return;
        if (onReserve) {
          onReserve(field.id);
        } else {
          dispatch(toggleReserve({ userId, fieldId: field.id }));
        }
      },
      [dispatch, userId, field.id, onReserve],
    );

    const handleCardClick = useCallback(() => {
      navigate(`/shop/${field.id}`);
    }, [navigate, field.id]);

    const handleShopRedirect = useCallback(
      (e) => {
        e.stopPropagation();
        navigate("/shop");
      },
      [navigate],
    );

    return (
      <div className="fieldCard" onClick={handleCardClick}>
        <div className="fieldImageContainer">
          <img
            src={field.image}
            alt={field.title}
            className="fieldImage"
            width="480"
            height="274"
            loading={isPriority ? "eager" : "lazy"}
            fetchPriority={isPriority ? "high" : "auto"}
          />

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
              <button className="shopBtn" onClick={handleShopRedirect}>
                Shop
              </button>
            </div>
          )}
        </div>
      </div>
    );
  },
);

export default FieldCard;
