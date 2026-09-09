import React from "react";
import { useMyPlots } from "../../hooks/useMyPlots";
import FieldCard from "../../components/FieldCard/FieldCard";
import CheckoutModal from "../../components/CheckoutModal/CheckoutModal";
import "./MyPlots.css";

const MyPlots = React.memo(() => {
  const {
    activeTab,
    setActiveTab,
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    isLoading,
    reservedPlots,
    investedPlots,
    totalPrice,
    handleInvestPlot,
    handleRemoveReservation,
    handleConfirmCartCheckout,
  } = useMyPlots();

  return (
    <main className="myPlotsPage">
      <div className="myPlotsHeader">
        <h1 className="myPlotsTitle">My Plots</h1>
        <p className="myPlotsSubtitle">
          Manage your reserved locations and track your active land investments.
        </p>

        <div className="myPlotsTabs" role="tablist">
          <button
            id="tab-reserved"
            role="tab"
            aria-selected={activeTab === "reserved"}
            aria-controls="panel-reserved"
            className={`tabBtn ${activeTab === "reserved" ? "active" : ""}`}
            onClick={() => setActiveTab("reserved")}
          >
            Reserved / Cart ({reservedPlots.length})
          </button>
          <button
            id="tab-invested"
            role="tab"
            aria-selected={activeTab === "invested"}
            aria-controls="panel-invested"
            className={`tabBtn ${activeTab === "invested" ? "active" : ""}`}
            onClick={() => setActiveTab("invested")}
          >
            Invested Plots ({investedPlots.length})
          </button>
        </div>
      </div>

      <div className="myPlotsContent">
        {isLoading ? (
          <p>Loading your plots...</p>
        ) : (
          <>
            <div
              id="panel-reserved"
              role="tabpanel"
              aria-labelledby="tab-reserved"
              className="plotsSection"
              hidden={activeTab !== "reserved"}
            >
              {reservedPlots.length === 0 ? (
                <div className="emptyState">
                  <p>You have no reserved plots yet.</p>
                  <span>Browse the shop or locations to reserve a field.</span>
                </div>
              ) : (
                <>
                  <div className="plotsGrid">
                    {reservedPlots.map((plot) => (
                      <div key={plot.id} className="plotCardWrapper">
                        <FieldCard
                          field={plot}
                          onInvest={() => handleInvestPlot(plot.id)}
                        />
                        <button
                          className="removeActionBtn"
                          onClick={() => handleRemoveReservation(plot.id)}
                        >
                          Cancel Reservation
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="cartSummaryBox">
                    <div className="cartTotal">
                      <span>Total Reserved Value:</span>
                      <strong>€{totalPrice.toFixed(2)}</strong>
                    </div>
                    <button
                      className="checkoutBtn"
                      onClick={() => setIsCheckoutModalOpen(true)}
                    >
                      Proceed to Payment
                    </button>
                  </div>
                </>
              )}
            </div>

            <div
              id="panel-invested"
              role="tabpanel"
              aria-labelledby="tab-invested"
              className="plotsSection"
              hidden={activeTab !== "invested"}
            >
              {investedPlots.length === 0 ? (
                <div className="emptyState">
                  <p>You haven&apos;t invested in any plots yet.</p>
                  <span>
                    Your active agricultural portfolios will appear here.
                  </span>
                </div>
              ) : (
                <div className="plotsGrid">
                  {investedPlots.map((plot) => (
                    <FieldCard key={plot.id} field={plot} />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        onConfirm={handleConfirmCartCheckout}
        title="Checkout"
        subtitle={`Complete your payment for ${reservedPlots.length} reserved plot(s)`}
        totalAmount={totalPrice}
      />
    </main>
  );
});

export default MyPlots;
