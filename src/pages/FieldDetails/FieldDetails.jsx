import "./FieldDetails.css";
import { useFieldDetails } from "../../hooks/useFieldDetails";
import FieldInfoCard from "../../components/FieldInfoCard/FieldInfoCard";
import CheckoutModal from "../../components/CheckoutModal/CheckoutModal";

const FieldDetails = () => {
  const {
    field,
    isLoading,
    isError,
    isReserved,
    isInvested,
    priceNum,
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    navigate,
    handleInvestClick,
    handleConfirmPayment,
    handleReserveClick,
  } = useFieldDetails();

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

        <FieldInfoCard
          field={field}
          isReserved={isReserved}
          isInvested={isInvested}
          onInvestClick={handleInvestClick}
          onReserveClick={handleReserveClick}
        />
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
