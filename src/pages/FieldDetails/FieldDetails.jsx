import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./FieldDetails.css";
import map from "../../../public/assets/images/map-location.svg";
import { useGetFieldByIdQuery } from "../../store/api/shopApi";
import {
  toggleReserve,
  investPlot,
  makeSelectUserPlots,
} from "../../store/userPlotsSlice";
import { useNotification } from "../../hooks/useNotification";
import CheckoutModal from "../../components/CheckoutModal/CheckoutModal";

const FieldDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notify = useNotification();

  const { user } = useSelector((state) => state.auth);
  const userId = user?.id;

  const selectUserPlots = useMemo(() => makeSelectUserPlots(userId), [userId]);
  const userPlots = useSelector(selectUserPlots);
  const { reservedIds, investedIds } = userPlots;

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const {
    data: field,
    isLoading,
    isError,
  } = useGetFieldByIdQuery(id, {
    skip: !id,
  });

  const isReserved = field ? reservedIds.includes(field.id) : false;
  const isInvested = field ? investedIds.includes(field.id) : false;

  const handleInvestClick = () => {
    if (!userId) {
      notify("Please log in to invest.");
      return;
    }
    if (field && !isInvested) {
      setIsCheckoutModalOpen(true);
    }
  };

  const handleConfirmPayment = () => {
    if (field && userId) {
      dispatch(investPlot({ userId, fieldId: field.id }));
      setIsCheckoutModalOpen(false);
      notify("Investment successfully completed!");
    }
  };

  const handleReserveClick = () => {
    if (!userId) {
      notify("Please log in to reserve plots.");
      return;
    }
    if (field) {
      const willBeReserved = !isReserved;
      dispatch(toggleReserve({ userId, fieldId: field.id }));
      if (willBeReserved) {
        notify("Plot reserved successfully!");
      } else {
        notify("Plot reservation canceled.");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="fieldDetailsPage">
        <p>Loading field details...</p>
      </div>
    );
  }

  if (isError || !field) {
    return (
      <div className="fieldDetailsPage">
        <p>Field not found.</p>
        <button className="backButton" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>
    );
  }

  const priceNum = parseFloat(field.price.replace(",", ".")) || 0;

  return (
    <div className="fieldDetailsPage">
      <button className="backButton" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="fieldDetailsContainer">
        <div className="fieldDetailsImageWrapper">
          <img
            src={field.image}
            alt={field.title}
            className="fieldDetailsImage"
          />
          {isInvested && (
            <div className="statusBadge investedBadge">Invested</div>
          )}
          {!isInvested && isReserved && (
            <div className="statusBadge reservedBadge">Reserved</div>
          )}
        </div>

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
                <button className="actionInvestBtn" onClick={handleInvestClick}>
                  Invest Now
                </button>
                <button
                  className={`actionReserveBtn ${isReserved ? "activeReserved" : ""}`}
                  onClick={handleReserveClick}
                >
                  {isReserved ? "Unreserve" : "Reserve"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        onConfirm={handleConfirmPayment}
        title="Invest in Plot"
        subtitle={`You are investing in ${field.title} for €${field.price}`}
        totalAmount={priceNum}
      />
    </div>
  );
};

export default FieldDetails;
