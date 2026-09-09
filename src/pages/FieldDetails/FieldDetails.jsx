import React from "react";
import "./FieldDetails.css";
import { useFieldDetails } from "../../hooks/useFieldDetails";
import FieldInfoCard from "../../components/FieldInfoCard/FieldInfoCard";
import CheckoutModal from "../../components/CheckoutModal/CheckoutModal";
import Loading from "../../components/Loading/Loading";

const FieldDetails = React.memo(() => {
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
    return <Loading>Loading field details...</Loading>;
  }

  if (isError || !field) {
    return (
      <main className="fieldDetailsPage">
        <p>Field not found.</p>
        <button className="backButton" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </main>
    );
  }

  return (
    <main className="fieldDetailsPage">
      <button className="backButton" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="fieldDetailsContainer">
        <div className="fieldDetailsImageWrapper">
          <img
            src={field.image}
            alt={field.title}
            className="fieldDetailsImage"
            width="600"
            height="450"
            fetchPriority="high"
            decoding="async"
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
    </main>
  );
});

export default FieldDetails;
