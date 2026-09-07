import { useMyPlots } from "../../hooks/useMyPlots";
import FieldCard from "../../components/FieldCard/FieldCard";
import CheckoutModal from "../../components/CheckoutModal/CheckoutModal";
import "./MyPlots.css";

const MyPlots = () => {
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
    <div className="myPlotsPage">
      <div className="myPlotsHeader">
        <h1 className="myPlotsTitle">My Plots</h1>
        <p className="myPlotsSubtitle">
          Manage your reserved locations and track your active land investments.
        </p>

        <div className="myPlotsTabs">
          <button
            className={`tabBtn ${activeTab === "reserved" ? "active" : ""}`}
            onClick={() => setActiveTab("reserved")}
          >
            Reserved / Cart ({reservedPlots.length})
          </button>
          <button
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
            {activeTab === "reserved" && (
              <div className="plotsSection">
                {reservedPlots.length === 0 ? (
                  <div className="emptyState">
                    <p>You have no reserved plots yet.</p>
                    <span>
                      Browse the shop or locations to reserve a field.
                    </span>
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
            )}

            {activeTab === "invested" && (
              <div className="plotsSection">
                {investedPlots.length === 0 ? (
                  <div className="emptyState">
                    <p>You haven't invested in any plots yet.</p>
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
            )}
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
    </div>
  );
};

export default MyPlots;
