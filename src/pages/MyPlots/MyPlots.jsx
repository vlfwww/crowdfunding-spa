import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetFieldsQuery } from "../../store/api/shopApi";
import {
  removeReservation,
  investPlot,
  checkoutCart,
  makeSelectUserPlots,
} from "../../store/userPlotsSlice";
import { useNotification } from "../../hooks/useNotification";
import FieldCard from "../../components/FieldCard/FieldCard";
import CheckoutModal from "../../components/CheckoutModal/CheckoutModal";
import "./MyPlots.css";

const MyPlots = () => {
  const [activeTab, setActiveTab] = useState("reserved");
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const dispatch = useDispatch();
  const notify = useNotification();
  const { data: fields = [], isLoading } = useGetFieldsQuery();

  const { user } = useSelector((state) => state.auth);
  const userId = user?.id;

  const selectUserPlots = useMemo(() => makeSelectUserPlots(userId), [userId]);
  const userPlots = useSelector(selectUserPlots);
  const { reservedIds, investedIds } = userPlots;

  const reservedPlots = fields.filter((field) =>
    reservedIds.includes(field.id),
  );
  const investedPlots = fields.filter((field) =>
    investedIds.includes(field.id),
  );

  const totalPrice = reservedPlots.reduce((acc, item) => {
    const priceNum = parseFloat(item.price.replace(",", "."));
    return acc + (isNaN(priceNum) ? 0 : priceNum);
  }, 0);

  const handleInvestPlot = (plotId) => {
    if (userId) {
      dispatch(investPlot({ userId, fieldId: plotId }));
      notify("Investment successfully completed!");
    }
  };

  const handleRemoveReservation = (plotId) => {
    if (userId) {
      dispatch(removeReservation({ userId, fieldId: plotId }));
      notify("Plot reservation canceled.");
    }
  };

  const handleConfirmCartCheckout = () => {
    if (userId) {
      setIsCheckoutModalOpen(false);
      dispatch(checkoutCart(userId));
      setActiveTab("invested");
      notify("Investment successfully completed!");
    }
  };

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
